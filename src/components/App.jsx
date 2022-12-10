import React from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import Form from './Form/Form';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';
import { AppSection, TitelPhone, TitelContact } from './App.styled';
import { GlobalStyle } from './GlobalStyle';

class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const contact = { id: nanoid(), name, number };

    if (
      contacts.find(
        contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      Notify.failure(`${name} is already in contacts.`);
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };

  changeFilter = filter => {
    this.setState({ filter });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contacts =>
      contacts.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  removeContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  render() {
    const visibleContacts = this.getVisibleContacts();

    return (
      <AppSection>
        <GlobalStyle />
        <TitelPhone>Phonebook</TitelPhone>
        <Form onAddContact={this.addContact} />
        <TitelContact>Contacts</TitelContact>
        <Filter value={this.state.filter} onChangeFilter={this.changeFilter} />
        {visibleContacts.length > 0 ? (
          <Contacts
            contacts={visibleContacts}
            onRemoveContact={this.removeContact}
          />
        ) : (
          <TitelContact>This contact was not found</TitelContact>
        )}
      </AppSection>
    );
  }
}

export default App;
