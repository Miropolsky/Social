const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

const initialState = {
    newPostText: '',
    posts: [
        { id: 1, message: 'Привет! Как дела?', likesCount: 0 },
        { id: 2, message: 'Это мой первый пост', likesCount: 23 },
    ],
    profile: null,
};

const addPostActionCreator = () => {
    return {
        type: ADD_POST,
    };
};
const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile,
    };
};

const updateNewPostTextCreator = (text) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text,
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
                        message: state.newPostText,
                        likesCount: 0,
                    },
                ],
                newPostText: '',
            };
        }
        case UPDATE_NEW_POST_TEXT: {
            return { ...state, newPostText: action.newText };
        }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile };
        }

        default:
            return state;
    }
};

export {
    profileReducer,
    addPostActionCreator,
    updateNewPostTextCreator,
    setUserProfile,
};
