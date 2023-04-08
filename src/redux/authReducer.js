import { authApi } from '../api/api';

const SET_USER_DATA = 'SET_USER_DATA';

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
    return (dispatch) => {
        authApi.getUser().then((res) => {
            if (res.resultCode === 0) {
                let { login, id, email } = res.data;
                dispatch(setAuthUserDataSuccess(id, email, login, true));
            }
        });
    };
};

const login = (email, password, rememberMe, setStatus) => {
    return (dispatch) => {
        authApi.login(email, password, rememberMe).then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(getAuthUserData());
            } else {
                setStatus({ error: res.data.messages });
            }
        });
    };
};

const logout = () => {
    return (dispatch) => {
        authApi.logout().then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setAuthUserDataSuccess(null, null, null, false));
            }
        });
    };
};

export { authReducer, getAuthUserData, login, logout };
