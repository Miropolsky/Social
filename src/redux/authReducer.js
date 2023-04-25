import { authApi, securityApi } from '../api/api';
const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL = 'auth/GET_CAPTCHA_URL';

const initialState = {
    id: null,
    login: null,
    email: null,
    isFetching: true,
    isAuth: false,
    captchaUrl: null,
};

const setAuthUserDataSuccess = (id, email, login, isAuth) => {
    return {
        type: SET_USER_DATA,
        payload: { id, email, login, isAuth },
    };
};
const getCaptchaUrlSuccess = (url) => {
    return {
        type: GET_CAPTCHA_URL,
        url,
    };
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return { ...state, ...action.payload };
        case GET_CAPTCHA_URL: {
            return { ...state, captchaUrl: action.url };
        }
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

const login = (email, password, rememberMe, captcha, setStatus) => {
    return async (dispatch) => {
        let res = await authApi.login(email, password, rememberMe, captcha);
        if (res.data.resultCode === 0) {
            dispatch(getAuthUserData());
        } else if (res.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        } else {
            setStatus({ error: res.data.messages });
        }
    };
};

const getCaptchaUrl = () => {
    return async (dispatch) => {
        let res = await securityApi.getCaptchUrl();
        const captchaUrl = res.data.url;
        dispatch(getCaptchaUrlSuccess(captchaUrl));
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

export { authReducer, getAuthUserData, login, logout, getCaptchaUrl };
