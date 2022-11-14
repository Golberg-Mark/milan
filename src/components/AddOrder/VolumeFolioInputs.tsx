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
import ServiceButton from '@/components/AddOrder/ServiceButton';
import Input from '@/components/Input';

interface Props {
  region?: existingRegions,
  placeholder?: string
}

const VolumeFolioInputs: React.FC<Props> = ({ region = 'WA', placeholder = '2146/36' }) => {
  const [volumeFolio, setSetVolumeFolio] = useInput();

  const dispatch = useDispatch<any>();

  const search = async () => {
    dispatch(orderActions.setProducts(null));
    dispatch(orderActions.setIsProductsLoading(true));

    dispatch(initializeOrderAction(
      region,
      'Volume/Folio',
      '1.00'
    ));

    try {
      await dispatch(getOrderItemsAction(
        region,
        'Volume/Folio',
        '1.00'
      ));
      dispatch(orderActions.setIsProductsLoading(false));
    } catch (e) { console.error(e) }
  };

  return (
    <VolumeFolio>
      <Input
        value={volumeFolio}
        onChange={setSetVolumeFolio}
        placeholder={`Volume/folio, e.g ${placeholder}`}
        style={{ marginBottom: '0px' }}
        required
      />
      <ServiceButton
        text="Browse"
        price="1.00"
        align="flex-start"
        onClick={search}
      />
    </VolumeFolio>
  );
};

const VolumeFolio = styled.div`
  display: flex;
  grid-gap: .75rem;
  margin-bottom: 1.25rem;
`;

export default VolumeFolioInputs;
