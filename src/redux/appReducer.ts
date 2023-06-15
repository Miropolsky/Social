import { getAuthUserData } from './authReducer'
import { BaseThunkType, InferActionsTypes } from './reduxStore';

const initialState = { 
    initialized: false,
};
export const actions = {
    initializedSuccess: () => ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const),
}

const appReducer = (state = initialState, action: ActionsType): AppInitialStateType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS':
            return { ...state, initialized: true };
        default:
            return state;
    }
};

const initializeApp = (): ThunkType => async (dispatch) => {
    await dispatch(getAuthUserData());
    dispatch(actions.initializedSuccess());
};

export { appReducer, initializeApp };

export type AppInitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>
