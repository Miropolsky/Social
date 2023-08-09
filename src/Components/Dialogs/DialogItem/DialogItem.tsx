import { useNavigate } from 'react-router-dom';
import styles from '../Dialogs.module.scss';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { PhotosType } from '../../../types/types';

type PropsType = {
    id: number;
    name: string;
    photos: PhotosType;
    isOpenDialog: boolean;
    isActive: boolean;
    // setActualId: (id: number) => void;
};
export function DialogItem(props: PropsType) {
    const navigate = useNavigate();
    return (
        <div
            className={
                props.isOpenDialog
                    ? `${styles.dialogSmall} ${
                          props.isActive && styles.dialogActive
                      }`
                    : `${styles.dialog} ${
                          props.isActive && styles.dialogActive
                      }`
            }
            onClick={() => {
                // props.setActualId(props.id);
                navigate(`/dialogs/${props.id}`);
            }}
        >
            <div>
                <Avatar
                    size={64}
                    icon={
                        props.photos && props.photos.large ? (
                            <img
                                src={props.photos.large}
                                alt='avatar'
                                width={64}
                                height={64}
                            />
                        ) : (
                            <UserOutlined />
                        )
                    }
                />
            </div>
            <div>
                <div className={styles.name}>{props.name}</div>
            </div>
        </div>
    );
}
