import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import useInput from '@/hooks/useInput';
import {
  getOrderItemsAction,
  initializeOrderAction,
  orderActions
} from '@/store/actions/orderActions';
import Select from '@/components/AddOrder/Select';
import Input from '@/components/Input';
import ServiceButton from '@/components/AddOrder/ServiceButton';

const planTypes = ['Community Plan', 'Deposited Plan', 'Filed Plan', 'Hundred Plan', 'Road Plan', 'Strata Plan', 'Township Plan'];

const TitleInputs: React.FC = () => {
  const [planType, setPlanType] = useState(0);
  const [parcel, setParcel] = useInput();
  const [planNumber, setPlanNumber] = useInput();

  const dispatch = useDispatch<any>();

  const search = async () => {
    dispatch(orderActions.setProducts(null));
    dispatch(orderActions.setIsProductsLoading(true));

    dispatch(initializeOrderAction(
      'SA',
      'Plan/Parcel',
      '2.77'
    ));

    try {
      await dispatch(getOrderItemsAction(
        'SA',
        'Plan/Parcel',
        '2.77'
      ));
      dispatch(orderActions.setIsProductsLoading(false));
    } catch (e) { console.error(e) }
  };

  return (
    <VolumeFolio>
      <Input
        value={parcel}
        onChange={setParcel}
        placeholder="Parcel, e.g 2"
        style={{ marginBottom: 0 }}
      />
      <Label>
        <Select
          selectedItem={planType}
          setSelectedItem={setPlanType}
          items={planTypes}
        />
      </Label>
      <Input
        value={planNumber}
        onChange={setPlanNumber}
        placeholder="Plan Number, e.g 45754"
        style={{ marginBottom: 0 }}
        required
      />
      <ServiceButton text="Browse" price="2.77" align="flex-start" onClick={search} />
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
