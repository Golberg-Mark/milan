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

const SpiInputs: React.FC = () => {
  const [spi, setSpi] = useInput();

  const dispatch = useDispatch<any>();

  const search = async () => {
    dispatch(orderActions.setProducts(null));
    dispatch(orderActions.setIsProductsLoading(true));

    dispatch(initializeOrderAction(
      'VIC',
      'SPI',
      '3.55'
    ));

    try {
      await dispatch(getOrderItemsAction(
        'VIC',
        'SPI',
        '3.55'
      ));
      dispatch(orderActions.setIsProductsLoading(false));
    } catch (e) { console.error(e) }
  };

  return (
    <Spi>
      <Input
        value={spi}
        onChange={setSpi}
        placeholder="SPI, e.g 12\LP123456"
        style={{ marginBottom: 0 }}
        required
      />
      <ServiceButton text="Browse" price="3.55" align="flex-start" onClick={search} />
    </Spi>
  );
};

const Spi = styled.div`
  display: flex;
  grid-gap: .75rem;
  margin-bottom: 1.25rem;
`;

export default SpiInputs;
