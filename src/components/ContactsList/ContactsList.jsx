import { ContactsListWrap } from './ContactsList.styled';
import { Contact } from '../Contact/Contact';
import { useSelector } from 'react-redux';
import { selectFilteredContacts } from 'redux/contacts/contacts.selectors';

export const ContactsList = () => {
  const filtredContactsList = useSelector(selectFilteredContacts);

  return (
    <ContactsListWrap>
      {filtredContactsList.map(contact => {
        return <Contact key={contact.id} contact={contact} />;
      })}
    </ContactsListWrap>
  );
};
