import React from 'react';
import styled from 'styled-components';

import useInput from '@/hooks/useInput';
import Input from '@/components/AddOrder/Input';
import {
  getOrderItemsAction,
  initializeOrderAction,
  orderActions
} from '@/store/actions/orderActions';
import { useDispatch } from 'react-redux';
import { existingRegions } from '@/utils/getRegionsData';

interface Props {
  region?: existingRegions,
  price?: string
}

const OwnerIndividualInputs: React.FC<Props> = ({ region = 'WA', price = '2.41' }) => {
  const [firstName, setFirstName] = useInput();
  const [lastName, setLastName] = useInput();

  const dispatch = useDispatch<any>();

  const search = async () => {
    dispatch(orderActions.setProducts(null));
    dispatch(orderActions.setIsProductsLoading(true));

    dispatch(initializeOrderAction(
      region,
      'Owner(Individual)',
      price
    ));

    try {
      await dispatch(getOrderItemsAction(
        region,
        'Owner(Individual)',
        price
      ));
      dispatch(orderActions.setIsProductsLoading(false));
    } catch (e) { console.error(e) }
  };

  return (
    <Owner>
      <Input
        name="First name"
        type="text"
        value={firstName}
        onChange={setFirstName}
        placeholder="E.g Jon"
      />
      <Input
        name="Last name"
        type="text"
        value={lastName}
        onChange={setLastName}
        placeholder="E.g Smith"
        required
      />
      <ButtonWrapper align="flex-start">
        <Button onClick={search}>
          Browse
        </Button>
        <Price>${price}</Price>
      </ButtonWrapper>
    </Owner>
  );
};

const Owner = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: .75rem;
  margin-bottom: 1.25rem;
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

export default OwnerIndividualInputs;
