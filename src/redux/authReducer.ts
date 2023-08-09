import { ResultCodeEnum } from '../api/api';
import { securityApi } from '../api/securityApi';
import { ResultCodeForCaptchEnum, authApi } from '../api/authApi';
import { BaseThunkType, InferActionsTypes } from './reduxStore';

const initialState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isFetching: true,
    isAuth: false,
    captchaUrl: null as string | null,
};

export const actions = {
    setAuthUserDataSuccess: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'auth/SET_USER_DATA',
        payload: { id, email, login, isAuth },
    } as const),
    getCaptchaUrlSuccess: (url: string) => ({ type: 'auth/GET_CAPTCHA_URL', url,} as const)
};

const authReducer = (state = initialState, action: ActionsType) : InitialStateType => {
    switch (action.type) {
        case 'auth/SET_USER_DATA':
            return { ...state, ...action.payload };
        case 'auth/GET_CAPTCHA_URL': {
            return { ...state, captchaUrl: action.url };
        }
        default:
            return state;
    }
};

const getAuthUserData = ():ThunkType => {
    return async (dispatch) => {
        let res = await authApi.getUser();
        if (res.resultCode === ResultCodeEnum.Success) {
            let { login, id, email } = res.data;
            dispatch(actions.setAuthUserDataSuccess(id, email, login, true));
        }
    };
};

const login = (email: string, password: string, rememberMe: boolean, captcha: string, setStatus: Function): ThunkType => {
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
        dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
    };
};

const logout = ():ThunkType => {
    return async (dispatch) => {
        console.log('exit')
        let res = await authApi.logout();
        if (res.resultCode === ResultCodeEnum.Success) {
            dispatch(actions.setAuthUserDataSuccess(null, null, null, false));
        }
    };
};

export { authReducer, getAuthUserData, login, logout, getCaptchaUrl };

type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>;
