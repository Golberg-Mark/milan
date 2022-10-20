import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectTotalPrice } from '@/store/selectors/userSelectors';

interface Props {
  totalItemsAmount: number,
  placeOrder: Function
}

const Footer: React.FC<Props> = ({ totalItemsAmount, placeOrder }) => {
  const totalPrice = useSelector(selectTotalPrice);

  return (
    <StyledFooter>
      <Items>{totalItemsAmount ? `${totalItemsAmount} items` : 'No items'}</Items>
      <Price>Total: ${totalPrice.toFixed(2)}</Price>
      <Button disabled onClick={() => placeOrder()}>
        Place Order
      </Button>
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 255px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  grid-gap: .75rem;
  padding: 12px 30px 12px 20px;
  background-color: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, .25);
  z-index: 100;
`;

const Items = styled.span`
  padding: 4px 8px;
  border: 1px solid rgba(156, 163, 175, .8);
  border-radius: 100px;
  font-size: 13px;
`;

const Price = styled.p`
  font-size: 18px;
  font-weight: 600;
`;

const Button = styled.button`
  padding: .5rem 1.5rem;
  height: 42px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  color: #fff;
  background-color: var(--primary-blue-color);
  
  :disabled {
    background-color: rgba(36, 99, 235, .4);
  }
  
  :hover {
    background-color: rgba(36, 99, 235, .9);
  }
`;

export default Footer;
