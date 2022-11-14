import React from 'react';
import styled, { css } from 'styled-components';

import useOnClickOutside from '@/hooks/useOnClickOutside';
import { BsChevronDown } from 'react-icons/all';

interface Props {
  prefix?: string,
  selectedItem: number,
  setSelectedItem: Function,
  items: string[] | number[],
  openToTop?: boolean
}

const Select: React.FC<Props> = ({
  prefix = '',
  selectedItem,
  setSelectedItem,
  items,
  openToTop = false
}) => {
  const [ref, isItemsVisible, toggleIsItemsVisible] = useOnClickOutside<HTMLDivElement>();

  return (
    <Wrapper ref={ref}>
      <StyledSelect onClick={toggleIsItemsVisible}>
        {`${prefix} ${items[selectedItem]}`}
        <BsChevronDown style={{ transform: isItemsVisible ? 'rotate(180deg)' : '' }}/>
      </StyledSelect>
      {isItemsVisible ? (
        <Dropdown openToTop={openToTop}>
          {items.map((el, i) => (
            <DropdownItem
              key={`${el}${i}`}
              isSelected={i === selectedItem}
              onClick={() => {
                setSelectedItem(i);
              }}
            >
              {`${prefix} ${el}`}
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
  padding: 13px 16px;
  width: 100%;
  min-width: 160px;
  height: 38px;
  border: 1px solid rgba(35, 35, 35, 0.16);
  border-radius: 4px;
  font-size: 12px;
  text-align: left;
  background-color: #fff;

  svg {
    margin-left: .5rem;
    transition: .2s ease-in-out;
  }
`;

const Dropdown = styled.ul<{ openToTop: boolean }>`
  position: absolute;
  right: 0;
  left: 0;
  padding: .5rem 0;
  max-height: 200px;
  border: 1px solid rgba(156, 163, 175, .6);
  border-radius: 5px;
  background-color: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 100;
  
  ${({ openToTop }) => openToTop ? css`
    bottom: calc(100% + 4px);
  ` : css`
    top: calc(100% + 4px);
  `}
`;

const DropdownItem = styled.li<{ isSelected: boolean }>`
  padding: .25rem .75rem;
  font-size: 12px;
  color: ${({ isSelected }) => isSelected ? 'var(--primary-green-color)' : 'inherit'};
  cursor: pointer;

  :hover {
    color: var(--primary-green-hover-color);
  }
`;

export default Select;
