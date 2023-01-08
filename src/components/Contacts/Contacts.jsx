import { Button } from '../../components/Form/Form.styled';
import { ContactName, Contactlist, ContactItem } from './Contact.styled';
import { TitelContact } from '../App/App.styled';
import { getContacts, getFilter } from 'redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';

const Contacts = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const onRemoveContact = contactId => dispatch(deleteContact(contactId));

  const getVisibleContacts = () => {
    return contacts.filter(contacts =>
      contacts.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <>
      {getVisibleContacts().length > 0 ? (
        <Contactlist>
          {getVisibleContacts().map((contact, id) => (
            <ContactItem key={id}>
              <ContactName>{contact.name + ' : ' + contact.number}</ContactName>
              {
                <Button
                  type="button"
                  onClick={() => onRemoveContact(contact.id)}
                >
                  Delete
                </Button>
              }
            </ContactItem>
          ))}
        </Contactlist>
      ) : (
        <TitelContact>It's empty here</TitelContact>
      )}
    </>
  );
};

export default Contacts