import styles from './Users.module.scss';
import React, { useEffect, useRef } from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import { UsersSearchForm } from './UsersSearchForm';
import {
    FilterType,
    getUsers,
    follow,
    unfollow,
} from '../../redux/usersReducer';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllUsers,
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsersFilter,
} from '../../redux/usersSelectors';
import { AppDispatch } from '../../redux/reduxStore';
import { AnyAction } from 'redux';
import { useNavigate } from 'react-router-dom';

export default function Users() {
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const users = useSelector(getAllUsers);
    const filter = useSelector(getUsersFilter);
    const followingInProgress = useSelector(getFollowingInProgress);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let page = params.get('page');
        let term = params.get('term');
        let friend = params.get('friend');

        let actualPage = currentPage;
        let actualFilter = filter;

        if (page !== '1' && page !== '0') {
            actualPage = Number(page);
        }
        if (!!term) {
            actualFilter = { ...actualFilter, term };
        }
        if (friend !== null) {
            actualFilter = {
                ...actualFilter,
                friend:
                    friend === 'null' ? null : friend === 'true' ? true : false,
            };
        }
        dispatch(
            getUsers(
                Number(actualPage),
                pageSize,
                actualFilter
            ) as unknown as AnyAction
        );
        // eslint-disable-next-line
    }, []);
    const ref = useRef(false);
    useEffect(() => {
        if (ref.current || currentPage === 1) {
            navigate(
                `/users?&term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
            );
        }
    }, [filter, currentPage, navigate]);

    useEffect(() => {
        ref.current = true;
    }, []);

    const onPageChange = (pageNumber: number) => {
        dispatch(
            getUsers(pageNumber, pageSize, filter) as unknown as AnyAction
        );
    };
    const onFilterChange = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter) as unknown as AnyAction);
    };
    const following = (userId: number) => {
        dispatch(follow(userId) as unknown as AnyAction);
    };
    const unfollowing = (userId: number) => {
        dispatch(unfollow(userId) as unknown as AnyAction);
    };

    return (
        <div className={styles.container}>
            <Paginator
                currentPage={currentPage}
                onPageChange={onPageChange}
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
            />
            <UsersSearchForm onFilterChange={onFilterChange} />
            {users.map((u) => (
                <User
                    key={u.id}
                    u={u}
                    followingInProgress={followingInProgress}
                    follow={following}
                    unfollow={unfollowing}
                />
            ))}
        </div>
    );
}
