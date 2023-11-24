import { ContactsList } from './ContactsList/ContactsList';
import { ContactForm } from './ContactForm/ContactForm';
import { Loader } from './Loader/Loader';
import { Filter } from './Filter/Filter';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContacts } from 'redux/contacts/contacts.reducer';
import { useSelector } from 'react-redux';
import {
  selectIsLoading,
  selectError,
} from 'redux/contacts/contacts.selectors';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const errorMassege = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div
      style={{
        padding: '20px',
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      {isLoading && <Loader />}
      {errorMassege && (
        <div>Something went wrong. Error messege: {errorMassege}</div>
      )}
      <ContactsList />
    </div>
  );
};
