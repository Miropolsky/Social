import { Avatar } from 'antd';
import styles from '../Dialogs.module.scss';
import { PhotosType } from '../../../types/types';
import { UserOutlined } from '@ant-design/icons';

type PropsType = {
    message: string;
    date: string;
    senderName: string;
    name: string;
    photos: PhotosType | string;
};
export function Message(props: PropsType) {
    return (
        <div className={styles.message}>
            <Avatar
                size={44}
                icon={
                    props.photos &&
                    typeof props.photos !== 'string' &&
                    props.photos.large ? (
                        <img
                            src={props.photos.large}
                            alt='avatar'
                            width={44}
                            height={44}
                        />
                    ) : (
                        <UserOutlined />
                    )
                }
            />
            <div className={styles.blockMessage}>
                <div className={styles.name}>{props.senderName}</div>
                <div className={styles.messageText}>{props.message}</div>
            </div>
        </div>
    );
}
