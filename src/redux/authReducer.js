import { headerApi } from '../api/api';

const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
    id: null,
    login: null,
    email: null,
    isFetching: true,
    isAuth: false,
};

const setAuthUserDataSuccess = (id, email, login) => {
    return {
        type: SET_USER_DATA,
        data: { id, email, login },
    };
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return { ...state, ...action.data, isAuth: true };
        default:
            return state;
    }
};

const setAuthUserData = () => {
    return (dispatch) => {
        headerApi.getUser().then((res) => {
            if (res.resultCode === 0) {
                let { login, id, email } = res.data;
                dispatch(setAuthUserDataSuccess(id, email, login));
            }
        });
    };
};

export { authReducer, setAuthUserData };
