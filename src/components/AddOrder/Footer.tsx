import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { selectProductsPrice, selectTotalItemsAmount, selectTotalPrice } from '@/store/selectors/orderSelectors';
import Button from '@/components/Button';

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
  left: 256px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  grid-gap: 32px;
  padding: 32px 48px;
  background-color: #fff;
  border-top: 1px solid rgba(35, 35, 35, 0.16);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 100;
`;

const Items = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  height: 38px;
  border: 1px solid #23232329;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
`;

const Price = styled.p`
  font-size: 16px;
  font-weight: 500;
`;

export default Footer;
