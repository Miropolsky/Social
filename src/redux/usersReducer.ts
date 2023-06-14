import { Dispatch } from 'redux';
import { UserType } from '../types/types';
import { updateObjectInArray } from '../utils/objectHelpers/objectHelpers';
import { AppStateType, InferActionsTypes } from './reduxStore';
import { ThunkAction } from 'redux-thunk';
import { usersApi } from '../api/usersApi';

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 20,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>,
};

type InitialState = typeof initialState;

export const actions = {
    followSuccess: (userId: number) => ({
            type: 'FOLLOW',
            userId,
    } as const),
    unfollowSuccess: (userId: number) => ({
            type: 'UNFOLLOW',
            userId,
    } as const),
    setUsers: (users: Array<UserType>) => ({
            type: 'SET_USERS',
            users,
    } as const),

    setCurrentPage: (currentPage: number) => ({
            type: 'SET_CURRENT_PAGE',
            currentPage,
    } as const),

    setTotalUsersCount: (totalCount: number) => ({
            type: 'SET_TOTAL_COUNT',
            totalCount,
    } as const),
    
    toggleIsFetching: (isFetching: boolean) => ({
            type: 'TOGGLE_IS_FETCHING',
            isFetching,
    } as const),
    
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
            type: 'TOGGLE_IS_FOLLOWING_IN_PROGRESS',
            isFetching,
            userId,
    } as const),
}

type ActionsType = InferActionsTypes<typeof actions>

const usersReducer = (state = initialState, action: ActionsType): InitialState => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {
                    followed: true,
                }),
            };

        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {
                    followed: false,
                }),
            };

        case 'SET_USERS':
            return { ...state, users: action.users };
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.currentPage };
        case 'SET_TOTAL_COUNT':
            return { ...state, totalUsersCount: action.totalCount };
        case 'TOGGLE_IS_FETCHING':
            return { ...state, isFetching: action.isFetching };
        case 'TOGGLE_IS_FOLLOWING_IN_PROGRESS':
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

type DispatchType = Dispatch<ActionsType>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

const getUsers = (currentPage: number, pageSize: number):ThunkType  => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        const res = await usersApi.getUsers(currentPage, pageSize);
        dispatch(actions.setCurrentPage(currentPage));
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(res.items));
        dispatch(actions.setTotalUsersCount(res.totalCount));
    };
};

const _followUnfollowFlow = async (
    dispatch: DispatchType,
    userId: number,
    apiMethod: any,
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
        _followUnfollowFlow(dispatch, userId, usersApi.follow, actions.followSuccess);
    };
};
const unfollow = (userId:number):ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(
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
};
