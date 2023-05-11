import { Field, Form, Formik } from 'formik';
import React from 'react';
import { validate } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login, logout, getCaptchaUrl } from '../../redux/authReducer.ts';
import { Navigate } from 'react-router-dom';

function Login(props) {
    const onSubmit = (formData, actions) => {
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

const LoginForm = (props) => {
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                rememberMe: false,
                captcha: '',
            }}
            onSubmit={(values, actions) => props.onSubmit(values, actions)}
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
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
});
export default connect(mapStateToProps, { login, logout, getCaptchaUrl })(
    Login
);
