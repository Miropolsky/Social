import { ThunkAction } from 'redux-thunk';
import { getAuthUserData } from './authReducer'
import { AppStateType } from './reduxStore';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type AppInitialStateType = {
    initialized: boolean
}

const initialState: AppInitialStateType = {
    initialized: false,
};

type ActionType = AppInitialStateSuccessType
const appReducer = (state = initialState, action: ActionType): AppInitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return { ...state, initialized: true };
        default:
            return state;
    }
};

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionType>

const initializeApp = ():ThunkType => (dispatch) => {
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
