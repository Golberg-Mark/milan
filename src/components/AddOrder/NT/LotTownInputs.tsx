import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import useInput from '@/hooks/useInput';
import Input from '@/components/AddOrder/Input';
import {
  getOrderItemsAction,
  initializeOrderAction,
  orderActions
} from '@/store/actions/orderActions';

const LotTownInputs: React.FC = () => {
  const [lot, setLot] = useInput();
  const [town, setTown] = useInput();

  const dispatch = useDispatch<any>();

  const search = async () => {
    dispatch(orderActions.setProducts(null));
    dispatch(orderActions.setIsProductsLoading(true));

    dispatch(initializeOrderAction(
      'NT',
      'Volume/Folio',
      '1.00'
    ));

    try {
      await dispatch(getOrderItemsAction(
        'NT',
        'Volume/Folio',
        '1.00'
      ));
      dispatch(orderActions.setIsProductsLoading(false));
    } catch (e) { console.error(e) }
  };

  return (
    <LotTown>
      <Input
        name="Lot"
        value={lot}
        onChange={setLot}
        placeholder={`E.g 200`}
        required
      />
      <Input
        name="Town"
        value={town}
        onChange={setTown}
        placeholder={`E.g Town of Darwin`}
        required
      />
      <ButtonWrapper align="flex-start">
        <Button
          onClick={search}
        >
          Browse
        </Button>
        <Price>
          $1.00
        </Price>
      </ButtonWrapper>
    </LotTown>
  );
};

const LotTown = styled.div`
  display: flex;
  grid-gap: .75rem;
  margin-bottom: 1.25rem;
`;

const ButtonWrapper = styled.div<{ align?: string }>`
  display: flex;
  grid-gap: .75rem;
  justify-content: ${({ align }) => align ? align : 'flex-end'};
  align-items: center;
  align-self: flex-end;
`;

const Button = styled.button`
  padding: .625rem 2.25rem;
  height: 42px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  color: #fff;
  background-color: var(--primary-blue-color);
  
  :hover {
    background-color: rgba(36, 99, 235, .9);
  }
`;

const Price = styled.span`
  padding: .4rem .65rem;
  border: 1px solid rgba(30, 58, 138, .1);
  border-radius: 4px;
  font-size: 14px;
  color: #1E3E8A;
  background-color: #DBEAFE;
`;

export default LotTownInputs;
