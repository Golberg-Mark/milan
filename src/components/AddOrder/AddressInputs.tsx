import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import useInput from '@/hooks/useInput';
import {
  getOrderItemsAction,
  initializeOrderAction,
  orderActions
} from '@/store/actions/orderActions';
import { existingRegions } from '@/utils/getRegionsData';
import Input from '@/components/Input';
import ServiceButton from '@/components/AddOrder/ServiceButton';

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
          value={streetNumber}
          onChange={setStreetNumber}
          placeholder="Street number, e.g 16"
          style={{ marginBottom: 0 }}
        />
        <Input
          value={streetName}
          onChange={setStreetName}
          placeholder="Street name, e.g Boredeaux street"
          style={{ marginBottom: 0 }}
          required
        />
        <Input
          value={suburb}
          onChange={setSuburb}
          placeholder="Suburb, e.g AVONDALE HEIGHTS"
          style={{ marginBottom: 0 }}
          required
        />
      </StyledAddressInputs>
      <ServiceButton text="Browse" price={price} onClick={search} />
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

export default AddressInputs;
