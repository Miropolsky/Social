import {
    applyMiddleware,
    combineReducers,
    legacy_createStore as createStore,
    compose,
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
// let store = createStore(reducers, applyMiddleware(thunkMiddleware));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
