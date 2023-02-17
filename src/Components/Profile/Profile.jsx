// import { MyPost } from './MyPost/MyPost';
// import styles from './Profile.module.scss';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';
import { MyPostContainer } from './MyPost/MyPostContainer';

export default function Profile({ store }) {
    return (
        <div>
            <ProfileInfo />
            <MyPostContainer store={store} />
        </div>
    );
}
