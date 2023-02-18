const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

const initialState = {
    newPostText: '',
    posts: [
        { id: 1, message: 'Привет! Как дела?', likesCount: 0 },
        { id: 2, message: 'Это мой первый пост', likesCount: 23 },
    ],
};

const addPostActionCreator = () => {
    return {
        type: ADD_POST,
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
            const stateCopy = { ...state };
            const newPost = {
                id: 5,
                message: stateCopy.newPostText,
                likesCount: 0,
            };
            stateCopy.posts.push(newPost);
            stateCopy.newPostText = '';
            return stateCopy;
        }
        case UPDATE_NEW_POST_TEXT: {
            const stateCopy = { ...state };
            stateCopy.newPostText = action.newText;
            return stateCopy;
        }

        default:
            return state;
    }
};

export { profileReducer, addPostActionCreator, updateNewPostTextCreator };
