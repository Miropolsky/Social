import Post from './Post/Post';
import styles from './MyPost.module.scss';
import React, { useRef } from 'react';
export function MyPost(props) {
    let newPost = useRef();
    const updateText = () => {
        props.updateNewPostText(newPost.current.value);
    };
    const addPost = () => {
        props.addPost();
    };
    return (
        <div className={styles.postsBlock}>
            <h3>MyPosts</h3>
            <div>
                <div>
                    <textarea
                        onChange={updateText}
                        ref={newPost}
                        value={props.newPostText}
                    ></textarea>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
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
}
