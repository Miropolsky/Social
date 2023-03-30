import { connect } from 'react-redux';
import {
    addMessageActionCreator,
    updateNewMessageTextCreator,
} from '../../redux/diaglogReducer';
import Dialogs from './Dialogs';
import { withAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';

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

export default compose(
    connect(mapStateToProps, mapDistpatchToProps),
    withAuthRedirect
)(Dialogs);
