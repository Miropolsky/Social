import { combineReducers, legacy_createStore as createStore } from 'redux';
import { profileReducer } from './profileReducer';
import { dialogReducer } from './diaglogReducer';
import siteBarReducer from './siteBarReducer';
import { usersReducer } from './usersReducer';
import musicReducer from './musicReducer';

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogReducer,
    siteBar: siteBarReducer,
    usersPage: usersReducer,
    musicPage: musicReducer,
});
let store = createStore(reducers);

export default store;
