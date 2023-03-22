// import { MyPost } from './MyPost/MyPost';
// import styles from './Profile.module.scss';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';
import MyPostContainer from './MyPost/MyPostContainer';

export default function Profile(props) {
    return (
        <div>
            <ProfileInfo profile={props.profile} />
            <MyPostContainer />
        </div>
    );
}
