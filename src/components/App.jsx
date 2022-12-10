import React from 'react';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';

import Form from './Form/Form';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';
import { AppSection, TitelPhone, TitelContact } from './App.styled';
import { GlobalStyle } from './GlobalStyle';

const LS_KEY = 'contacts';

class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem(LS_KEY);
    const parsContacts = JSON.parse(savedContacts);

    if (parsContacts) {
      this.setState({ contacts: parsContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState) {
      localStorage.setItem(LS_KEY, JSON.stringify(contacts));
    }
  }

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const contact = { id: nanoid(), name, number };

    if (
      contacts.find(
        contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      toast.error(`${name} is already in contacts.`);
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
        <Toaster />
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
