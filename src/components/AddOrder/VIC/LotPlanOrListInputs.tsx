import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import useInput from '@/hooks/useInput';
import Input from '@/components/AddOrder/Input';
import {
  getOrderItemsAction,
  initializeOrderAction,
  orderActions
} from '@/store/actions/orderActions';
import Select from '@/components/AddOrder/Select';

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
        <span>Lot</span>
        <Select
          selectedItem={selectedLot}
          setSelectedItem={setSelectedLot}
          items={options}
        />
      </Label>
      <Input
        name="Lot/Plan Number"
        type="text"
        value={lotPlanNumber}
        onChange={setLotPlanNumber}
        placeholder="E.g 8RP601844"
      />
      <ButtonWrapper>
        <Button onClick={search}>
          Browse
        </Button>
        <Price>$4.83</Price>
      </ButtonWrapper>
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

export default AddressInputs;
