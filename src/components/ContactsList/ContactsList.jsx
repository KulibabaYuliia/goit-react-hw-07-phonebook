import { ContactsListWrap } from './ContactsList.styled';
import { Contact } from '../Contact/Contact';
import { useSelector } from 'react-redux';

export const ContactsList = () => {
  const filterValue = useSelector(state => state.filter.filter);
  const contacts = useSelector(state => state.contacts.contacts);

  const filteredContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(filterValue);
  });

  return (
    <ContactsListWrap>
      {filteredContacts.map(contact => {
        return <Contact key={contact.id} contact={contact} />;
      })}
    </ContactsListWrap>
  );
};
