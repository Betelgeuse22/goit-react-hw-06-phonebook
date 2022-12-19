import { useState } from 'react';
import { FormStyle, Input, Label, Button } from './Form.styled';
import PropTypes from 'prop-types';

function Form({ onAddContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const hendleInputChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    onAddContact({ name: name, number: number });

    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <FormStyle onSubmit={handleSubmit}>
        <Label>
          Name:
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={hendleInputChange}
          />
        </Label>
        <Label>
          Number:
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={hendleInputChange}
          />
        </Label>
        <Button type="submit">Add Contact</Button>
      </FormStyle>
    </>
  );
}

export default Form;

Form.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
