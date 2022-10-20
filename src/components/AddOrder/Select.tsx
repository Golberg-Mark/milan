import React, { useState } from 'react';
import styled from 'styled-components';
import useToggle from '@/hooks/useToggle';
import useOnClickOutside from '@/hooks/useOnClickOutside';

interface Props {
  items: string[]
}

const Select: React.FC<Props> = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState(0);
  const [isItemsVisible, toggleIsItemsVisible] = useToggle();
  const ref = useOnClickOutside<HTMLUListElement>(() => toggleIsItemsVisible(false));

  return (
    <Wrapper>
      <StyledSelect onClick={toggleIsItemsVisible}>
        {items[selectedItem]}
      </StyledSelect>
      {isItemsVisible ? (
        <Dropdown ref={ref}>
          {items.map((el, i) => (
            <DropdownItem
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
  padding: .5rem .75rem;
  width: 100%;
  height: 42px;
  border: 1px solid rgba(156, 163, 175, .6);
  border-radius: 5px;
  text-align: left;
  line-height: 1.5rem;
  background-color: rgba(17, 24, 39, .05);
  color: rgba(17, 24, 39, .6);
`;

const Dropdown = styled.ul`
  position: absolute;
  right: 0;
  top: calc(100% + 4px);
  left: 0;
  padding: .5rem 0;
  border: 1px solid rgba(156, 163, 175, .6);
  border-radius: 5px;
  background-color: #fff;
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
