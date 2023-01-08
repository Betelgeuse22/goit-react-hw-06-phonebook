import { useDispatch, useSelector } from 'react-redux';
import { FilterText, FilterInput } from './Filter.styled';
import { getFilter } from 'redux/selectors';
import { setFilter } from 'redux/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const onChangeFilter = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <>
      <FilterText>Find contacts by name</FilterText>
      <FilterInput type="text" value={filter} onChange={onChangeFilter} />
    </>
  );
};

export default Filter;
