import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import toast from 'react-hot-toast';
import { addContact } from 'redux/contactsSlice';
import { getContacts } from 'redux/selectors';
import { FormStyle, Input, Label, Button } from './Form.styled';

export function Form() {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const nameId = nanoid();
  const numberId = nanoid();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChangeName = e => {
    const { value } = e.target;
    setName(value);
  };

  const handleChangeNumber = e => {
    const { value } = e.target;
    setNumber(value);
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    const id = nanoid();
    const name = e.target.name.value;
    const number = e.target.number.value;
    const contactsLists = [...contacts];

    if (
      contactsLists.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      toast.error(`${name} is already in contacts.`);
      return;
    } else if (contactsLists.find(contact => number === contact.number)) {
      toast.error(`${`${name} : ${number}`} is already in contacts.`);
      return;
    }

    dispatch(addContact({ id, name: name, number: number }));
    reset();
  };

  return (
    <>
      <FormStyle onSubmit={handleSubmit}>
        <Label htmlFor={nameId}>
          Name:
          <Input
            type="text"
            id={nameId}
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleChangeName}
          />
        </Label>
        <Label htmlFor={numberId}>
          Number:
          <Input
            type="tel"
            id={numberId}
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleChangeNumber}
          />
        </Label>
        <Button type="submit">Add Contact</Button>
      </FormStyle>
    </>
  );
}

export default Form;
