import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import useInput from '@/hooks/useInput';
import {
  getOrderItemsAction,
  initializeOrderAction,
  orderActions
} from '@/store/actions/orderActions';
import Select from '@/components/Select';
import Input from '@/components/Input';
import ServiceButton from '@/components/AddOrder/ServiceButton';

const registers = ['CT', 'CL', 'CR'];

const TitleInputs: React.FC = () => {
  const [register, setRegister] = useState(0);
  const [volumeFolio, setSetVolumeFolio] = useInput();

  const dispatch = useDispatch<any>();

  const search = async () => {
    dispatch(orderActions.setProducts(null));
    dispatch(orderActions.setIsProductsLoading(true));

    dispatch(initializeOrderAction(
      'SA',
      'Volume/Folio',
      '1.00'
    ));

    try {
      await dispatch(getOrderItemsAction(
        'SA',
        'Volume/Folio',
        '1.00'
      ));
      dispatch(orderActions.setIsProductsLoading(false));
    } catch (e) { console.error(e) }
  };

  return (
    <VolumeFolio>
      <Label>
        <Select
          selectedItem={register}
          setSelectedItem={setRegister}
          items={registers}
        />
      </Label>
      <Input
        value={volumeFolio}
        onChange={setSetVolumeFolio}
        placeholder="Volume/Folio, e.g 5359/705"
        style={{ marginBottom: 0 }}
        required
      />
      <ServiceButton text="Browse" price="1.00" align="flex-start" onClick={search} />
    </VolumeFolio>
  );
};

const VolumeFolio = styled.div`
  display: flex;
  grid-gap: .75rem;
  margin-bottom: 1.25rem;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  grid-gap: 2px;
  
  span {
    color: #6B7280;
    white-space: nowrap;
  }
`;

export default TitleInputs;
