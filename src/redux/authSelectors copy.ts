// import { createSelector } from 'reselect';

import { AppStateType } from "./reduxStore";

const selectIsAuth = (state: AppStateType) => {
    return state.auth.isAuth;
};
const selectCurrentUserLogin = (state: AppStateType) => {
    return state.auth.login;
};

export {selectIsAuth, selectCurrentUserLogin}