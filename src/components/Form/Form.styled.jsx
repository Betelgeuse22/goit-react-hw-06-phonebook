import styled from 'styled-components';

export const FormStyle = styled.form``;

export const Input = styled.input`
  margin: 20px 0;
  padding: 20px;

  width: 100%;
  height: 40px;
  border-radius: 20px;
  border-style: 2px solid green;

  background-color: rgba(206, 186, 186, 0.4);
`;

export const Label = styled.label`
  font-style: italic;
  font-size: 16px;
  text-decoration: dotted;
  color: grey;
`;

export const Button = styled.button`
  padding: 5px 10px;
  height: 30px;
  width: 150px;
  font-size: 16px;
  color: black;

  background-color: rgba(191, 204, 191, 0.6);
  border-radius: 20px;
  border-style: 2px solid green;

  cursor: pointer;
`;
