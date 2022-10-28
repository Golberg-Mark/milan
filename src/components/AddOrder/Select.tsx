import React, { useState } from 'react';
import styled from 'styled-components';

import useOnClickOutside from '@/hooks/useOnClickOutside';
import { BsChevronDown } from 'react-icons/all';

interface Props {
  items: string[]
}

const Select: React.FC<Props> = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState(0);
  const [ref, isItemsVisible, toggleIsItemsVisible] = useOnClickOutside<HTMLDivElement>();

  return (
    <Wrapper ref={ref}>
      <StyledSelect onClick={toggleIsItemsVisible}>
        {items[selectedItem]}
        <BsChevronDown style={{ transform: isItemsVisible ? 'rotate(180deg)' : '' }}/>
      </StyledSelect>
      {isItemsVisible ? (
        <Dropdown>
          {items.map((el, i) => (
            <DropdownItem
              key={`${el}${i}`}
              isSelected={i === selectedItem}
              onClick={() => setSelectedItem(i)}
            >
              {el}
            </DropdownItem>
          ))}
        </Dropdown>
      ) : ''}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const StyledSelect = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .5rem .75rem;
  width: 100%;
  min-width: 160px;
  height: 42px;
  border: 1px solid rgba(156, 163, 175, .6);
  border-radius: 5px;
  text-align: left;
  line-height: 1.5rem;
  background-color: rgba(17, 24, 39, .05);
  color: rgba(17, 24, 39, .6);
  
  svg {
    margin-left: .5rem;
  }
`;

const Dropdown = styled.ul`
  position: absolute;
  right: 0;
  top: calc(100% + 4px);
  left: 0;
  padding: .5rem 0;
  max-height: 200px;
  border: 1px solid rgba(156, 163, 175, .6);
  border-radius: 5px;
  background-color: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 100;
`;

const DropdownItem = styled.li<{ isSelected: boolean }>`
  padding: .25rem .75rem;
  color: ${({ isSelected }) => isSelected ? 'rgb(36, 99, 235)' : 'inherit'};
  cursor: pointer;

  :hover {
    color: rgba(36, 99, 235, .7)
  }
`;

export default Select;
