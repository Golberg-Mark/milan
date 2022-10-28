import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { IoCloseOutline } from 'react-icons/all';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  clearField: () => void
}

const Search: React.FC<Props> = ({ clearField, ...props }) => {
  return (
    <StyledSearch>
      <SearchIcon
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="rgb(156, 163, 175)"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
          clipRule="evenodd"
        />
      </SearchIcon>
      <input {...props} />
      {props.value ? <ClearIcon onClick={clearField} /> : ''}
    </StyledSearch>
  );
};

const StyledSearch = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
`;

const SearchIcon = styled.svg`
  position: absolute;
  top: 50%;
  left: .5rem;
  width: 1.25rem;
  height: 1.25rem;
  transform: translateY(-50%);
`;

const ClearIcon = styled(IoCloseOutline)`
  position: absolute;
  top: 50%;
  right: .5rem;
  width: 1.25rem;
  height: 1.25rem;
  transform: translateY(-50%);
  cursor: pointer;
  
  :hover * {
    stroke: var(--primary-blue-color);
  }
`;

export default Search;
