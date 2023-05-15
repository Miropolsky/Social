import Post from './Post/Post';
import styles from './MyPost.module.scss';
import React from 'react';
import { Field, Form, Formik } from 'formik';
import { PostType } from '../../../types/types';

type PropsMyPostType = {
    postsData: Array<PostType>
    addPost: (text: string) => void
}
export const MyPost = React.memo((props:PropsMyPostType) => {
    const addPost = (values: ValuesFormType) => {
        props.addPost(values.textPost);
    };
    return (
        <div className={styles.postsBlock}>
            <h3>MyPosts</h3>
            <div>
                <AddNewPost onSubmit={addPost} />
            </div>
            <div className={styles.posts}>
                {props.postsData.map((post) => {
                    return (
                        <Post
                            message={post.message}
                            key={post.id}
                            likesCount={post.likesCount}
                        />
                    );
                })}
            </div>
        </div>
    );
});

type ValuesFormType = {
    textPost: string
}

type PropsAddNewPostType = {
    onSubmit: (values: ValuesFormType) => void
}

const AddNewPost = (props: PropsAddNewPostType) => {
    return (
        <Formik
            initialValues={{ textPost: '' }}
            onSubmit={(values) => props.onSubmit(values)}
        >
            <Form>
                <div>
                    <Field as='textarea' name='textPost' />
                </div>
                <button type='submit'>Add post</button>
            </Form>
        </Formik>
    );
};
