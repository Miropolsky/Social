import { combineReducers, legacy_createStore as createStore } from 'redux';
import { profileReducer } from './profileReducer';
import { dialogReducer } from './diaglogReducer';
import siteBarReducer from './siteBarReducer';

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogReducer,
    siteBar: siteBarReducer,
});
let store = createStore(reducers);

export default store;
