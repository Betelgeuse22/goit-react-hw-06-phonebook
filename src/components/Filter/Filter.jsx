import React from 'react';
import { FilterText, FilterInput } from './Filter.styled';
import PropTypes from 'prop-types';

const Filter = ({ value, onChangeFilter }) => (
  <>
    <FilterText>Find contacts by name</FilterText>
    <FilterInput type="text" value={value} onChange={onChangeFilter} />
  </>
);

export default Filter;

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};
