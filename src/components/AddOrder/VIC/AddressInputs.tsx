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
import { municipality } from '@/utils/getRegionsData';
import Input from '@/components/Input';
import ServiceButton from '@/components/AddOrder/ServiceButton';

const locality = ['Suburb', 'Postcode', 'Municipality'];

const AddressInputs: React.FC = () => {
  const [unitNumber, setUnitNumber] = useInput();
  const [streetNumber, setStreetNumber] = useInput();
  const [streetName, setStreetName] = useInput();
  const [selectedLocality, setSelectedLocality] = useState(0);
  const [suburb, setSuburb] = useInput();
  const [postcode, setPostcode] = useInput();
  const [selectedMunicipality, setSelectedMunicipality] = useState(0);

  const dispatch = useDispatch<any>();

  const search = async () => {
    dispatch(orderActions.setProducts(null));
    dispatch(orderActions.setIsProductsLoading(true));

    dispatch(initializeOrderAction(
      'VIC',
      'Address',
      '1.28'
    ));

    try {
      await dispatch(getOrderItemsAction(
        'VIC',
        'Address',
        '1.28'
      ));
      dispatch(orderActions.setIsProductsLoading(false));
    } catch (e) { console.error(e) }
  };

  const selectLocality = (i: number) => {
    setSelectedLocality(i);
    setSuburb('');
    setPostcode('');
    setSelectedMunicipality(0);
  };

  return (
    <Address>
      <StyledAddressInputs>
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
        <Label>
          <Select
            selectedItem={selectedLocality}
            setSelectedItem={selectLocality}
            items={locality}
          />
        </Label>
        {locality[selectedLocality] === 'Suburb' ? (
          <Input
            value={suburb}
            onChange={setSuburb}
            placeholder="Suburb, e.g Canterbury"
            style={{ marginBottom: 0 }}
            required
          />
        ) : ''}
        {locality[selectedLocality] === 'Postcode' ? (
          <Input
            type="text"
            value={postcode}
            onChange={setPostcode}
            placeholder="Postcode, e.g"
            style={{ marginBottom: 0 }}
            required
          />
        ) : ''}
        {locality[selectedLocality] === 'Municipality' ? (
          <Label>
            <Select
              selectedItem={selectedMunicipality}
              setSelectedItem={setSelectedMunicipality}
              items={municipality}
            />
          </Label>
        ) : ''}
      </StyledAddressInputs>
      <ServiceButton
        text="Browse"
        price="1.28"
        alignSelf="flex-end"
        onClick={search}
      />
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
