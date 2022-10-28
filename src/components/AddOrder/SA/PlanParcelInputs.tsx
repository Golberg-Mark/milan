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
        name="Parcel"
        value={parcel}
        onChange={setParcel}
        placeholder="E.g 2"
      />
      <Label>
        <span>Plan Type</span>
        <Select
          selectedItem={planType}
          setSelectedItem={setPlanType}
          items={planTypes}
        />
      </Label>
      <Input
        name="Plan Number"
        value={planNumber}
        onChange={setPlanNumber}
        placeholder="E.g 45754"
        required
      />
      <ButtonWrapper align="flex-start">
        <Button
          onClick={search}
        >
          Browse
        </Button>
        <Price>
          $2.77
        </Price>
      </ButtonWrapper>
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

export default TitleInputs;
