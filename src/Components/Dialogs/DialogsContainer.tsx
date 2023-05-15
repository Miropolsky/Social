import { connect } from 'react-redux';
import { addMessage } from '../../redux/diaglogReducer';
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
    connect(mapStateToProps, { addMessage }),
    withAuthRedirect
)(Dialogs);
