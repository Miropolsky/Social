import { connect } from 'react-redux';
import { addMessageActionCreator } from '../../redux/diaglogReducer';
import Dialogs from './Dialogs';
import { withAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';

const mapStateToProps = (state) => {
    return {
        dialogsData: state.dialogsPage.dialogs,
        messagesData: state.dialogsPage.messages,
    };
};
const mapDistpatchToProps = (dispatch) => {
    return {
        addMessage: (text) => {
            dispatch(addMessageActionCreator(text));
        },
    };
};

export default compose(
    connect(mapStateToProps, mapDistpatchToProps),
    withAuthRedirect
)(Dialogs);
