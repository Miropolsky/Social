import React from 'react';
import {
    updateNewPostTextCreator,
    addPostActionCreator,
} from '../../../redux/profileReducer';
import { MyPost } from './MyPost';
export function MyPostContainer({ store }) {
    const state = store.getState();

    const updateText = (text) => {
        const action = updateNewPostTextCreator(text);
        store.dispatch(action);
    };
    const addPost = () => {
        const action = addPostActionCreator();
        store.dispatch(action);
    };
    return (
        <MyPost
            updateNewPostText={updateText}
            addPost={addPost}
            postsData={state.profilePage.posts}
            newPostText={state.profilePage.newPostText}
        />
    );
}
