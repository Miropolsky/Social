import styles from './Users.module.scss';
import defaultAvatar from '../../assets/img/defaultAvatar.jpg';
import React from 'react';

export default function Users(props) {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return (
        <div>
            <div>
                {pages.map((el) => {
                    return (
                        <span
                            onClick={(e) => {
                                props.onPageChange(el);
                            }}
                            className={
                                props.currentPage === el && styles.selectedPage
                            }
                        >
                            {el}
                        </span>
                    );
                })}
            </div>
            {props.users.map((u) => (
                <div key={u.id}>
                    <span>
                        <div>
                            <img
                                src={
                                    u.photos.small
                                        ? u.photos.small
                                        : defaultAvatar
                                }
                                alt={'Аватарка'}
                                className={styles.userPhoto}
                            />
                        </div>
                        <div>
                            {u.followed ? (
                                <button onClick={() => props.unfollow(u.id)}>
                                    Unfollow
                                </button>
                            ) : (
                                <button onClick={() => props.follow(u.id)}>
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
