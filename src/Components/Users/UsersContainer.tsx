import { connect } from 'react-redux';
import {
    follow,
    unfollow,
    getUsers,
} from '../../redux/usersReducer';
import React from 'react';
import Users from './Users';
import Preloader from '../common/preloader/Preloader';
// import { withAuthRedirect } from './../../hoc/WithAuthRedirect';
import { compose } from 'redux';
import {
    getAllUsers,
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
} from '../../redux/usersSelectors';
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/reduxStore';

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    totalUsersCount: number
    isFetching: boolean
    users: Array<UserType>
    followingInProgress: Array<number>
}
type MapDispatchPropsType = {
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

type OwnPropsType = {
    pageTitle: string
}



type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType
class UsersAPIComponent extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChange = (pageNum: number) => {
        this.props.getUsers(pageNum, this.props.pageSize);
    };
    render() {
        return (
            <div>
                <h2>{this.props.pageTitle}</h2>
                {this.props.isFetching ? (
                    <Preloader />
                ) : (
                    <Users
                        totalUsersCount={this.props.totalUsersCount}
                        pageSize={this.props.pageSize}
                        onPageChange={this.onPageChange}
                        currentPage={this.props.currentPage}
                        users={this.props.users}
                        unfollow={this.props.unfollow}
                        follow={this.props.follow}
                        followingInProgress={this.props.followingInProgress}
                    />
                )}
            </div>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress,
//     };
// };

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getAllUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    };
};

export default compose<React.Component>(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        follow,
        unfollow,
        getUsers,
    })
    // withAuthRedirect
)(UsersAPIComponent);
