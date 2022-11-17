import styles from './Post.module.scss';

export default function Post({text}) {
    return (
        <div className={styles.container}>
            <div className={styles.blockImg}>
                <img src='https://answit.com/wp-content/uploads/2017/01/full-hd.jpg' width={50} height={50} />
            </div>
            <div className={styles.blockText}>
                {text}
            </div>
            
        </div>
    )
}