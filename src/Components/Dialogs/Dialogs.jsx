import { DialogItem } from './DialogItem/DialogItem';
import { Message } from './Message/Message';
import styles from './Dialogs.module.scss';

export default function Dialogs({ state }) {
    return (
        <div className={styles.container}>
            <div className={styles.dialogs}>
                {state.dialogs.map((dialogaItem) => {
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
                {state.messages.map((message) => {
                    return (
                        <Message message={message.message} key={message.id} />
                    );
                })}
            </div>
        </div>
    );
}
