import { connect } from 'react-redux';
import {
    follow,
    setCurrentPage,
    toggleIsFetching,
    setTotalUsersCount,
    setUsers,
    unfollow,
} from '../../redux/usersReducer';
import axios from 'axios';
import React from 'react';

import Users from './Users';
import Preloader from '../common/preloader/Preloader';

class UsersAPIComponent extends React.Component {
    componentDidMount() {
        this.props.toggleIsFetching(true);
        axios
            .get(
                `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
            )
            .then((res) => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(res.data.items);
                this.props.setTotalUsersCount(res.data.totalCount);
            });
    }

    onPageChange = (pageNum) => {
        this.props.toggleIsFetching(true);
        this.props.setCurrentPage(pageNum);
        axios
            .get(
                `https://social-network.samuraijs.com/api/1.0/users?page=${pageNum}&count=${this.props.pageSize}`
            )
            .then((res) => {
                this.props.toggleIsFetching(false);
                this.props.setUser(res.data.items);
            });
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
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
})(UsersAPIComponent);
