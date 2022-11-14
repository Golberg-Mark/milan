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

const AddressInputs: React.FC = () => {
  const [level, setLevel] = useInput();
  const [lot, setLot] = useInput();
  const [unitNumber, setUnitNumber] = useInput();
  const [streetNumber, setStreetNumber] = useInput();
  const [streetName, setStreetName] = useInput();
  const [suburb, setSuburb] = useInput();

  const dispatch = useDispatch<any>();

  const search = async () => {
    dispatch(orderActions.setProducts(null));
    dispatch(orderActions.setIsProductsLoading(true));

    dispatch(initializeOrderAction(
      'SA',
      'Address',
      '1.28'
    ));

    try {
      await dispatch(getOrderItemsAction(
        'SA',
        'Address',
        '1.28'
      ));
      dispatch(orderActions.setIsProductsLoading(false));
    } catch (e) { console.error(e) }
  };

  return (
    <Address>
      <StyledAddressInputs>
        <Input
          value={level}
          onChange={setLevel}
          placeholder="Level"
          style={{ marginBottom: 0 }}
        />
        <Input
          value={lot}
          onChange={setLot}
          placeholder="Lot"
          style={{ marginBottom: 0 }}
        />
        <Input
          value={unitNumber}
          onChange={setUnitNumber}
          placeholder="Unit number, e.g 1"
          style={{ marginBottom: 0 }}
        />
        <Input
          value={streetNumber}
          onChange={setStreetNumber}
          placeholder="Street number, e.g 12"
          style={{ marginBottom: 0 }}
        />
        <Input
          value={streetName}
          onChange={setStreetName}
          placeholder="Street name, e.g Logan"
          style={{ marginBottom: 0 }}
          required
        />
        <Input
          value={suburb}
          onChange={setSuburb}
          placeholder="Suburb/Locality"
          style={{ marginBottom: 0 }}
        />
      </StyledAddressInputs>
      <ServiceButton text="Browse" price="1.28" onClick={search} />
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
