import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '@/hooks/useInput';
import {
  getOrderItemsAction,
  initializeOrderAction,
  orderActions
} from '@/store/actions/orderActions';
import Input from '@/components/Input';
import { selectPriceList } from '@/store/selectors/userSelectors';
import ServiceButton from '@/components/AddOrder/ServiceButton';

const TitleInputs: React.FC = () => {
  const [referenceNumber, setReferenceNumber] = useInput();

  const priceList = useSelector(selectPriceList);

  const dispatch = useDispatch<any>();

  const search = async () => {
    /*dispatch(initializeOrderAction(
      'WA',
      'Title Reference',
      '0.00'
    ));*/

    if (priceList) {
      try {
        await dispatch(getOrderItemsAction(
          'WA',
          'Title Reference',
          priceList.find((el) => el.searchType === 'WA Check Search')!.priceInclGST
      ));
        dispatch(orderActions.setIsProductsLoading(false));
      } catch (e) { console.error(e) }
    }
  };

  return (
    <TitleReference>
      <Input
        value={referenceNumber}
        onChange={setReferenceNumber}
        placeholder="Title Reference, e.g 1/SP1"
        style={{ marginBottom: 0 }}
        required
      />
      <ServiceButton
        text="Verify"
        price="Free"
        isMovedToTheLeft
        onClick={search}
      />
    </TitleReference>
  );
};

const TitleReference = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  margin-bottom: 1.25rem;
`;

export default TitleInputs;
