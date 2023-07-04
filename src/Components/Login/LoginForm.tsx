import { Field, Form, Formik } from "formik";
// import { validate } from '../../utils/validators/validators';

type PropsLoginFormType = {
    captchaUrl: string | null,
    // getCaptchaUrl: (text: string) => void ;
    onSubmit: (formData: ValuesFormType, actions: any) => void
}

export type ValuesFormType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
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
            // validate={(values) => validate(values)}
            onSubmit={(values: ValuesFormType, actions: any) => {
                props.onSubmit(values, actions)
            }}
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

export { LoginForm }