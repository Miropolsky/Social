import { MyPost } from './MyPost/MyPost';
// import styles from './Profile.module.scss';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';

export default function Profile({ state }) {
    return (
        <div>
            <ProfileInfo />
            <MyPost postsData={state.posts} />
        </div>
    );
}
