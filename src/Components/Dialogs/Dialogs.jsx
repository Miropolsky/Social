import { DialogItem } from './DialogItem/DialogItem';
import { Message } from './Message/Message';
import styles from './Dialogs.module.scss';
import { useRef } from 'react';

export default function Dialogs(props) {
    const newMessage = useRef();
    const addMessage = () => {
        props.addMessage();
    };

    const updateTextMessage = () => {
        props.updateTextMessage(newMessage.current.value);
    };
    return (
        <div className={styles.container}>
            <div className={styles.dialogs}>
                {props.dialogsData.map((dialogaItem) => {
                    return (
                        <DialogItem
                            key={dialogaItem.id}
                            name={dialogaItem.name}
                            id={dialogaItem.id}
                            imgUrl={dialogaItem.imgUrl}
                        />
                    );
                })}
            </div>
            <div className={styles.messages}>
                <div>
                    {props.messagesData.map((message) => {
                        return (
                            <Message
                                message={message.message}
                                key={message.id}
                            />
                        );
                    })}
                </div>
                <div>
                    <textarea
                        ref={newMessage}
                        onChange={updateTextMessage}
                        value={props.newMessageText}
                    ></textarea>
                </div>
                <div>
                    <button onClick={addMessage}>Отправить</button>
                </div>
            </div>
        </div>
    );
}
