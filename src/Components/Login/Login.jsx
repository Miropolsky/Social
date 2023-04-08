import { Field, Form, Formik } from 'formik';
import React from 'react';
import { validate } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login, logout } from '../../redux/authReducer';
import { Navigate } from 'react-router-dom';

function Login(props) {
    const onSubmit = (formData, actions) => {
        props.login(
            formData.email,
            formData.password,
            formData.rememberMe,
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
            <LoginForm onSubmit={onSubmit} />
        </div>
    );
}

const LoginForm = (props) => {
    return (
        <Formik
            initialValues={{ email: '', password: '', rememberMe: false }}
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
});
export default connect(mapStateToProps, { login, logout })(Login);
