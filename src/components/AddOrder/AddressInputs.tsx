import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import useInput from '@/hooks/useInput';
import Input from '@/components/AddOrder/Input';
import {
  getOrderItemsAction,
  initializeOrderAction,
  orderActions
} from '@/store/actions/orderActions';
import { existingRegions } from '@/utils/getRegionsData';

interface Props {
  region?: existingRegions,
  price?: string
}

const AddressInputs: React.FC<Props> = ({ region = 'WA', price = '1.28' }) => {
  const [streetNumber, setStreetNumber] = useInput();
  const [streetName, setStreetName] = useInput();
  const [suburb, setSuburb] = useInput();

  const dispatch = useDispatch<any>();

  const search = async () => {
    dispatch(orderActions.setProducts(null));
    dispatch(orderActions.setIsProductsLoading(true));

    dispatch(initializeOrderAction(
      region,
      'Address',
      price
    ));

    try {
      await dispatch(getOrderItemsAction(
        region,
        'Address',
        price
      ));
      dispatch(orderActions.setIsProductsLoading(false));
    } catch (e) { console.error(e) }
  };

  return (
    <Address>
      <StyledAddressInputs>
        <Input
          name="Street number"
          type="text"
          value={streetNumber}
          onChange={setStreetNumber}
          placeholder="E.g 16"
        />
        <Input
          name="Street name"
          type="text"
          value={streetName}
          onChange={setStreetName}
          placeholder="E.g Boredeaux street"
          required
        />
        <Input
          name="Suburb"
          type="text"
          value={suburb}
          onChange={setSuburb}
          placeholder="E.g AVONDALE HEIGHTS"
          required
        />
      </StyledAddressInputs>
      <ButtonWrapper>
        <Price>${price}</Price>
        <Button onClick={search}>
          Browse
        </Button>
      </ButtonWrapper>
    </Address>
  );
};

const Address = styled.div`
  margin-bottom: 1.25rem;
`;

const StyledAddressInputs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: .75rem;
  margin-bottom: .75rem;
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
