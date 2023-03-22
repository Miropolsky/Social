import Preloader from '../../common/preloader/Preloader';
import styles from './Profile.module.scss';

export function ProfileInfo(props) {
    if (!props.profile) {
        return <Preloader />;
    }
    return (
        <div>
            <div className={styles.img}>
                <img
                    src={
                        props.profile.photos.large
                            ? props.profile.photos.large
                            : 'https://answit.com/wp-content/uploads/2017/01/full-hd.jpg'
                    }
                    width={1000}
                    height={400}
                    alt='img'
                />
            </div>
            {props.profile.lookingForAJob ? (
                <div className={styles.descriptionBlock}>
                    {props.profile.lookingForAJobDescription}
                </div>
            ) : null}
            <div className={styles.fullName}>{props.profile.fullName}</div>
        </div>
    );
}
