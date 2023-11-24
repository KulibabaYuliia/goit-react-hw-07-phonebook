import { FormWrap, StyledField } from './ContactForm.styled';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { nanoid } from 'nanoid';

import { useDispatch } from 'react-redux';
import { fetchAddContacts } from 'redux/contacts/contacts.reducer';

const phoneRegExp = /[0-9]{3}-[0-9]{2}-[0-9]{2}/;
const nameRegExp = /^[a-zA-Zа-яА-Я]+(([' ][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

let userSchema = yup.object().shape({
  name: yup
    .string('Name is not valid')
    .matches(nameRegExp, 'Name is not valid')
    .required(),
  number: yup
    .string('Phone number is not valid')
    .matches(phoneRegExp, 'Phone number is not valid')
    .required(),
});

export const ContactForm = () => {
  const dispatch = useDispatch();

  const submitHandler = (values, action) => {
    const contact = {
      id: nanoid(),
      name: values.name,
      phone: values.number,
    };
    dispatch(fetchAddContacts(contact));
    action.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={userSchema}
      onSubmit={submitHandler}
    >
      <FormWrap>
        <label>
          Name
          <StyledField type="text" name="name" />
          <ErrorMessage name="name" component="div" />
        </label>
        <label>
          Number
          <StyledField type="tel" name="number" placeholder="123-45-67" />
          <ErrorMessage name="number" component="div" />
        </label>
        <button type="submit">Add contact</button>
      </FormWrap>
    </Formik>
  );
};
