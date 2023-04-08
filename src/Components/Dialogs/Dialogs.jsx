import { DialogItem } from './DialogItem/DialogItem';
import { Message } from './Message/Message';
import styles from './Dialogs.module.scss';
// import { useRef } from 'react';
import { Field, Form, Formik } from 'formik';

export default function Dialogs(props) {
    // const newMessage = useRef();
    // const addMessage = () => {
    //     props.addMessage();
    // };

    // const updateTextMessage = () => {
    //     props.updateTextMessage(newMessage.current.value);
    // };

    const addNewMessage = (values) => {
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

const AddMessageForm = (props) => {
    return (
        <Formik
            initialValues={{ text: '' }}
            onSubmit={(values) => props.onSubmit(values)}
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
