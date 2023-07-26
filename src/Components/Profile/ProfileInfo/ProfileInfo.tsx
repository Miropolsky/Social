import { useState } from 'react';
import Preloader from '../../common/preloader/Preloader';
import styles from './Profile.module.scss';
import ProfileStatus from './ProfileStatus';
import { ProfileDescribForm } from './ProfileDescribForm';
import { ProfileType } from '../../../types/types';
import { Button, message, Image, Upload, Space, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import defaultAvatar from '../../../assets/img/defaultAvatar.jpg';

type PropsType = {
    error: string | null;
    savePhoto: (photo: File) => void;
    isOwner: boolean;
    authorizedUserId: number | null;
    profile: ProfileType | null;
    status: string;
    updateStatus: (
        status: string | null,
        authorizedUserId: number | null
    ) => void;
    handleSubmit: (profile: ProfileType | null) => void;
};

export function ProfileInfo(props: PropsType) {
    const [editMode, setEditMode] = useState(false);
    if (!props.profile) {
        return <Preloader />;
    }
    // const onMainPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files) {
    //         props.savePhoto(e.target.files[0]);
    //     }
    // };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };
    const propsUpload: UploadProps = {
        name: 'file',

        onChange(info) {
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                props.savePhoto(info.fileList[0].originFileObj as File);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <Space direction='vertical' size={1}>
            <div className={styles.fullName}>{props.profile.fullName}</div>
            <ProfileStatus
                userId={props.profile.userId}
                status={props.status}
                updateStatus={props.updateStatus}
                authorizedUserId={props.authorizedUserId}
            />
            <Space size={40} align='start' style={{ marginTop: '20px' }}>
                <div className={styles.avatar}>
                    <Image
                        width={325}
                        preview={{
                            width: '550',
                        }}
                        src={
                            props.profile.photos?.large
                                ? props.profile.photos.large
                                : defaultAvatar
                        }
                    />

                    <div
                        style={{
                            marginTop: 20,
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        {props.isOwner && (
                            <Upload
                                {...propsUpload}
                                maxCount={1}
                                showUploadList={false}
                            >
                                <Button icon={<UploadOutlined />}>
                                    Upload a new photo
                                </Button>
                            </Upload>
                        )}
                    </div>
                </div>

                <div className={styles.descriptionBlock}>
                    {props.isOwner && editMode ? (
                        <ProfileDescribForm
                            toggleEditMode={toggleEditMode}
                            {...props}
                        />
                    ) : (
                        <ProfileDescrib
                            toggleEditMode={toggleEditMode}
                            {...props}
                        />
                    )}
                </div>
            </Space>
        </Space>
    );
}

type PropsDescribType = {
    profile: ProfileType | null;
    isOwner: boolean;
    toggleEditMode: () => void;
    handleSubmit: (profile: ProfileType | null) => void;
};

const ProfileDescrib = (props: PropsDescribType) => {
    const contacts = [];
    if (!props.profile) {
        return <>Не найден профиль</>;
    }
    for (let key in props.profile.contacts) {
        contacts.push({
            name: key,
            //@ts-ignore
            value: props.profile.contacts[key],
        });
    }

    return (
        <div className={styles.profileInfo}>
            <div className={styles.blockDescrib}>
                <Card title='Информация о пользователе'>
                    <Space direction='vertical' size={5}>
                        <Space>
                            <div className={styles.titleDescrib}>Имя:</div>
                            <span>
                                {props.profile.fullName || 'не указано'}
                            </span>
                        </Space>
                        <Space>
                            <div className={styles.titleDescrib}>Обо мне:</div>
                            <span>{props.profile.aboutMe || 'не указано'}</span>
                        </Space>
                        <Space>
                            <div className={styles.titleDescrib}>
                                Устроен на работу:
                            </div>
                            <span>
                                {props.profile.lookingForAJob ? 'Да' : 'Нет'}
                            </span>
                        </Space>
                        {props.profile.lookingForAJob && (
                            <Space>
                                <div className={styles.titleDescrib}>
                                    Опыт работы:
                                </div>
                                <span>
                                    {props.profile.lookingForAJobDescription ||
                                        'не указано'}
                                </span>
                            </Space>
                        )}
                        <Space direction='vertical' size={0}>
                            <div className={styles.titleDescrib}>Контакты:</div>
                            <div>
                                <Space>
                                    {contacts.map((el, i) => {
                                        return (
                                            <Card
                                                title={el.name}
                                                size='small'
                                                key={i}
                                            >
                                                <div>
                                                    {el.value || 'не указано'}
                                                </div>
                                            </Card>
                                        );
                                    })}
                                </Space>
                            </div>
                        </Space>
                    </Space>
                    {props.isOwner && (
                        <div style={{ marginTop: 15 }}>
                            <Button onClick={() => props.toggleEditMode()}>
                                Редактировать
                            </Button>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};
