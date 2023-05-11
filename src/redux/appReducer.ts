import { getAuthUserData } from './authReducer'

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type AppInitialStateType = {
    initialized: boolean
}

const initialState: AppInitialStateType = {
    initialized: false,
};

const appReducer = (state = initialState, action: any): AppInitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return { ...state, initialized: true };
        default:
            return state;
    }
};

const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    promise.then(() => dispatch(InitializedSuccess()));
};

type AppInitialStateSuccessType = {
    type: typeof INITIALIZED_SUCCESS
}

const InitializedSuccess = (): AppInitialStateSuccessType => {
    return {
        type: INITIALIZED_SUCCESS,
    };
};

export { appReducer, initializeApp };
