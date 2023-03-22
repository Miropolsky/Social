import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setUserProfile } from '../../redux/profileReducer';
import Profile from './Profile';

function withRouter(Children) {
    return (props) => {
        const match = { params: useParams() };
        let userId = match.params.userId;
        if (!userId) {
            userId = 2;
        }
        return <Children {...props} userId={userId} />;
    };
}

class ProfileContainer extends React.Component {
    componentDidMount() {
        axios
            .get(
                `https://social-network.samuraijs.com/api/1.0/profile/${this.props.userId}`
            )
            .then((res) => {
                this.props.setUserProfile(res.data);
            });
    }
    render() {
        return <Profile {...this.props} profile={this.props.profile} />;
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
});

export default connect(mapStateToProps, { setUserProfile })(
    withRouter(ProfileContainer)
);
