import { connect } from 'react-redux';
import {
    actions,
    sendMessage,
    getMessage,
    getFriends,
} from '../../redux/diaglogReducer';
import Dialogs from './Dialogs';
import { withAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/reduxStore';
import { setUserProfile } from '../../redux/profileReducer';

const mapStateToProps = (state: AppStateType) => {
    return {
        dialogsData: state.dialogsPage.dialogs,
        messagesData: state.dialogsPage.messages,
        profile: state.profilePage.profile,
        userId: state.auth.id,
    };
};

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        // addMessage: actions.addMessageActionCreator,
        sendMessage,
        getMessage,
        getFriends,
        setUserProfile,
    }),
    withAuthRedirect
)(Dialogs);
