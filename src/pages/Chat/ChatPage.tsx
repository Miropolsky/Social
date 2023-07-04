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

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    );
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
            style={{ height: '400px', overflowY: 'auto' }}
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
        return (
            <div>
                <img src={message.photo} alt='avatar' width={40} height={40} />
                <b>{message.userName}</b>
                <div>{message.message}</div>
                <hr></hr>
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
        <div>
            <div>
                <textarea
                    onChange={(e) => setMessage(e.currentTarget.value)}
                    value={message}
                    onKeyDown={(e) => textareaSend(e)}
                ></textarea>
            </div>
            <div>
                <button
                    disabled={status !== 'ready'}
                    onClick={sendMessageHandler}
                >
                    send
                </button>
            </div>
        </div>
    );
};

export default ChatPage;
