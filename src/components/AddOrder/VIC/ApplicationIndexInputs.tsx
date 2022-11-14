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

const ApplicationIndexInputs: React.FC = () => {
  const [applicationIndex, setApplicationIndex] = useInput();

  const dispatch = useDispatch<any>();

  const search = async () => {
    dispatch(orderActions.setProducts(null));
    dispatch(orderActions.setIsProductsLoading(true));

    dispatch(initializeOrderAction(
      'VIC',
      'Application Index',
      '5.90'
    ));

    try {
      await dispatch(getOrderItemsAction(
        'VIC',
        'Application Index',
        '5.90'
      ));
      dispatch(orderActions.setIsProductsLoading(false));
    } catch (e) { console.error(e) }
  };

  return (
    <Spi>
      <Input
        value={applicationIndex}
        onChange={setApplicationIndex}
        placeholder="Application Index, e.g AP123456E"
        style={{ marginBottom: 0 }}
        required
      />
      <ServiceButton text="Browse" price="5.90" align="flex-start" onClick={search} />
    </Spi>
  );
};

const Spi = styled.div`
  display: flex;
  grid-gap: .75rem;
  margin-bottom: 1.25rem;
`;

export default ApplicationIndexInputs;
