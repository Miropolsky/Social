import { DialogItem } from './DialogItem/DialogItem';
import { Message } from './Message/Message';
import styles from './Dialogs.module.scss';
import { Field, Form, Formik } from 'formik';
import { DialogType, MessageType } from '../../types/types';

type PropsDialogsType = {
    addMessage: (text: string ) => void,
    dialogsData: Array<DialogType>
    messagesData: Array<MessageType>
}
export default function Dialogs(props: PropsDialogsType) {
    const addNewMessage = (values: ValuesFormType) => {
        props.addMessage(values.text);
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
                <AddMessageForm onSubmit={addNewMessage} />
            </div>
        </div>
    );
}

type ValuesFormType = {
    text: string
}

type PropsAddMessageType = {
    onSubmit: (value: ValuesFormType ) => void,
}

const AddMessageForm = (props: PropsAddMessageType  ) => {
    return (
        <Formik
            initialValues={{ text: '' }}
            onSubmit={(values: ValuesFormType) => props.onSubmit(values)}
        >
            <Form>
                <div>
                    <Field
                        as='textarea'
                        name='text'
                        placeholder='Enter your message'
                    />
                </div>
                <div>
                    <button type='submit'>Отправить</button>
                </div>
            </Form>
        </Formik>
    );
};
