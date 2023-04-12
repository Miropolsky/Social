import {
    addPostActionCreator,
    deletePost,
    profileReducer,
} from './profileReducer';

const initialState = {
    posts: [
        { id: 1, message: 'Привет! Как дела?', likesCount: 0 },
        { id: 2, message: 'Это мой первый пост', likesCount: 23 },
    ],
};

test('new post should be added length', () => {
    let action = addPostActionCreator('hello');
    let newState = profileReducer(initialState, action);
    expect(newState.posts.length).toBe(3);
});

test('new post should be added correct message', () => {
    let action = addPostActionCreator('hello');
    let newState = profileReducer(initialState, action);

    expect(newState.posts[2].message).toBe('hello');
});

test('after deleting length of message should be decrement', () => {
    let action = deletePost(1);
    let newState = profileReducer(initialState, action);

    expect(newState.posts.length).toBe(1);
});
