import styles from './Post.module.scss';

type PropsType = {
    message: string,
    likesCount: number
}

export default function Post({ message, likesCount }: PropsType) {
    return (
        <div className={styles.container}>
            <div className={styles.blockAvatar}>
                <div className={styles.blockImg}>
                    <img
                        src='https://answit.com/wp-content/uploads/2017/01/full-hd.jpg'
                        width={50}
                        height={50}
                        alt='avatar'
                    />
                </div>
                <div className={styles.blockText}>{message}</div>
            </div>

            <div className={styles.likesCount}>like {likesCount}</div>
        </div>
    );
}
