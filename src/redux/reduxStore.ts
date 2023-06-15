import {
    applyMiddleware,
    combineReducers,
    legacy_createStore as createStore,
    compose,
    Action,
} from 'redux';
import { profileReducer } from './profileReducer';
import { dialogReducer } from './diaglogReducer';
import siteBarReducer from './siteBarReducer';
import { usersReducer } from './usersReducer';
import musicReducer from './musicReducer';
import { authReducer } from './authReducer';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { appReducer } from './appReducer';

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogReducer,
    siteBar: siteBarReducer,
    usersPage: usersReducer,
    musicPage: musicReducer,
    auth: authReducer,
    app: appReducer,
});

type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>;
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never;
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
