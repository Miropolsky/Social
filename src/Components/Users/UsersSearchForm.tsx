import { Field, Form, Formik } from "formik";
import { FilterType } from "../../redux/usersReducer";
import React from 'react';
import { useSelector } from "react-redux";
import { getUsersFilter } from "../../redux/usersSelectors";

const userSeacrhFormValidate = (value: any) => {
    const errors = {};
    return errors;
}

type PropsType = {
    onFilterChange: (filter: FilterType) => void
}

type FormType = {
    term: string,
    friend: 'true' | 'false' | 'null'
}

export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
    const filter = useSelector(getUsersFilter)
    const submit = (values: FormType, { setSubmitting } : {setSubmitting : (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }
        setSubmitting(false);
        props.onFilterChange(filter)
      }
    return <div>
     <Formik
       enableReinitialize
       initialValues={{ term: filter.term, friend: String(filter.friend) as 'true' | 'false' | 'null'} }
       validate={userSeacrhFormValidate}
       onSubmit={submit}
     >
       {({ isSubmitting }) => (
         <Form>
           <Field type="text" name="term" />
           <Field name='friend' as='select'>
                <option value='null'>All</option>
                <option value='true'>Only followed</option>
                <option value='false'>Only unfollowed</option>
           </Field>
           <button type="submit" disabled={isSubmitting}>
             Find
           </button>
         </Form>
       )}
     </Formik>
    </div>
})