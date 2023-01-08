import { Toaster } from 'react-hot-toast';
import Form from '../Form/Form';
import Contacts from '../Contacts/Contacts';
import Filter from '../Filter/Filter';
import { AppSection, TitelPhone, TitelContact } from './App.styled';
import { GlobalStyle } from '../GlobalStyle';

function App() {
  return (
    <AppSection>
      <GlobalStyle />
      <Toaster />
      <TitelPhone>Phonebook</TitelPhone>
      <Form />
      <TitelContact>Contacts</TitelContact>
      <Filter />
      <Contacts />
    </AppSection>
  );
}

export default App;
