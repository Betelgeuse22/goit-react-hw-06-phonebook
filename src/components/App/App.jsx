import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';

import Form from '../Form/Form';
import Contacts from '../Contacts/Contacts';
import Filter from '../Filter/Filter';
import { AppSection, TitelPhone, TitelContact } from './App.styled';
import { GlobalStyle } from '../GlobalStyle';

const LS_KEY = 'contacts';

function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem(LS_KEY)) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = e => {
    const id = nanoid();
    const name = e.name;
    const number = e.number;
    const contactsLists = [...contacts];

    if (
      contacts.find(
        contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      toast.error(`${name} is already in contacts.`);
    } else if (contactsLists.find(contact => number === contact.number)) {
      toast.error(`${`${name} : ${number}`} is already in contacts.`);
    } else {
      contactsLists.push({ id, name, number });
    }

    setContacts(contactsLists);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    return contacts.filter(contacts =>
      contacts.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const removeContact = e => {
    setContacts(contacts.filter(contact => contact.id !== e));
  };

  return (
    <AppSection>
      <GlobalStyle />
      <Toaster />
      <TitelPhone>Phonebook</TitelPhone>
      <Form onAddContact={addContact} />
      <TitelContact>Contacts</TitelContact>
      <Filter value={filter} onChangeFilter={changeFilter} />

      {getVisibleContacts().length > 0 ? (
        <Contacts
          contacts={getVisibleContacts()}
          onRemoveContact={removeContact}
        />
      ) : (
        <TitelContact>It's empty here</TitelContact>
      )}
    </AppSection>
  );
}

export default App;
