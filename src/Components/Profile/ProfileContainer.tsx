import React from 'react';
import { connect } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import {
    setUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile,
} from '../../redux/profileReducer';
import Profile from './Profile';
// import { withAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/reduxStore';
import { ProfileType } from '../../types/types';

type MapStateToPropsType = {
    profile: ProfileType | null
    status: string
    authorizedUserId: number | null
    error: string | null
}

type MapDispatchPropsType = {
    setUserProfile: (userId:number | null) => void
    getStatus: (userId:number | null) => void
    updateStatus: (status: string | null, authorizedUserId: number | null) => void,
    savePhoto: (photo: File | null) => void,
    saveProfile: (profile: ProfileType | null) => void
}

type OwnPropsType = {
    userId: number | null
}

type PropsType = MapStateToPropsType & MapDispatchPropsType & OwnPropsType;

function withRouter(Children: typeof React.Component ) {
    return (props: PropsType) => {
        const match = { params: useParams() };
        let userId = match.params.userId;
        if (!props.authorizedUserId && !userId) {
            return <Navigate to='/login' />;
        }
        return <Children {...props} userId={userId} />;
    };
}

class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId = this.props.userId;
        if (!this.props.userId) {
            userId = this.props.authorizedUserId;
        }
        this.props.setUserProfile(userId);
        this.props.getStatus(userId);
    }
    componentDidMount() {
        this.refreshProfile();
    }
    componentDidUpdate(prevProps: PropsType) {
        if (this.props.userId !== prevProps.userId) {
            this.refreshProfile();
        }
    }
    render() {
        return (
            <Profile
                isOwner={!this.props.userId}
                {...this.props}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                error={this.props.error}
            />
        );
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    error: state.profilePage.errorSaveProfile,
});

export default compose<React.Component>(
    connect(mapStateToProps, {
        setUserProfile,
        getStatus,
        updateStatus,
        savePhoto,
        saveProfile,
    }),
    withRouter
    // withAuthRedirect
)(ProfileContainer);
