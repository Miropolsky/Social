// import { MyPost } from './MyPost/MyPost';
// import styles from './Profile.module.scss';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';
import MyPostContainer from './MyPost/MyPostContainer';

export default function Profile(props) {
    return (
        <div>
            <ProfileInfo
                error={props.error}
                savePhoto={props.savePhoto}
                isOwner={props.isOwner}
                authorizedUserId={props.authorizedUserId}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                handleSubmit={props.saveProfile}
            />
            <MyPostContainer />
        </div>
    );
}
