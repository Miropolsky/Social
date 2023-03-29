import { connect } from 'react-redux';
import {
    follow,
    setCurrentPage,
    unfollow,
    toggleFollowingProgress,
    getUsers,
} from '../../redux/usersReducer';
import React from 'react';
import Users from './Users';
import Preloader from '../common/preloader/Preloader';

class UsersAPIComponent extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChange = (pageNum) => {
        this.props.getUsers(pageNum, this.props.pageSize);
    };
    render() {
        return (
            <div>
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

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    };
};
// const mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId));
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId));
//         },
//         setUser: (users) => {
//             dispatch(setUsersAC(users));
//         },
//         setCurrentPage: (currentPage) => {
//             dispatch(setCurrentPageAC(currentPage));
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setTotalUsersCountAC(totalCount));
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(setIsFetchingAC(isFetching));
//         },
//     };
// };

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    toggleFollowingProgress,
    getUsers,
})(UsersAPIComponent);
