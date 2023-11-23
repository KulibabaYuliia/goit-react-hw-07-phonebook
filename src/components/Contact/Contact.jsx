import { ContactWrap } from './Contact.styled';
import { useDispatch } from 'react-redux';
import { deleteContacts } from 'redux/sliceContacts';

export const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  return (
    <ContactWrap>
      <span>
        {contact.name}: {contact.number}
      </span>
      <button onClick={() => dispatch(deleteContacts(contact.id))}>
        delete
      </button>
    </ContactWrap>
  );
};
