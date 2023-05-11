import styles from './Users.module.scss';
import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import { UserType } from '../../types/types';

type PropsType = {
    currentPage: number
    onPageChange: (el: number) => void
    totalUsersCount: number
    pageSize: number
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

export default function Users(props: PropsType) {
    return (
        <div className={styles.container}>
            <Paginator
                currentPage={props.currentPage}
                onPageChange={props.onPageChange}
                totalUsersCount={props.totalUsersCount}
                pageSize={props.pageSize}
            />
            {props.users.map((u) => (
                <User
                    key={u.id}
                    u={u}
                    followingInProgress={props.followingInProgress}
                    follow={props.follow}
                    unfollow={props.unfollow}
                />
            ))}
        </div>
    );
}
