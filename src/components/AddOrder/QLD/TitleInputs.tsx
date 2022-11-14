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

const TitleInputs: React.FC = () => {
  const [referenceNumber, setReferenceNumber] = useInput();

  const dispatch = useDispatch<any>();

  const search = async () => {
    dispatch(orderActions.setProducts(null));
    dispatch(orderActions.setIsProductsLoading(true));

    dispatch(initializeOrderAction(
      'QLD',
      'Title Reference',
      '0.00'
    ));

    try {
      await dispatch(getOrderItemsAction(
        'QLD',
        'Title Reference',
        '0.00'
      ));
      dispatch(orderActions.setIsProductsLoading(false));
    } catch (e) { console.error(e) }
  };

  return (
    <TitleReference>
      <Input
        value={referenceNumber}
        onChange={setReferenceNumber}
        placeholder="Title Reference, e.g 12067050"
        style={{ marginBottom: 0 }}
        required
      />
      <ServiceButton
        text="Verify"
        price="Free"
        isMovedToTheLeft
        onClick={search}
      />
    </TitleReference>
  );
};

const TitleReference = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  margin-bottom: 1.25rem;
`;

export default TitleInputs;
