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
import { municipality } from '@/utils/getRegionsData';
import Input from '@/components/Input';
import ServiceButton from '@/components/AddOrder/ServiceButton';

const CouncilNumberInputs: React.FC = () => {
  const [selectedMunicipality, setSelectedMunicipality] = useState(0);
  const [councilNumber, setCouncilNumber] = useInput();

  const dispatch = useDispatch<any>();

  const search = async () => {
    dispatch(orderActions.setProducts(null));
    dispatch(orderActions.setIsProductsLoading(true));

    dispatch(initializeOrderAction(
      'VIC',
      'Council Number',
      '4.05'
    ));

    try {
      await dispatch(getOrderItemsAction(
        'VIC',
        'Council Number',
        '4.05'
      ));
      dispatch(orderActions.setIsProductsLoading(false));
    } catch (e) { console.error(e) }
  };

  return (
    <CouncilNumber>
      <Label>
        <Select
          selectedItem={selectedMunicipality}
          setSelectedItem={setSelectedMunicipality}
          items={municipality}
        />
      </Label>
      <Input
        value={councilNumber}
        onChange={setCouncilNumber}
        placeholder="Council Number, e.g 12345"
        style={{ marginBottom: 0 }}
        required
      />
      <ServiceButton text="Browse" price="4.05" align="flex-start" onClick={search} />
    </CouncilNumber>
  );
};

const CouncilNumber = styled.div`
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

export default CouncilNumberInputs;
