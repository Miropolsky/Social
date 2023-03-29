import { usersApi } from '../api/api';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = 'TOGGLE_IS_FOLLOWING_IN_PROGRESS';

const initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 20,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
};

const followSuccess = (userId) => {
    return {
        type: FOLLOW,
        userId,
    };
};
const unfollowSuccess = (userId) => {
    return {
        type: UNFOLLOW,
        userId,
    };
};

const setUsers = (users) => {
    return {
        type: SET_USERS,
        users,
    };
};

const setCurrentPage = (currentPage) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage,
    };
};

const setTotalUsersCount = (totalCount) => {
    return {
        type: SET_TOTAL_COUNT,
        totalCount,
    };
};

const toggleIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching,
    };
};
const toggleFollowingProgress = (isFetching, userId) => {
    return {
        type: TOGGLE_IS_FOLLOWING_IN_PROGRESS,
        isFetching,
        userId,
    };
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map((u) => {
                    if (action.userId === u.id) {
                        return { ...u, followed: true };
                    }
                    return u;
                }),
            };

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map((u) => {
                    if (action.userId === u.id) {
                        return { ...u, followed: false };
                    }
                    return u;
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

const getUsers = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        usersApi.getUsers(currentPage, pageSize).then((res) => {
            dispatch(setCurrentPage(currentPage));
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(res.items));
            dispatch(setTotalUsersCount(res.totalCount));
        });
    };
};
const follow = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));
        usersApi.follow(userId).then((res) => {
            if (res.resultCode === 0) {
                dispatch(followSuccess(userId));
            }
            dispatch(toggleFollowingProgress(false, userId));
        });
    };
};
const unfollow = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));
        usersApi.unfollow(userId).then((res) => {
            if (res.resultCode === 0) {
                dispatch(unfollowSuccess(userId));
            }
            dispatch(toggleFollowingProgress(false, userId));
        });
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
