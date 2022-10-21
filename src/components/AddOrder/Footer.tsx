import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { selectProductsPrice, selectTotalItemsAmount, selectTotalPrice } from '@/store/selectors/userSelectors';

interface Props {
  placeOrder: Function,
  isLoading: boolean,
  isError: boolean
}

const Footer: React.FC<Props> = ({ placeOrder, isLoading, isError }) => {
  const totalPrice = useSelector(selectTotalPrice);
  const productsPrice = useSelector(selectProductsPrice);
  const totalItemsAmount = useSelector(selectTotalItemsAmount);

  return (
    <StyledFooter>
      <Items>{totalItemsAmount ? `${totalItemsAmount} items` : 'No items'}</Items>
      <Price>Total: ${(totalPrice + productsPrice).toFixed(2)}</Price>
      <Button
        disabled={(productsPrice === 0 && totalPrice === 0) || totalItemsAmount === 0 || isError}
        onClick={() => placeOrder()}
      >
        {isLoading ? 'Loading...' : 'Place Order'}
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
  
  :not(:disabled):hover {
    background-color: rgba(36, 99, 235, .9);
  }
`;

export default Footer;
