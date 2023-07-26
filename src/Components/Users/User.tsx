import styles from './Users.module.scss';
import cn from 'classnames';
import defaultAvatar from '../../assets/img/defaultAvatar.jpg';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserType } from '../../types/types';
import { Avatar, Button, Card, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';

type PropsType = {
    u: UserType;
    followingInProgress: Array<number>;
    follow: (userId: number) => void;
    unfollow: (userId: number) => void;
};

export default function User({
    u,
    followingInProgress,
    follow,
    unfollow,
}: PropsType) {
    const navigate = useNavigate();

    return (
        <div className={cn(styles.user)}>
            <Card
                hoverable
                style={{ width: 220 }}
                // bordered={false}
                cover={
                    <img
                        style={{ width: 220 }}
                        alt='avatar'
                        src={u.photos.small ? u.photos.small : defaultAvatar}
                    />
                }
            >
                <Meta
                    title={u.name}
                    style={{
                        marginBottom: 10,
                    }}
                />
                <Space size='middle'>
                    {u.followed ? (
                        <Button
                            disabled={followingInProgress.some(
                                (id) => id === u.id
                            )}
                            onClick={() => {
                                unfollow(u.id);
                            }}
                        >
                            Unfollow
                        </Button>
                    ) : (
                        <Button
                            disabled={followingInProgress.some(
                                (id) => id === u.id
                            )}
                            onClick={() => {
                                follow(u.id);
                            }}
                        >
                            Follow
                        </Button>
                    )}
                    <Button
                        style={{ marginLeft: 10 }}
                        onClick={() => navigate(`/profile/${u.id}`)}
                    >
                        Profile
                    </Button>
                </Space>
            </Card>
        </div>
    );
}
