import { useState } from 'react';
import Preloader from '../../common/preloader/Preloader';
import styles from './Profile.module.scss';
import ProfileStatus from './ProfileStatus';
import { ProfileDescribForm } from './ProfileDescribForm';

export function ProfileInfo(props) {
    const [editMode, setEditMode] = useState(false);
    if (!props.profile) {
        return <Preloader />;
    }
    const onMainPhotoSelected = (e) => {
        props.savePhoto(e.target.files[0]);
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    return (
        <div>
            <div className={styles.img}>
                <img
                    src={
                        props.profile.photos?.large
                            ? props.profile.photos.large
                            : 'https://answit.com/wp-content/uploads/2017/01/full-hd.jpg'
                    }
                    width={500}
                    height={400}
                    alt='img'
                />
                <div>
                    {props.isOwner && (
                        <input onChange={onMainPhotoSelected} type='file' />
                    )}
                </div>
            </div>

            <div className={styles.descriptionBlock}>
                <ProfileStatus
                    userId={props.profile.userId}
                    status={props.status}
                    updateStatus={props.updateStatus}
                    authorizedUserId={props.authorizedUserId}
                />
                {props.isOwner && editMode ? (
                    <ProfileDescribForm
                        toggleEditMode={toggleEditMode}
                        {...props}
                    />
                ) : (
                    <ProfileDescrib
                        {...props}
                        toggleEditMode={toggleEditMode}
                    />
                )}
            </div>
        </div>
    );
}

const ProfileDescrib = (props) => {
    const contacts = [];
    for (let key in props.profile.contacts) {
        contacts.push({
            name: key,
            value: props.profile.contacts[key],
        });
    }
    return (
        <>
            {props.isOwner && (
                <div>
                    <button onClick={() => props.toggleEditMode()}>
                        Редактировать
                    </button>
                </div>
            )}
            <div className={styles.fullName}>
                <b>Имя: </b>
                {props.profile.fullName}
            </div>
            <div>
                <b>Обо мне: </b>
                <span>{props.profile.aboutMe || 'не указано'}</span>
            </div>
            <div>
                <b>Устроен на работу: </b>
                <span>{props.profile.lookingForAJob ? 'Да' : 'Нет'}</span>
            </div>
            {props.profile.lookingForAJob && (
                <div>
                    <b>Опыт работы: </b>
                    <span>
                        {props.profile.lookingForAJobDescription ||
                            'не указано'}
                    </span>
                </div>
            )}
            <div>
                <div>
                    <b>Контакты: </b>
                    {contacts.map((el, i) => {
                        return (
                            <div key={i}>
                                <b>{el.name}: </b>
                                {el.value || 'не указано'}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};
