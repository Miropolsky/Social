import { DialogItem } from './DialogItem/DialogItem';
import { Message } from './Message/Message';
import styles from './Dialogs.module.scss';
import { Field, Form, Formik } from 'formik';
import {
    DialogType,
    MessageType,
    PhotosType,
    ProfileType,
} from '../../types/types';
import { useEffect, useState } from 'react';
import { Button, Input, Space } from 'antd';
import { useLocation } from 'react-router-dom';

type PropsDialogsType = {
    addMessage: (text: string) => void;
    getMessage: (userId: number) => void;
    sendMessage: (userId: number, text: string) => void;
    getFriends: () => void;
    setUserProfile: (userId: number) => void;
    profile: ProfileType;
    dialogsData: Array<DialogType>;
    messagesData: Array<MessageType>;
    userId: number;
};
export default function Dialogs(props: PropsDialogsType) {
    const query = useLocation();
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [actualId, setActualId] = useState(0);
    const addNewMessage = (values: string) => {
        if (actualId !== null) {
            props.sendMessage(actualId, values);
            props.getMessage(actualId);
        }
    };
    useEffect(() => {
        props.getFriends();

        let curId;
        let path = query.pathname.split('/');
        if (path.length === 3) {
            curId = +path[2];
            setIsOpenDialog(true);
            setActualId(curId);
            props.getMessage(curId);
        } else {
            setIsOpenDialog(false);
        }
        // eslint-disable-next-line
    }, [query]);
    useEffect(() => {
        props.setUserProfile(props.userId);
    }, [props.userId]);

    const findName = (id: number) => {
        const findUser = props.dialogsData.find((user: DialogType) => {
            return user.id === id;
        });
        if (findUser === undefined) {
            return 'Не найден';
        }
        return findUser?.name;
    };
    const findPhotos = (id: number) => {
        if (id === props.profile?.userId && props.profile?.photos) {
            return props.profile.photos;
        }
        const findUser = props.dialogsData.find((user: DialogType) => {
            return user.id === id;
        });
        if (findUser === undefined || !findUser.photos) {
            return 'Не найден';
        }
        return findUser.photos;
    };
    return (
        <div className={styles.container}>
            <div className={styles.contentBlock}>
                <div
                    className={
                        isOpenDialog
                            ? `${styles.dialogsSmall}`
                            : `${styles.dialogs}`
                    }
                >
                    {props.dialogsData.map((dialogaItem) => {
                        return (
                            <DialogItem
                                isActive={actualId === dialogaItem.id}
                                isOpenDialog={isOpenDialog}
                                key={dialogaItem.id}
                                name={dialogaItem.name}
                                id={dialogaItem.id}
                                photos={dialogaItem.photos}
                                // setActualId={setActualId}
                            />
                        );
                    })}
                </div>
                {isOpenDialog && (
                    <>
                        <div className={styles.messagesBlock}>
                            <div className={styles.messages}>
                                {props.messagesData.map((message) => {
                                    return (
                                        <Message
                                            photos={findPhotos(
                                                message.senderId
                                            )}
                                            message={message.body}
                                            key={message.id}
                                            date={message.addedAt}
                                            senderName={message.senderName}
                                            name={findName(message.senderId)}
                                        />
                                    );
                                })}
                            </div>
                            <AddMessageForm onSubmit={addNewMessage} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

type ValuesFormType = {
    text: string;
};

type PropsAddMessageType = {
    onSubmit: (value: string) => void;
};

const AddMessageForm = (props: PropsAddMessageType) => {
    return (
        <Formik
            initialValues={{ text: '' }}
            onSubmit={(values: ValuesFormType, helper) => {
                props.onSubmit(values.text);
                helper.resetForm();
            }}
        >
            <Form
                style={{
                    marginTop: '10px',
                }}
            >
                <Space direction='vertical'>
                    <div>
                        <Field name='text' placeholder='Enter your message'>
                            {({ field }: any) => (
                                <Input.TextArea
                                    {...field}
                                    rows={4}
                                    style={{ width: '400px' }}
                                />
                            )}
                        </Field>
                    </div>
                    <Button htmlType='submit' type='primary'>
                        Отправить
                    </Button>
                </Space>
            </Form>
        </Formik>
    );
};
