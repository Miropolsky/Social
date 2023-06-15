import { PhotosType, PostType, ProfileType } from '../types/types';
import { BaseThunkType, InferActionsTypes } from './reduxStore';
import { Dispatch } from 'redux';
import { profileApi } from '../api/profileApi';

const initialState = {
    posts: [
        { id: 1, message: 'Привет! Как дела?', likesCount: 0 },
        { id: 2, message: 'Это мой первый пост', likesCount: 23 },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    errorSaveProfile: null as string | null,
};

const actions = {
    addPostActionCreator: (textPost: string) => ({
            type: 'SN/PROFILE/ADD-POST',
            textPost,
    } as const),
    setUserProfileSuccess: (profile: ProfileType) => ({
            type: 'SN/PROFILE/SET_USER_PROFILE',
            profile,
    } as const),
    setStatus: (status: string) => ({
            type: 'SN/PROFILE/SET_STATUS',
            status,
    } as const),
    setError: (error: string | null)=> ({
            type: 'SN/PROFILE/SET_ERROR',
            error,
    } as const),
    savePhotoSuccess: (photo: PhotosType) => ({
            type: 'SN/PROFILE/SAVE_PHOTO',
            photo,
    } as const),
    deletePost: (postId: number) => ({
            type: 'SN/PROFILE/DELETE_POST',
            postId,
    } as const)
}

const profileReducer = (state = initialState, action: ActionsType):InitialStateType => {
    switch (action.type) {
        case 'SN/PROFILE/ADD-POST': {
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
        case 'SN/PROFILE/SET_USER_PROFILE': {
            return { ...state, profile: action.profile };
        }
        case 'SN/PROFILE/SET_STATUS': {
            return { ...state, status: action.status };
        }
        case 'SN/PROFILE/SAVE_PHOTO': {
            return {
                ...state,
                profile: { ...state.profile, photos: action.photo } as ProfileType
            };
        }
        case 'SN/PROFILE/SET_ERROR': {
            return {
                ...state,
                errorSaveProfile: action.error,
            };
        }
        case 'SN/PROFILE/DELETE_POST': {
            return {
                ...state,
                posts: [...state.posts.filter((el) => el.id !== action.postId)],
            };
        }

        default:
            return state;
    }
};

const setUserProfile = (userId:number): ThunkType => {
    return async (dispatch) => {
        const res = await profileApi.getUser(userId);
        dispatch(actions.setUserProfileSuccess(res));
    };
};
const getStatus = (userId: number): ThunkType => {
    return async (dispatch) => {
        const res = await profileApi.getStatus(userId);
        dispatch(actions.setStatus(res));
    };
};
const updateStatus = (status: string, authorizedUserId: number): ThunkType => {
    return async (dispatch) => {
        const res = await profileApi.updateStatus(status);
        if (res.resultCode === 0) {
            dispatch(getStatus(authorizedUserId));
        }
    };
};
const savePhoto = (photo: PhotosType):ThunkType => {
    return async (dispatch) => {
        const res = await profileApi.savePhoto(photo);
        if (res.resultCode === 0) {
            dispatch(actions.savePhotoSuccess(res.data.photos));
        }
    };
};
const saveProfile = (profile: ProfileType):ThunkType => {
    return async (dispatch) => {
        const res = await profileApi.saveProfile(profile);
        if (res.resultCode === 0 && profile) {
            dispatch(setUserProfile(profile.userId));
            dispatch(actions.setError(null));
        } else {
            dispatch(actions.setError(res.messages[0]));
        }
    };
};

export {
    profileReducer,
    setUserProfile,
    getStatus,
    updateStatus,
    actions,
    savePhoto,
    saveProfile,
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
export type DispatchProfileType = Dispatch<ActionsType>
type ThunkType = BaseThunkType<ActionsType>
