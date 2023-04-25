export const validate = (values) => {
    const error = {};
    if (!values.email) {
        error.email = 'Required';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        error.email = 'Invalid email address';
    }
    if (!values.password) {
        error.password = 'Required';
    } else if (values.password.length < 4) {
        error.password = 'Password min length 4';
    }
    // if (!values.captcha) {
    //     error.captcha = 'Required';
    // }
    return error;
};
