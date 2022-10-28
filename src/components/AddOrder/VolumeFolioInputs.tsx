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
        name="Volume/Folio"
        value={volumeFolio}
        onChange={setSetVolumeFolio}
        placeholder={`E.g ${placeholder}`}
        required
      />
      <ButtonWrapper align="flex-start">
        <Button
          onClick={search}
        >
          Browse
        </Button>
        <Price>
          $1.00
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

export default VolumeFolioInputs;
