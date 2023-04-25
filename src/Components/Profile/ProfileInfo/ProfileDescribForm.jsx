import styles from './Profile.module.scss';
import { Field, Form, Formik } from 'formik';

export const ProfileDescribForm = (props) => {
    const contacts = [];
    for (let key in props.profile.contacts) {
        contacts.push({
            name: key,
            value: props.profile.contacts[key],
        });
    }
    const onSubmit = (formData, actions) => {
        if (formData.fullName) {
            let res = props.handleSubmit({ ...props.profile, ...formData });
            res.then((res) => {
                console.log(res.data.messages);
                if (!res.data.messages.length) {
                    props.toggleEditMode();
                }
            });
        }
    };

    return (
        <>
            <Formik
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
                onSubmit={(values) => onSubmit(values)}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div>
                            <button
                                // disabled={isSubmitting}
                                type='submit'
                                onClick={onSubmit}
                            >
                                Сохранить
                            </button>
                        </div>
                        {props.error && (
                            <div className={styles.error}>{props.error}</div>
                        )}
                        <div className={styles.fullName}>
                            <b>Имя: </b>
                            <Field
                                type='text'
                                name='fullName'
                                placeholder='fullName'
                            />
                        </div>
                        <div>
                            <b>Обо мне: </b>
                            <Field
                                type='text'
                                name='aboutMe'
                                placeholder='aboutMe'
                            />
                        </div>
                        <div>
                            <b>Устроен на работу: </b>
                            <Field
                                type='checkbox'
                                name='lookingForAJob'
                                placeholder='lookingForAJob'
                            />
                        </div>
                        <div>
                            <b>Опыт работы: </b>
                            <Field
                                type='text'
                                name='lookingForAJobDescription'
                                placeholder='lookingForAJobDescription'
                            />
                        </div>

                        <div>
                            <div>
                                <b>Контакты: </b>
                                {contacts.map((el, i) => {
                                    return (
                                        <div key={i}>
                                            <b>{el.name}: </b>
                                            <Field
                                                type='text'
                                                name={`contacts.${el.name}`}
                                                placeholder={`url ${el.name}`}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};
