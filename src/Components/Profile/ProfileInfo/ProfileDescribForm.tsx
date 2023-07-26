import { Button, Card, Checkbox, Input, Space } from 'antd';
import { ProfileType } from '../../../types/types';
import styles from './Profile.module.scss';
import { Field, Form, Formik } from 'formik';

type PropsDescribType = {
    profile: ProfileType | null;
    isOwner: boolean;
    error: string | null;
    toggleEditMode: () => void;
    handleSubmit: (profile: ProfileType | null) => void;
};
export const ProfileDescribForm = (props: PropsDescribType) => {
    if (!props.profile) {
        return <>Профиль не найден</>;
    }
    const contacts: Array<{ name: string; value: string }> = [];
    for (let key in props.profile.contacts) {
        contacts.push({
            name: key,
            //@ts-ignore
            value: props.profile.contacts[key],
        });
    }
    const onSubmit = (formData: ProfileType, actions?: any) => {
        if (formData.fullName) {
            props.handleSubmit({ ...props.profile, ...formData });

            props.toggleEditMode();
        }
    };

    return (
        <>
            <Formik
                //@ts-ignore
                initialValues={{
                    fullName: `${props.profile.fullName}`,
                    aboutMe: `${props.profile.aboutMe || ''}`,
                    lookingForAJob: props.profile.lookingForAJob === true,
                    lookingForAJobDescription: `${
                        props.profile.lookingForAJobDescription || ''
                    }`,
                    contacts: {
                        facebook: `${props.profile.contacts.facebook || ''}`,
                        website: `${props.profile.contacts.website || ''}`,
                        vk: `${props.profile.contacts.vk || ''}`,
                        twitter: `${props.profile.contacts.twitter || ''}`,
                        instagram: `${props.profile.contacts.instagram || ''}`,
                        youtube: `${props.profile.contacts.youtube || ''}`,
                        github: `${props.profile.contacts.github || ''}`,
                        mainLink: `${props.profile.contacts.mainLink || ''}`,
                    },
                }}
                onSubmit={(values: ProfileType) => onSubmit(values)}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Card title='Информация о пользователе'>
                            <Space direction='vertical' size={5}>
                                <Space>
                                    <div className={styles.titleDescrib}>
                                        Имя:
                                    </div>
                                    <Field
                                        type='text'
                                        name='fullName'
                                        placeholder='fullName'
                                    >
                                        {({ field }: any) => (
                                            <Input {...field} />
                                        )}
                                    </Field>
                                </Space>
                                <Space>
                                    <div className={styles.titleDescrib}>
                                        Обо мне:
                                    </div>
                                    <Field
                                        type='text'
                                        name='aboutMe'
                                        placeholder='aboutMe'
                                    >
                                        {({ field }: any) => (
                                            <Input {...field} />
                                        )}
                                    </Field>
                                </Space>
                                <Space>
                                    <div className={styles.titleDescrib}>
                                        Устроен на работу:
                                    </div>
                                    <Field
                                        type='checkbox'
                                        name='lookingForAJob'
                                        placeholder='lookingForAJob'
                                    >
                                        {({ field }: any) => (
                                            <Checkbox {...field} />
                                        )}
                                    </Field>
                                </Space>
                                {props.profile?.lookingForAJob && (
                                    <Space>
                                        <div className={styles.titleDescrib}>
                                            Опыт работы:
                                        </div>
                                        <Field
                                            type='text'
                                            name='lookingForAJobDescription'
                                            placeholder='lookingForAJobDescription'
                                        >
                                            {({ field }: any) => (
                                                <Input {...field} />
                                            )}
                                        </Field>
                                    </Space>
                                )}

                                <Space direction='vertical' size={0}>
                                    <div className={styles.titleDescrib}>
                                        Контакты:
                                    </div>
                                    <div>
                                        <Space>
                                            {contacts.map((el, i) => {
                                                return (
                                                    <Card
                                                        title={el.name}
                                                        size='small'
                                                        key={i}
                                                    >
                                                        <Field
                                                            type='text'
                                                            name={`contacts.${el.name}`}
                                                            placeholder={`url ${el.name}`}
                                                        >
                                                            {({
                                                                field,
                                                            }: any) => (
                                                                <Input
                                                                    {...field}
                                                                    placeholder='Url'
                                                                />
                                                            )}
                                                        </Field>
                                                    </Card>
                                                );
                                            })}
                                        </Space>
                                    </div>
                                </Space>
                                {props.error && (
                                    <div className={styles.error}>
                                        {props.error}
                                    </div>
                                )}
                                <Button
                                    style={{ marginTop: 15 }}
                                    htmlType='submit'
                                    //@ts-ignore
                                    onClick={onSubmit}
                                >
                                    Сохранить
                                </Button>
                            </Space>
                        </Card>
                    </Form>
                )}
            </Formik>
        </>
    );
};
