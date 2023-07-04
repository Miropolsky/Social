import { useSelector } from 'react-redux';
import React from 'react';
import Users from './Users';
import Preloader from '../common/preloader/Preloader';
import {
    getIsFetching,
} from '../../redux/usersSelectors';

type UserPagePropsType = {
}
export const UsersPage: React.FC<UserPagePropsType> = (props) => {
    const isFetching = useSelector(getIsFetching);
    return (
        <div>
                {isFetching ? (
                    <Preloader />
                ) : (
                    null
                    )}
                    <Users/>
            </div>
    )
}
