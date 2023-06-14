import { Field, Form, Formik } from 'formik';
import React from 'react';
import { validate } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login, getCaptchaUrl } from '../../redux/authReducer';
import { Navigate } from 'react-router-dom';
import { AppStateType } from '../../redux/reduxStore';

type PropsLoginType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string | null, setStatus: Function) => void,
    isAuth: boolean,
    captchaUrl: string | null,
    getCaptchaUrl: (text: string) => void;
}

function Login(props: PropsLoginType) {
    const onSubmit = (formData:ValuesFormType, actions: any) => {
        props.login(
            formData.email,
            formData.password,
            formData.rememberMe,
            formData.captcha,
            actions.setStatus
        );
        actions.resetForm();
    };
    if (props.isAuth) {
        return <Navigate to='/profile' />;
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginForm
                onSubmit={onSubmit}
                captchaUrl={props.captchaUrl}
                getCaptchaUrl={props.getCaptchaUrl}
            />
        </div>
    );
}

type ValuesFormType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
}

type PropsLoginFormType = {
    onSubmit: (formData:ValuesFormType, actions: any) => void,
    captchaUrl: string | null,
    getCaptchaUrl: (text: string) => void;
}

const LoginForm = (props: PropsLoginFormType) => {
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                rememberMe: false,
                captcha: '',
            }}
            onSubmit={(values: ValuesFormType, actions: any) => props.onSubmit(values, actions)}
            validate={validate}
        >
            {({ errors, touched, isSubmitting, status }) => (
                <Form>
                    <div>
                        <Field type='email' name='email' placeholder='Email' />
                        {errors.email && touched.email && (
                            <div>{errors.email}</div>
                        )}
                    </div>
                    <div>
                        <Field
                            name='password'
                            placeholder='Password'
                            type='password'
                        />
                        {errors.password && touched.password && (
                            <div>{errors.password}</div>
                        )}
                    </div>
                    <div>
                        <Field
                            id={'rememberMe'}
                            name='rememberMe'
                            type='checkbox'
                        />
                        <label htmlFor='rememberMe'>remember Me </label>
                    </div>
                    {props.captchaUrl && (
                        <div>
                            <div>
                                <img
                                    src={props.captchaUrl}
                                    alt='captcha'
                                    width={150}
                                />
                            </div>
                            <Field
                                required
                                id='captcha'
                                name='captcha'
                                type='text'
                            />
                            {errors.captcha && <div>{errors.captcha}</div>}
                        </div>
                    )}
                    {status ? (
                        status.error ? (
                            <div>{status.error}</div>
                        ) : null
                    ) : null}
                    <button
                        type='submit'
                        disabled={!!Object.keys(errors).length && isSubmitting}
                    >
                        Login
                    </button>
                </Form>
            )}
        </Formik>
    );
};

type MapStateToProps = {
    isAuth: boolean,
    captchaUrl: string | null
}
const mapStateToProps = (state: AppStateType): MapStateToProps => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
});
export default connect(mapStateToProps, { login, getCaptchaUrl })(
    Login
);
