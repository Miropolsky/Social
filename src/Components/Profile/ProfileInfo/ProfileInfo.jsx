import styles from './Profile.module.scss';

export function ProfileInfo() {
    return (
        <div>
            <div className={styles.img}>
                <img
                    src='https://answit.com/wp-content/uploads/2017/01/full-hd.jpg'
                    width={1000}
                    height={400}
                    alt='img'
                />
            </div>
            <div className={styles.descriptionBlock}>ava + description</div>
        </div>
    );
}
