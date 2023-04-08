import { profileApi } from '../api/api';
const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

const initialState = {
    posts: [
        { id: 1, message: 'Привет! Как дела?', likesCount: 0 },
        { id: 2, message: 'Это мой первый пост', likesCount: 23 },
    ],
    profile: null,
    status: '',
};

const addPostActionCreator = (textPost) => {
    return {
        type: ADD_POST,
        textPost,
    };
};
const setUserProfileSuccess = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile,
    };
};
const setStatus = (status) => {
    return {
        type: SET_STATUS,
        status,
    };
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                posts: [
                    ...state.posts,
                    {
                        id: 5,
                        message: action.textPost,
                        likesCount: 0,
                    },
                ],
            };
        }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile };
        }
        case SET_STATUS: {
            return { ...state, status: action.status };
        }

        default:
            return state;
    }
};

const setUserProfile = (userId) => {
    return (dispatch) => {
        profileApi.getUser(userId).then((res) => {
            dispatch(setUserProfileSuccess(res));
        });
    };
};
const getStatus = (status) => {
    return (dispatch) => {
        profileApi.getStatus(status).then((res) => {
            dispatch(setStatus(res.data));
        });
    };
};
const updateStatus = (status) => {
    return (dispatch) => {
        profileApi.updateStatus(status).then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(updateStatus(res));
            }
        });
    };
};

export {
    profileReducer,
    addPostActionCreator,
    setUserProfile,
    getStatus,
    updateStatus,
};
