import React from 'react';
import styled, { css } from 'styled-components';

import useOnClickOutside from '@/hooks/useOnClickOutside';
import { BsChevronDown } from 'react-icons/all';

interface Props {
  prefix?: string,
  selectedItem?: number,
  setSelectedItem: Function,
  items: string[] | number[],
  openToTop?: boolean,
  modalRef?: HTMLDivElement
  placeholder?: string
}

const Select: React.FC<Props> = ({
  prefix = '',
  selectedItem,
  setSelectedItem,
  items,
  openToTop = false,
  modalRef,
  placeholder = ''
}) => {
  const [ref, isItemsVisible, toggleIsItemsVisible] = useOnClickOutside<HTMLDivElement>(false, modalRef);
  
  return (
    <Wrapper ref={ref}>
      <StyledSelect isPlaceholder={selectedItem === undefined} onClick={toggleIsItemsVisible}>
        {`${prefix} ${selectedItem !== undefined ? items[selectedItem] : placeholder}`}
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

const StyledSelect = styled.button<{ isPlaceholder: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 16px;
  width: 100%;
  height: 38px;
  border: 1px solid rgba(35, 35, 35, 0.16);
  border-radius: 4px;
  font-size: 12px;
  text-align: left;
  background-color: #fff;

  ${({ isPlaceholder }) => isPlaceholder && css`
    color: rgb(117, 117, 117) !important;
  `}

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
