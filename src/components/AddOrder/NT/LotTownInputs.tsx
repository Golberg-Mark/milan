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
        value={lot}
        onChange={setLot}
        placeholder="Lot, e.g 200"
        required
      />
      <Input
        value={town}
        onChange={setTown}
        placeholder="Town, e.g Town of Darwin"
        required
      />
      <ServiceButton text="Browse" price="1.00" align="flex-start" onClick={search} />
    </LotTown>
  );
};

const LotTown = styled.div`
  display: flex;
  grid-gap: .75rem;
  margin-bottom: 1.25rem;
`;

export default LotTownInputs;
