import { Dispatch } from 'redux';
import { UserType } from '../types/types';
import { updateObjectInArray } from '../utils/objectHelpers/objectHelpers';
import { BaseThunkType, InferActionsTypes } from './reduxStore';
import { usersApi } from '../api/usersApi';
import { ResponseType } from '../api/api';

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 20,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>,
    filter: {
        term: '',
        friend: null as null | boolean
    }
};

export const actions = {
    followSuccess: (userId: number) => ({
            type: 'SN/USERS/FOLLOW',
            userId,
    } as const),
    unfollowSuccess: (userId: number) => ({
            type: 'SN/USERS/UNFOLLOW',
            userId,
    } as const),
    setUsers: (users: Array<UserType>) => ({
            type: 'SN/USERS/SET_USERS',
            users,
    } as const),

    setFilter: (filter: FilterType) => ({
            type: 'SN/USERS/SET_FILTER',
            payload: {...filter},
    } as const),
    setCurrentPage: (currentPage: number) => ({
            type: 'SN/USERS/SET_CURRENT_PAGE',
            currentPage,
    } as const),

    setTotalUsersCount: (totalCount: number) => ({
            type: 'SN/USERS/SET_TOTAL_COUNT',
            totalCount,
    } as const),
    
    toggleIsFetching: (isFetching: boolean) => ({
            type: 'SN/USERS/TOGGLE_IS_FETCHING',
            isFetching,
    } as const),
    
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
            type: 'SN/USERS/TOGGLE_IS_FOLLOWING_IN_PROGRESS',
            isFetching,
            userId,
    } as const),
}

const usersReducer = (state = initialState, action: ActionsType, term: string): InitialState => {
    switch (action.type) {
        case 'SN/USERS/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {
                    followed: true,
                }),
            };

        case 'SN/USERS/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {
                    followed: false,
                }),
            };

        case 'SN/USERS/SET_USERS':
            return { ...state, users: action.users };
        case 'SN/USERS/SET_CURRENT_PAGE':
            return { ...state, currentPage: action.currentPage };
        case 'SN/USERS/SET_TOTAL_COUNT':
            return { ...state, totalUsersCount: action.totalCount };
        case 'SN/USERS/TOGGLE_IS_FETCHING':
            return { ...state, isFetching: action.isFetching };
        case 'SN/USERS/SET_FILTER':
            return { ...state, filter: { ...action.payload}}
        case 'SN/USERS/TOGGLE_IS_FOLLOWING_IN_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(
                          (id) => id !== action.userId
                      ),
            };
        default:
            return state;
    }
};

const getUsers = (currentPage: number, pageSize: number, filter: FilterType):ThunkType  => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setFilter(filter))
        dispatch(actions.setCurrentPage(currentPage));
        const res = await usersApi.getUsers(currentPage, pageSize, filter.term, filter.friend);
        dispatch(actions.setUsers(res.items));
        dispatch(actions.setTotalUsersCount(res.totalCount));
        dispatch(actions.toggleIsFetching(false));
    };
};
// const getUsersFriend = (currentPage: number, pageSize: number, text: string, isFriend: boolean):ThunkType  => {
//     return async (dispatch) => {
//         dispatch(actions.toggleIsFetching(true));
//         const res = await usersApi.getUsersFriend(currentPage, pageSize, text, isFriend);
//         dispatch(actions.setCurrentPage(currentPage));
//         dispatch(actions.toggleIsFetching(false));
//         dispatch(actions.setUsers(res.items));
//         dispatch(actions.setTotalUsersCount(res.totalCount));
//     };
// };

const _followUnfollowFlow = async (
    dispatch: Dispatch<ActionsType>,
    userId: number,
    apiMethod: (userId: number) => Promise<ResponseType>,
    actionCreator: (userId: number) => ActionsType
) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    const res = await apiMethod(userId);
    if (res.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
};

const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersApi.follow, actions.followSuccess);
    };
};
const unfollow = (userId:number):ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(
            dispatch,
            userId,
            usersApi.unfollow,
            actions.unfollowSuccess
        );
    };
};

export {
    usersReducer,
    follow,
    unfollow,
    getUsers,
    // getUsersFriend
};

export type InitialState = typeof initialState;
export type FilterType = typeof initialState.filter;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>