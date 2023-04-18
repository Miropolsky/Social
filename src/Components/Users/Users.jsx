import styles from './Users.module.scss';
import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

export default function Users(props) {
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
