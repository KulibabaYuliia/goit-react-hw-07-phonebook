import { FilterWrap } from './Filter.styled';
import { changeFilter } from 'redux/contacts/contacts.reducer';
import { useDispatch } from 'react-redux';

export const Filter = () => {
  const dispatch = useDispatch();

  return (
    <FilterWrap>
      <label>
        Find contact by name
        <input
          type="text"
          name="filter"
          onChange={e => dispatch(changeFilter(e.target.value))}
        />
      </label>
    </FilterWrap>
  );
};
