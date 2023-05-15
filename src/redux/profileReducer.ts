import { ThunkAction } from 'redux-thunk';
import { profileApi } from '../api/api';
import { PostType, ProfileType } from '../types/types';
import { AppStateType } from './reduxStore';
import { Dispatch } from 'redux';
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
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    errorSaveProfile: null as string | null,
};


type InitialStateType = typeof initialState;
export type AddPostActionCreatorType = {
    type: typeof ADD_POST,
    textPost: string
}

const addPostActionCreator = (textPost: string): AddPostActionCreatorType => {
    return {
        type: ADD_POST,
        textPost,
    };
};

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
const setUserProfileSuccess = (profile: ProfileType): SetUserProfileActionType => {
    return {
        type: SET_USER_PROFILE,
        profile,
    };
};

type SetStatusType = {
    type: typeof SET_STATUS,
    status: string
}
const setStatus = (status: string): SetStatusType => {
    return {
        type: SET_STATUS,
        status,
    };
};
type SetErrorType = {
    type: typeof SET_ERROR,
    error: string | null
}
const setError = (error: string | null) : SetErrorType => {
    return {
        type: SET_ERROR,
        error,
    };
};
type SavePhotoActionType = {
    type: typeof SAVE_PHOTO,
    photo: File | null
}
const savePhotoSuccess = (photo: File):SavePhotoActionType => {
    return {
        type: SAVE_PHOTO,
        photo,
    };
};

type DeletePostActionType = {
    type: typeof DELETE_POST,
    postId: number
}
const deletePost = (postId: number): DeletePostActionType => {
    return {
        type: DELETE_POST,
        postId,
    };
};

type ActionsType = DeletePostActionType | SavePhotoActionType | SetErrorType | SetStatusType| SetUserProfileActionType | AddPostActionCreatorType;
const profileReducer = (state = initialState, action: ActionsType):InitialStateType => {
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
                profile: { ...state.profile, photos: action.photo } as ProfileType
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
export type DispatchProfileType = Dispatch<ActionsType>
// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;
const setUserProfile = (userId:number | null): ThunkType => {
    return async (dispatch) => {
        const res = await profileApi.getUser(userId);
        dispatch(setUserProfileSuccess(res));
    };
};
const getStatus = (userId: number | null): ThunkType => {
    return async (dispatch) => {
        const res = await profileApi.getStatus(userId);
        dispatch(setStatus(res.data));
    };
};
const updateStatus = (status: string| null, authorizedUserId: number | null): ThunkType => {
    return async (dispatch) => {
        const res = await profileApi.updateStatus(status);
        if (res.data.resultCode === 0) {
            dispatch(getStatus(authorizedUserId));
        }
    };
};
const savePhoto = (photo: File | null):ThunkType => {
    return async (dispatch) => {
        const res = await profileApi.savePhoto(photo);
        if (res.data.resultCode === 0) {
            dispatch(savePhotoSuccess(res.data.data.photos));
        }
    };
};
const saveProfile = (profile: ProfileType | null):ThunkType => {
    return async (dispatch) => {
        const res = await profileApi.saveProfile(profile);
        if (res.data.resultCode === 0 && profile) {
            dispatch(setUserProfile(profile.userId));
            dispatch(setError(null));
        } else {
            dispatch(setError(res.data.messages[0]));
        }
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
