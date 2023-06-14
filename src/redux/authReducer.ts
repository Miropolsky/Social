import { ThunkAction } from 'redux-thunk';
import { ResultCodeEnum } from '../api/api';
import { securityApi } from '../api/securityApi';
import { ResultCodeForCaptchEnum, authApi } from '../api/authApi';
import { AppStateType } from './reduxStore';
const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL = 'auth/GET_CAPTCHA_URL';

// type InitialStateType = {
//     id: number | null,
//     login: string | null,
//     email: string |null,
//     isFetching: boolean,
//     isAuth: boolean,
//     captchaUrl: string | null,
// }

const initialState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isFetching: true,
    isAuth: false,
    captchaUrl: null as string | null,
};

type InitialStateType = typeof initialState;
type setAuthUserDataActionPayloadType = {
    id: number | null, email: string | null, login: string | null, isAuth: boolean
}
type setAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: setAuthUserDataActionPayloadType,
}


const setAuthUserDataSuccess = (id: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataActionType => {
    return {
        type: SET_USER_DATA,
        payload: { id, email, login, isAuth },
    };
};

type getCaptchaUrlActionType = {
    type: typeof GET_CAPTCHA_URL,
    url: string
}
const getCaptchaUrlSuccess = (url: string): getCaptchaUrlActionType => {
    return {
        type: GET_CAPTCHA_URL,
        url,
    };
};
type ActionsType = getCaptchaUrlActionType | setAuthUserDataActionType;

const authReducer = (state = initialState, action: ActionsType) : InitialStateType => {
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

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

const getAuthUserData = ():ThunkType => {
    return async (dispatch) => {
        let res = await authApi.getUser();
        if (res.resultCode === ResultCodeEnum.Success) {
            let { login, id, email } = res.data;
            dispatch(setAuthUserDataSuccess(id, email, login, true));
        }
    };
};

const login = (email: string, password: string, rememberMe: boolean, captcha: any, setStatus: Function): ThunkType => {
    return async (dispatch) => {
        let res = await authApi.login(email, password, rememberMe, captcha);
        if (res.resultCode === ResultCodeEnum.Success) {
            dispatch(getAuthUserData());
        } else if (res.resultCode === ResultCodeForCaptchEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        } else {
            setStatus({ error: res.messages });
        }
    };
};

const getCaptchaUrl = ():ThunkType => {
    return async (dispatch) => {
        let res = await securityApi.getCaptchUrl();
        const captchaUrl = res.url;
        dispatch(getCaptchaUrlSuccess(captchaUrl));
    };
};

const logout = ():ThunkType => {
    return async (dispatch) => {
        let res = await authApi.logout();
        if (res.resultCode === ResultCodeEnum.Success) {
            dispatch(setAuthUserDataSuccess(null, null, null, false));
        }
    };
};

export { authReducer, getAuthUserData, login, logout, getCaptchaUrl };
