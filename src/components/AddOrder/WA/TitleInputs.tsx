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

const TitleInputs: React.FC = () => {
  const [referenceNumber, setReferenceNumber] = useInput();

  const priceList = useSelector(selectPriceList);

  const dispatch = useDispatch<any>();

  const search = async () => {
    dispatch(orderActions.setProducts(null));
    dispatch(orderActions.setIsProductsLoading(true));

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
        placeholder="Title Reference, e.g LR121/33577A"
        style={{ marginBottom: 0 }}
        required
      />
      <ButtonWrapper style={{ marginLeft: '-4px' }}>
        <Button
          style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
          onClick={search}
        >
          Verify
        </Button>
        <Price>
          Free
        </Price>
      </ButtonWrapper>
    </TitleReference>
  );
};

const TitleReference = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
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
  padding: 8px 12px;
  min-width: 73px;
  height: 38px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: #fff;
  background-color: var(--primary-green-color);
  
  :hover {
    background-color: var(--primary-green-hover-color);
  }
`;

const Price = styled.span`
  padding: .4rem .65rem;
  border: 1px solid rgba(39, 163, 118, 0.2);
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  color: var(--primary-green-color);
  background-color: var(--primary-green-background-color);
`;

export default TitleInputs;
