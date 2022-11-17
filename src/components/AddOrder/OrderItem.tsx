import React from 'react';
import styled from 'styled-components';

import useToggle from '@/hooks/useToggle';
import SuccessIcon from '@/assets/icons/SuccessIcon';
import Input from '@/components/Input';

interface Props {
  name: string,
  price: string,
  index: number,
  subItems?: {
    name: string,
    isChosen: boolean
  }[],
  setSubItems?: Function,
  inputs: {
    placeholder: string
  }[] | []
}

const OrderItem: React.FC<Props> = ({ name, price, index, subItems, setSubItems, inputs }) => {
  const [isSelected, toggleIsSelected] = useToggle();

  const onSubItemClick = (evt: React.MouseEvent<HTMLLIElement>, i: number) => {
    evt.stopPropagation();

    //setSubItems(index, i);
  };

  return (
    <Li onClick={toggleIsSelected}>
      <Item>
        <OrderItemName>
          <Arrow
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="rgba(0, 0, 0, .5)"
            isSelected={isSelected}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </Arrow>
          <p>
            {name}
            <span>{` (@ $${Number(price).toFixed(2)})`}</span>
          </p>
        </OrderItemName>
        <TotalPrice>
          --
        </TotalPrice>
      </Item>
      {subItems && isSelected ? (
        <SubItems>
          {subItems.map((subItem, i) => (
            <SubItem
              key={subItem.name}
              onClick={(evt) => onSubItemClick(evt, i)}
            >
              {subItem.isChosen ? <SuccessIcon color="var(--primary-blue-color)" /> : ''}
              {subItem.name}
            </SubItem>
          ))}
        </SubItems>
      ) : ''}
      {isSelected && inputs.length ? (
        <Inputs>
          {inputs.map((el) => el.placeholder ? <Input key={el.placeholder} placeholder={el.placeholder} /> : '')}
        </Inputs>
      ) : ''}
    </Li>
  );
};

const Li = styled.li`
  &:not(:last-child) {
    border-bottom: 1px solid rgb(229, 231, 235);
  }

  :hover {
    svg {
      stroke: rgba(0, 0, 0, .9);
    }
  }
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  cursor: pointer;
  user-select: none;
`;

const OrderItemName = styled.div`
  display: flex;
  align-items: center;

  span {
    color: #00000080;
    font-weight: 700;
  }
`;

const Arrow = styled.svg<{ isSelected: boolean }>`
  width: 1rem;
  height: 1rem;
  margin-right: 8px;
  transition: .2s ease-in-out;
  ${({ isSelected }) => isSelected ? 'transform: rotate(90deg)' : ''}
`;

const TotalPrice = styled.div`
  color: #00000080;
`;

const SubItems = styled.ul`
  display: flex;
  grid-gap: .5rem;
  flex-wrap: wrap;
  margin-bottom: .75rem;
`;

const SubItem = styled.li`
  display: flex;
  grid-gap: 4px;
  align-items: center;
  padding: .25rem .5rem;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid rgb(229, 231, 235);
  border-radius: 100px;
  cursor: pointer;

  svg {
    width: 14px;
    height: 14px;
  }
`;

const Inputs = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 24px;
`;

export default OrderItem;
