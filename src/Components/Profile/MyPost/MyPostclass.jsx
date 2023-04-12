import Post from './Post/Post';
import styles from './MyPost.module.scss';
import React from 'react';
import { Field, Form, Formik } from 'formik';
export default class MyPostclass extends React.PureComponent {
    addPost = (values) => {
        this.props.addPost(values.textPost);
    };
    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps !== this.props || nextState !== this.state;
    // }
    render() {
        return (
            <div className={styles.postsBlock}>
                <h3>MyPosts</h3>
                <div>
                    <AddNewPost onSubmit={this.addPost} />
                </div>
                <div className={styles.posts}>
                    {this.props.postsData.map((post) => {
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
    }
}

const AddNewPost = (props) => {
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
