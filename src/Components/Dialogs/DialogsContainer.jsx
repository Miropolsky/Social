import { connect } from 'react-redux';
import {
    addMessageActionCreator,
    updateNewMessageTextCreator,
} from '../../redux/diaglogReducer';
import Dialogs from './Dialogs';

const mapStateToProps = (state) => {
    return {
        dialogsData: state.dialogsPage.dialogs,
        messagesData: state.dialogsPage.messages,
        newMessageText: state.dialogsPage.newMessageText,
    };
};
const mapDistpatchToProps = (dispatch) => {
    return {
        updateTextMessage: (text) => {
            dispatch(updateNewMessageTextCreator(text));
        },
        addMessage: () => {
            dispatch(addMessageActionCreator());
        },
    };
};
const DialogsContainer = connect(mapStateToProps, mapDistpatchToProps)(Dialogs);

export default DialogsContainer;
