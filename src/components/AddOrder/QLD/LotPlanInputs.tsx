import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import useInput from '@/hooks/useInput';
import {
  getOrderItemsAction,
  initializeOrderAction,
  orderActions
} from '@/store/actions/orderActions';
import Input from '@/components/Input';
import ServiceButton from '@/components/AddOrder/ServiceButton';

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
        name=""
        value={referenceNumber}
        onChange={setReferenceNumber}
        placeholder="Lot/Plan Number, e.g 8/RP601844"
        style={{ marginBottom: 0 }}
        required
      />
      <ServiceButton
        text="Verify"
        price="5.00"
        isMovedToTheLeft
        onClick={search}
      />
    </LotPlan>
  );
};

const LotPlan = styled.div`
  display: flex;
  grid-gap: .75rem;
  margin-bottom: 1.25rem;
`;

export default LotPlanInputs;
