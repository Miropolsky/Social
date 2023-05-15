import { ProfileType } from '../../../types/types';
import styles from './Profile.module.scss';
import { Field, Form, Formik } from 'formik';

type PropsDescribType = {
    profile: ProfileType | null
    isOwner: boolean
    error: string | null
    toggleEditMode: () => void
    handleSubmit: (profile: ProfileType | null) => void
}
export const ProfileDescribForm = (props: PropsDescribType) => {
    if (!props.profile) {
        return <>Профиль не найден</>
    }
    const contacts: Array<{name: string; value: string}> = [];
    for (let key in props.profile.contacts) {
        contacts.push({
            name: key,
            //@ts-ignore
            value: props.profile.contacts[key],
        });
    }
    const onSubmit = (formData: ProfileType, actions?: any) => {
        if (formData.fullName) {
            let res = props.handleSubmit({ ...props.profile, ...formData });
            //@ts-ignore
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
                //@ts-ignore
                initialValues ={{
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
                        <div>
                            <button
                                // disabled={isSubmitting}
                                type='submit'
                                //@ts-ignore
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
