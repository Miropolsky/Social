import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    setUserProfile,
    getStatus,
    updateStatus,
} from '../../redux/profileReducer';
import Profile from './Profile';
// import { withAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';

function withRouter(Children) {
    return (props) => {
        const match = { params: useParams() };
        let userId = match.params.userId;
        if (!userId) {
            userId = 28221;
            console.log(props.authorizedUserId);
        }

        return <Children {...props} userId={userId} />;
    };
}

class ProfileContainer extends React.Component {
    componentDidMount() {
        this.props.setUserProfile(this.props.userId);
        this.props.getStatus(this.props.userId);
    }
    render() {
        return (
            <Profile
                {...this.props}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
            />
        );
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
});

export default compose(
    connect(mapStateToProps, { setUserProfile, getStatus, updateStatus }),
    withRouter
    // withAuthRedirect
)(ProfileContainer);
