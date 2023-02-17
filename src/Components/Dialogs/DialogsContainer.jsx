import {
    addMessageActionCreator,
    updateNewMessageTextCreator,
} from '../../redux/diaglogReducer';
import Dialogs from './Dialogs';

export default function DialogsContainer({ store }) {
    const state = store.getState();
    const addMessage = () => {
        const action = addMessageActionCreator();
        store.dispatch(action);
    };

    const updateTextMessage = (text) => {
        const action = updateNewMessageTextCreator(text);
        store.dispatch(action);
    };
    return (
        <Dialogs
            addMessage={addMessage}
            updateTextMessage={updateTextMessage}
            newMessageText={state.dialogsPage.newMessageText}
            messagesData={state.dialogsPage.messages}
            dialogsData={state.dialogsPage.dialogs}
        />
    );
}
