import { authApi } from '../api/api';

const SET_USER_DATA = 'auth/SET_USER_DATA';

const initialState = {
    id: null,
    login: null,
    email: null,
    isFetching: true,
    isAuth: false,
};

const setAuthUserDataSuccess = (id, email, login, isAuth) => {
    return {
        type: SET_USER_DATA,
        payload: { id, email, login, isAuth },
    };
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

const getAuthUserData = () => {
    return async (dispatch) => {
        let res = await authApi.getUser();

        if (res.resultCode === 0) {
            let { login, id, email } = res.data;
            dispatch(setAuthUserDataSuccess(id, email, login, true));
        }
    };
};

const login = (email, password, rememberMe, setStatus) => {
    return async (dispatch) => {
        let res = await authApi.login(email, password, rememberMe);
        if (res.data.resultCode === 0) {
            dispatch(getAuthUserData());
        } else {
            setStatus({ error: res.data.messages });
        }
    };
};

const logout = () => {
    return async (dispatch) => {
        let res = await authApi.logout();
        if (res.data.resultCode === 0) {
            dispatch(setAuthUserDataSuccess(null, null, null, false));
        }
    };
};

export { authReducer, getAuthUserData, login, logout };
