import React from 'react';
import { Button } from '../../components/Form/Form.styled';
import { ContactName, Contactlist, ContactItem } from './Contact.styled';
import PropTypes from 'prop-types';

const Contacts = ({ contacts, onRemoveContact }) => (
  <Contactlist>
    {contacts.map(({ id, name, number }) => (
      <ContactItem key={id}>
        <ContactName>{name + ' : ' + number}</ContactName>
        {
          <Button type="button" onClick={() => onRemoveContact(id)}>
            Delete
          </Button>
        }
      </ContactItem>
    ))}
  </Contactlist>
);

Contacts.propTypes = {
  onRemoveContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default Contacts;
