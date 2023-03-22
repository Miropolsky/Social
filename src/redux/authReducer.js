const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
    id: null,
    login: null,
    email: null,
    isFetching: true,
    isAuth: false,
};

const setAuthUserData = (id, email, login) => {
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

export { authReducer, setAuthUserData };
