import styles from './Users.module.scss';
import cn from 'classnames';
import defaultAvatar from '../../assets/img/defaultAvatar.jpg';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserType } from '../../types/types';

type PropsType = {
    u: UserType,
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

export default function User({ u, followingInProgress, follow, unfollow }: PropsType) {
    return (
        <div className={cn(styles.user)}>
            <span>
                <div>
                    <NavLink to={`/profile/${u.id}`}>
                        <img
                            src={
                                u.photos.small ? u.photos.small : defaultAvatar
                            }
                            alt={'Аватарка'}
                            className={cn(styles.userPhoto)}
                        />
                    </NavLink>
                </div>
                <div>
                    {u.followed ? (
                        <button
                            disabled={followingInProgress.some(
                                (id) => id === u.id
                            )}
                            onClick={() => {
                                unfollow(u.id);
                            }}
                        >
                            Unfollow
                        </button>
                    ) : (
                        <button
                            disabled={followingInProgress.some(
                                (id) => id === u.id
                            )}
                            onClick={() => {
                                follow(u.id);
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
    );
}
