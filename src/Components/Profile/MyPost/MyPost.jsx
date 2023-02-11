import Post from './Post/Post';
import styles from './MyPost.module.scss';

export function MyPost({ postsData }) {
    return (
        <div className={styles.postsBlock}>
            <h3>MyPosts</h3>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={styles.posts}>
                {postsData.map((post) => {
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
