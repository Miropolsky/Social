import { getAuthUserData } from './authReducer';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialState = {
    initialized: false,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return { ...state, initialized: true };
        default:
            return state;
    }
};

const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    // console.log(promise);
    promise.then(() => dispatch(InitializedSuccess()));
};

const InitializedSuccess = () => {
    return {
        type: INITIALIZED_SUCCESS,
    };
};

export { appReducer, initializeApp };
