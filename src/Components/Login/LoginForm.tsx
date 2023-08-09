import { Button, Checkbox, Input } from 'antd';
import { Field, Form, Formik } from 'formik';
// import { validate } from '../../utils/validators/validators';

type PropsLoginFormType = {
    captchaUrl: string | null;
    // getCaptchaUrl: (text: string) => void ;
    onSubmit: (formData: ValuesFormType, actions: any) => void;
};

export type ValuesFormType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha: string;
};

const LoginForm = (props: PropsLoginFormType) => {
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                rememberMe: false,
                captcha: '',
            }}
            // validate={(values) => validate(values)}
            onSubmit={(values: ValuesFormType, actions: any) => {
                props.onSubmit(values, actions);
            }}
        >
            {({ errors, touched, isSubmitting, status }) => (
                <Form>
                    <div>
                        <Field type='email' name='email' placeholder='Email'>
                            {({ field }: any) => (
                                <Input
                                    {...field}
                                    placeholder='Email'
                                    style={{ width: '25%' }}
                                />
                            )}
                        </Field>
                        {/* {errors.email && touched.email && (
                            <div>{errors.email}</div>
                        )} */}
                    </div>
                    <div style={{ marginTop: '1%' }}>
                        <Field
                            name='password'
                            placeholder='Password'
                            type='password'
                        >
                            {({ field }: any) => (
                                <Input.Password
                                    style={{ width: '25%' }}
                                    {...field}
                                    placeholder='input password'
                                />
                            )}
                        </Field>
                        {/* {errors.password && touched.password && (
                            <div>{errors.password}</div>
                        )} */}
                    </div>
                    <div>
                        <Field
                            id={'rememberMe'}
                            name='rememberMe'
                            type='checkbox'
                        >
                            {({ field }: any) => (
                                <Checkbox
                                    style={{ marginTop: '1%' }}
                                    {...field}
                                >
                                    Remember Me
                                </Checkbox>
                            )}
                        </Field>
                        {/* <label htmlFor='rememberMe'>remember Me </label> */}
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
                            <div style={{ color: 'red', fontSize: '12px' }}>
                                {status.error}
                            </div>
                        ) : null
                    ) : null}
                    <Button
                        style={{ marginTop: '1%' }}
                        htmlType='submit'
                        type='primary'
                        disabled={!!Object.keys(errors).length && isSubmitting}
                    >
                        Login
                    </Button>
                    {/* <button type='submit'>Login</button> */}
                </Form>
            )}
        </Formik>
    );
};

export { LoginForm };
