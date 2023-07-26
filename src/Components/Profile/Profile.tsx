// import { MyPost } from './MyPost/MyPost';
// import styles from './Profile.module.scss';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';
// import MyPostContainer from './MyPost/MyPostContainer';
import { ProfileType } from '../../types/types';

type PropsType = {
    error: string | null;
    savePhoto: (photo: File | null) => void;
    isOwner: boolean;
    authorizedUserId: number | null;
    profile: ProfileType | null;
    status: string;
    updateStatus: (
        status: string | null,
        authorizedUserId: number | null
    ) => void;
    saveProfile: (profile: ProfileType | null) => void;
};

export default function Profile(props: PropsType) {
    return (
        <div
            style={{
                paddingLeft: 20,
                paddingTop: 20,
            }}
        >
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
            {/* <MyPostContainer /> */}
        </div>
    );
}
