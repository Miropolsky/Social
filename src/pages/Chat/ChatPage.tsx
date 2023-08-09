import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    sendMessage,
    startMessagesListening,
    stopMessagesListening,
} from '../../redux/chatReducer';
import { AnyAction } from 'redux';
import { AppStateType } from '../../redux/reduxStore';
import { ChatMessageType } from '../../api/chatApi';
import { Avatar, Button, Input, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const ChatPage: React.FC = () => {
    const navigate = useNavigate();
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
    if (!isAuth) {
        navigate('/login');
    }
    return <div style={{ marginLeft: '25px' }}>{isAuth && <Chat />}</div>;
};

const Chat: React.FC = () => {
    const dispatch = useDispatch();
    const status = useSelector((state: AppStateType) => state.chat.status);
    useEffect(() => {
        dispatch(startMessagesListening() as unknown as AnyAction);
        return () => {
            dispatch(stopMessagesListening() as unknown as AnyAction);
        };
        // eslint-disable-next-line
    }, []);
    return (
        <div>
            {status === 'error' && (
                <div>Some error occured. Please refresh the page</div>
            )}
            <>
                <Messages />
                <AddMessageForm />
            </>
        </div>
    );
};

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages);

    const messageAnchorRef = useRef<HTMLDivElement>(null);
    const [isAutoScrollActive, setAutoScrollActive] = useState(false);
    useEffect(() => {
        if (isAutoScrollActive) {
            messageAnchorRef.current?.scrollIntoView({
                block: 'end',
                behavior: 'smooth',
            });
        }
        // eslint-disable-next-line
    }, [messages]);
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let element = e.currentTarget;
        if (
            Math.abs(
                element.scrollHeight - element.scrollTop - element.clientHeight
            ) < 300
        ) {
            !isAutoScrollActive && setAutoScrollActive(true);
        } else {
            isAutoScrollActive && setAutoScrollActive(false);
        }
    };
    return (
        <div
            style={{ height: window.innerHeight - 320, overflowY: 'auto' }}
            onScroll={scrollHandler}
        >
            {messages.map((m, i) => (
                <Message key={m.id} message={m} />
            ))}
            <div ref={messageAnchorRef}></div>
        </div>
    );
};

const Message: React.FC<{ message: ChatMessageType }> = React.memo(
    ({ message }) => {
        const navigate = useNavigate();
        return (
            <div style={{ height: 65 }}>
                <Space size={10}>
                    <Avatar
                        src={message.photo}
                        size={50}
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate(`/profile/${message.userId}`)}
                    />
                    <div>
                        <div style={{ fontWeight: 'bold', marginBottom: 5 }}>
                            {message.userName}
                        </div>

                        <div>{message.message}</div>
                    </div>
                </Space>
            </div>
        );
    }
);
const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('');
    const status = useSelector((state: AppStateType) => state.chat.status);
    const disptach = useDispatch();
    const sendMessageHandler = () => {
        if (!message) {
            return;
        }
        disptach(sendMessage(message) as unknown as AnyAction);
        setMessage('');
    };
    const textareaSend = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            sendMessageHandler();
        }
    };
    return (
        <div style={{ marginTop: 20 }}>
            <div>
                <Input.TextArea
                    placeholder='Введите сообщение'
                    value={message}
                    onKeyDown={(e) => textareaSend(e)}
                    onChange={(e) => setMessage(e.currentTarget.value)}
                    size='large'
                    style={{ width: '25%', resize: 'none' }}
                ></Input.TextArea>
            </div>

            <Button
                style={{ marginTop: 15 }}
                type='primary'
                disabled={status !== 'ready'}
                onClick={sendMessageHandler}
            >
                Send
            </Button>
        </div>
    );
};

export default ChatPage;
