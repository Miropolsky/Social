import { Field, Form, Formik } from 'formik';
import { FilterType } from '../../redux/usersReducer';
import React from 'react';
import { useSelector } from 'react-redux';
import { getUsersFilter } from '../../redux/usersSelectors';
import { Button, Input, Select, Space } from 'antd';

const userSeacrhFormValidate = (value: any) => {
    const errors = {};
    return errors;
};

type PropsType = {
    onFilterChange: (filter: FilterType) => void;
};

type FormType = {
    term: string;
    friend: 'true' | 'false' | 'null';
};

export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
    const filter = useSelector(getUsersFilter);
    const submit = (values: FormType) => {
        const filter: FilterType = {
            term: values.term,
            friend:
                values.friend === 'null'
                    ? null
                    : values.friend === 'true'
                    ? true
                    : false,
        };
        props.onFilterChange(filter);
    };
    return (
        <div style={{ marginTop: '20px' }}>
            <Formik
                enableReinitialize
                initialValues={{
                    term: filter.term,
                    friend: String(filter.friend) as 'true' | 'false' | 'null',
                }}
                validate={userSeacrhFormValidate}
                onSubmit={submit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Space size={10}>
                            <Field type='text' name='term'>
                                {({ field }: any) => (
                                    <Input
                                        {...field}
                                        placeholder='UserName'
                                        style={{ width: '100%' }}
                                    ></Input>
                                )}
                            </Field>
                            <Field name='friend'>
                                {({ field, form }: any) => (
                                    <Select
                                        {...field}
                                        onChange={(e) => {
                                            form.setFieldValue('friend', e);
                                        }}
                                        defaultValue='null'
                                        style={{ width: 140 }}
                                    >
                                        <Select.Option value='null'>
                                            All
                                        </Select.Option>
                                        <Select.Option value='true'>
                                            Only followed
                                        </Select.Option>
                                        <Select.Option value='false'>
                                            Only unfollowed
                                        </Select.Option>
                                    </Select>
                                )}
                            </Field>
                        </Space>
                        <div>
                            <Space size={30} style={{ marginTop: '15px' }}>
                                <Button
                                    size='middle'
                                    onClick={() =>
                                        submit({ term: '', friend: 'null' })
                                    }
                                >
                                    Reset
                                </Button>
                                <Button
                                    size='middle'
                                    htmlType='submit'
                                    type='primary'
                                    disabled={isSubmitting}
                                >
                                    Find
                                </Button>
                            </Space>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
});
