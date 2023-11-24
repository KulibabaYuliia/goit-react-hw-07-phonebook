import { ContactWrap } from './Contact.styled';
import { useDispatch } from 'react-redux';
import { fetchDeleteContact } from 'redux/contacts/contacts.reducer';

export const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  return (
    <ContactWrap>
      <span>
        {contact.name}: {contact.phone}
      </span>
      <button onClick={() => dispatch(fetchDeleteContact(contact.id))}>
        delete
      </button>
    </ContactWrap>
  );
};
