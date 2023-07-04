// import { createSelector } from 'reselect';

import { AppStateType } from "./reduxStore";

export const getAllUsers = (state: AppStateType) => {
    return state.usersPage.users;
};
// export const getAllUsersSelector = (state) => {
//     return getAllUsers(state);
// };

// export const getAllUsersSuperSelector = createSelector(getAllUsers, (users) => {
//     return users;
// });
export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
};
export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
};
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
};
export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
};
export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress;
};
export const getUsersFilter = (state: AppStateType) => {
    return state.usersPage.filter;
};
