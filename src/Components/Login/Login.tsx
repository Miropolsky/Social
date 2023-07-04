import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/authReducer';
import { Navigate } from 'react-router-dom';
import { AppStateType } from '../../redux/reduxStore';
import { LoginForm, ValuesFormType } from './LoginForm';
import { AnyAction } from 'redux';

const Login = () => {
    const captchaUrl = useSelector(
        (state: AppStateType) => state.auth.captchaUrl
    );
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
    const dispatch = useDispatch();
    const onSubmit = (formData: ValuesFormType, actions: any) => {
        dispatch(
            login(
                formData.email,
                formData.password,
                formData.rememberMe,
                formData.captcha,
                actions.setStatus
            ) as unknown as AnyAction
        );
        actions.resetForm();
    };
    if (isAuth) {
        return <Navigate to='/profile' />;
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginForm
                onSubmit={onSubmit}
                captchaUrl={captchaUrl}
                // getCaptchaUrl={dispatch(getCaptchaUrl as unknown as AnyAction)}
            />
        </div>
    );
};

export { Login };
