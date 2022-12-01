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

const options = ['Lot/Plan', 'Lot List'];

const AddressInputs = () => {
  const [selectedLot, setSelectedLot] = useState(0);
  const [lotPlanNumber, setLotPlanNumber] = useInput();

  const dispatch = useDispatch<any>();

  const search = async () => {
    dispatch(orderActions.setProducts(null));
    dispatch(orderActions.setIsProductsLoading(true));

    dispatch(initializeOrderAction(
      'VIC',
      'Lot/Plan or List',
      '4.83'
    ));

    try {
      await dispatch(getOrderItemsAction(
        'VIC',
        'Lot/Plan or List',
        '4.83'
      ));
      dispatch(orderActions.setIsProductsLoading(false));
    } catch (e) { console.error(e) }
  };

  return (
    <LotPlanOrList>
      <Label>
        <Select
          selectedItem={selectedLot}
          setSelectedItem={setSelectedLot}
          items={options}
        />
      </Label>
      <Input
        value={lotPlanNumber}
        onChange={setLotPlanNumber}
        placeholder="Lot/Plan Number, e.g 8RP601844"
        style={{ marginBottom: 0 }}
      />
      <ServiceButton text="Browse" price="4.83" onClick={search} />
    </LotPlanOrList>
  );
};

const LotPlanOrList = styled.div`
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

export default AddressInputs;
