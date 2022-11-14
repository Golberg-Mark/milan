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

const OwnerOrganisationInputs: React.FC<Props> = ({ region = 'WA', price = '3.36' }) => {
  const [companyName, setCompanyName] = useInput();

  const dispatch = useDispatch<any>();

  const search = async () => {
    dispatch(orderActions.setProducts(null));
    dispatch(orderActions.setIsProductsLoading(true));

    dispatch(initializeOrderAction(
      region,
      'Owner(Organisation)',
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
        value={companyName}
        onChange={setCompanyName}
        placeholder="Company name, e.g Acme Corporation"
        style={{ marginBottom: '0px' }}
        required
      />
      <ServiceButton
        text="Browse"
        price={price}
        align="flex-start"
        onClick={search}
      />
    </Owner>
  );
};

const Owner = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: .75rem;
  margin-bottom: 1.25rem;
`;

export default OwnerOrganisationInputs;
