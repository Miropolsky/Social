import styles from './Users.module.scss';
import defaultAvatar from '../../assets/img/defaultAvatar.jpg';
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Users(props) {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return (
        <div className={styles.container}>
            <div className={styles.pages}>
                {pages.map((el) => {
                    return (
                        <span
                            key={el}
                            onClick={() => {
                                props.onPageChange(el);
                            }}
                            className={
                                props.currentPage === el
                                    ? styles.selectedPage
                                    : null
                            }
                        >
                            {el}
                        </span>
                    );
                })}
            </div>
            {props.users.map((u) => (
                <div key={u.id} className={styles.user}>
                    <span>
                        <div>
                            <NavLink to={`/profile/${u.id}`}>
                                <img
                                    src={
                                        u.photos.small
                                            ? u.photos.small
                                            : defaultAvatar
                                    }
                                    alt={'Аватарка'}
                                    className={styles.userPhoto}
                                />
                            </NavLink>
                        </div>
                        <div>
                            {u.followed ? (
                                <button
                                    disabled={props.followingInProgress.some(
                                        (id) => id === u.id
                                    )}
                                    onClick={() => {
                                        props.unfollow(u.id);
                                    }}
                                >
                                    Unfollow
                                </button>
                            ) : (
                                <button
                                    disabled={props.followingInProgress.some(
                                        (id) => id === u.id
                                    )}
                                    onClick={() => {
                                        props.follow(u.id);
                                    }}
                                >
                                    Follow
                                </button>
                            )}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            {/* <div>{u.location.country}</div>
                        <div>{u.location.city}</div> */}
                        </span>
                    </span>
                </div>
            ))}
        </div>
    );
}
