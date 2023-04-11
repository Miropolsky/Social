import {
    applyMiddleware,
    combineReducers,
    legacy_createStore as createStore,
} from 'redux';
import { profileReducer } from './profileReducer';
import { dialogReducer } from './diaglogReducer';
import siteBarReducer from './siteBarReducer';
import { usersReducer } from './usersReducer';
import musicReducer from './musicReducer';
import { authReducer } from './authReducer';
import thunkMiddleware from 'redux-thunk';
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
let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
