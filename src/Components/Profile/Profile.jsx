// import { MyPost } from './MyPost/MyPost';
// import styles from './Profile.module.scss';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';
import MyPostContainer from './MyPost/MyPostContainer';

export default function Profile(props) {
    return (
        <div>
            <ProfileInfo
                authorizedUserId={props.authorizedUserId}
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
            />
            <MyPostContainer />
        </div>
    );
}
