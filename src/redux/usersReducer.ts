import { Dispatch } from 'redux';
import { usersApi } from '../api/api';
import { UserType } from '../types/types';
import { updateObjectInArray } from '../utils/objectHelpers/objectHelpers';
import { AppStateType } from './reduxStore';
import { ThunkAction } from 'redux-thunk';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = 'TOGGLE_IS_FOLLOWING_IN_PROGRESS';



const initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 20,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>,
};

type InitialState = typeof initialState;

type FollowActionType = {
    type: typeof FOLLOW,
    userId: number
}

const followSuccess = (userId: number): FollowActionType => {
    return {
        type: FOLLOW,
        userId,
    };
};

type UnFollowActionType = {
    type: typeof UNFOLLOW,
    userId: number
}
const unfollowSuccess = (userId: number): UnFollowActionType => {
    return {
        type: UNFOLLOW,
        userId,
    };
};

type SetUsersType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}

const setUsers = (users: Array<UserType>):SetUsersType => {
    return {
        type: SET_USERS,
        users,
    };
};

type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}

const setCurrentPage = (currentPage: number): SetCurrentPageType => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage,
    };
};

type SetTotalUsersCounteType = {
    type: typeof SET_TOTAL_COUNT,
    totalCount: number
}

const setTotalUsersCount = (totalCount: number):SetTotalUsersCounteType => {
    return {
        type: SET_TOTAL_COUNT,
        totalCount,
    };
};

type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}

const toggleIsFetching = (isFetching: boolean):ToggleIsFetchingType => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching,
    };
};

type ToggleFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_IN_PROGRESS,
    isFetching: boolean
    userId: number
}
const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressType => {
    return {
        type: TOGGLE_IS_FOLLOWING_IN_PROGRESS,
        isFetching,
        userId,
    };
};

type ActionsType = ToggleFollowingProgressType | ToggleIsFetchingType |SetTotalUsersCounteType 
|  SetCurrentPageType | SetUsersType | UnFollowActionType | FollowActionType;

const usersReducer = (state = initialState, action: ActionsType): InitialState => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {
                    followed: true,
                }),
            };

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {
                    followed: false,
                }),
            };

        case SET_USERS:
            return { ...state, users: action.users };
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage };
        case SET_TOTAL_COUNT:
            return { ...state, totalUsersCount: action.totalCount };
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching };
        case TOGGLE_IS_FOLLOWING_IN_PROGRESS:
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
        dispatch(toggleIsFetching(true));
        const res = await usersApi.getUsers(currentPage, pageSize);
        dispatch(setCurrentPage(currentPage));
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(res.items));
        dispatch(setTotalUsersCount(res.totalCount));
    };
};

const _followUnfollowFlow = async (
    dispatch: DispatchType,
    userId: number,
    apiMethod: any,
    actionCreator: (userId: number) => FollowActionType | UnFollowActionType
) => {
    dispatch(toggleFollowingProgress(true, userId));
    const res = await apiMethod(userId);
    if (res.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
};

const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersApi.follow, followSuccess);
    };
};
const unfollow = (userId:number):ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(
            dispatch,
            userId,
            usersApi.unfollow,
            unfollowSuccess
        );
    };
};

export {
    usersReducer,
    follow,
    unfollow,
    setCurrentPage,
    toggleFollowingProgress,
    getUsers,
};
