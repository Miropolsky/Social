import { profileApi } from '../api/api';
const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO = 'SAVE_PHOTO';
const SET_ERROR = 'SET_ERROR';

const initialState = {
    posts: [
        { id: 1, message: 'Привет! Как дела?', likesCount: 0 },
        { id: 2, message: 'Это мой первый пост', likesCount: 23 },
    ],
    profile: null,
    status: '',
    errorSaveProfile: null,
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
const setError = (error) => {
    return {
        type: SET_ERROR,
        error,
    };
};
const savePhotoSuccess = (photo) => {
    return {
        type: SAVE_PHOTO,
        photo,
    };
};
const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId,
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
        case SAVE_PHOTO: {
            return {
                ...state,
                profile: { ...state.profile, photos: action.photo },
            };
        }
        case SET_ERROR: {
            return {
                ...state,
                errorSaveProfile: action.error,
            };
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: [...state.posts.filter((el) => el.id !== action.postId)],
            };
        }

        default:
            return state;
    }
};

const setUserProfile = (userId) => {
    return async (dispatch) => {
        const res = await profileApi.getUser(userId);
        dispatch(setUserProfileSuccess(res));
    };
};
const getStatus = (userId) => {
    return async (dispatch) => {
        const res = await profileApi.getStatus(userId);
        dispatch(setStatus(res.data));
    };
};
const updateStatus = (status, authorizedUserId) => {
    return async (dispatch) => {
        const res = await profileApi.updateStatus(status);
        if (res.data.resultCode === 0) {
            dispatch(getStatus(authorizedUserId));
        }
    };
};
const savePhoto = (photo) => {
    return async (dispatch) => {
        const res = await profileApi.savePhoto(photo);
        if (res.data.resultCode === 0) {
            dispatch(savePhotoSuccess(res.data.data.photos));
        }
    };
};
const saveProfile = (profile) => {
    return async (dispatch) => {
        const res = await profileApi.saveProfile(profile);
        if (res.data.resultCode === 0) {
            dispatch(setUserProfile(profile.userId));
            dispatch(setError(null));
        } else {
            dispatch(setError(res.data.messages[0]));
        }
        return res;
    };
};

export {
    profileReducer,
    addPostActionCreator,
    setUserProfile,
    getStatus,
    updateStatus,
    deletePost,
    savePhoto,
    saveProfile,
};
