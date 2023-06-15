import { connect } from 'react-redux';
import { actions } from '../../redux/diaglogReducer';
import Dialogs from './Dialogs';
import { withAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/reduxStore';

const mapStateToProps = (state: AppStateType) => {
    return {
        dialogsData: state.dialogsPage.dialogs,
        messagesData: state.dialogsPage.messages,
    };
};

export default compose<React.Component>(
    connect(mapStateToProps, {
        addMessage: actions.addMessageActionCreator
    }),
    withAuthRedirect
)(Dialogs);
