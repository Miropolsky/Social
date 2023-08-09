import { useSelector } from 'react-redux';
import React from 'react';
import Users from './Users';
import Preloader from '../common/preloader/Preloader';
import { getIsFetching } from '../../redux/usersSelectors';
import { AppStateType } from '../../redux/reduxStore';
import { useNavigate } from 'react-router-dom';

type UserPagePropsType = {};
export const UsersPage: React.FC<UserPagePropsType> = (props) => {
    const navigate = useNavigate();
    const isFetching = useSelector(getIsFetching);
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
    if (!isAuth) {
        navigate('/login');
    }
    return (
        <div>
            {isFetching ? <Preloader /> : null}
            {isAuth && <Users />}
        </div>
    );
};
