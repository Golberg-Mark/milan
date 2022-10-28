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

const LotPlanInputs: React.FC = () => {
  const [referenceNumber, setReferenceNumber] = useInput();

  const dispatch = useDispatch<any>();

  const search = async () => {
    dispatch(orderActions.setProducts(null));
    dispatch(orderActions.setIsProductsLoading(true));

    dispatch(initializeOrderAction(
      'QLD',
      'Lot/Plan',
      '5.00'
    ));

    try {
      await dispatch(getOrderItemsAction(
        'QLD',
        'Lot/Plan',
        '5.00'
      ));
      dispatch(orderActions.setIsProductsLoading(false));
    } catch (e) { console.error(e) }
  };

  return (
    <LotPlan>
      <Input
        name="Lot/Plan Number"
        value={referenceNumber}
        onChange={setReferenceNumber}
        placeholder="E.g 8/RP601844"
        required
      />
      <ButtonWrapper style={{ marginLeft: '-4px' }}>
        <Button
          onClick={search}
        >
          Browse
        </Button>
        <Price>
          $5.00
        </Price>
      </ButtonWrapper>
    </LotPlan>
  );
};

const LotPlan = styled.div`
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

export default LotPlanInputs;
