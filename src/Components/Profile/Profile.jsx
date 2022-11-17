import Post from '../Post/Post'
import styles from './Profile.module.scss'

export default function Profile() {
    return (
        <div>
            <div className={styles.img}>
                <img src='https://answit.com/wp-content/uploads/2017/01/full-hd.jpg' width={1000} height={400} alt='img'/>
            </div>
            <div>MyPosts</div>
            <textarea></textarea>
            <div>
                <Post text='Привет! Как дела'/>
                <Post text='Хорошо, ты как?'/>
                <Post text='Отлично!'/>
            </div>
        </div>
    )
}