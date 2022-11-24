import React, { useEffect } from 'react';
import styled from 'styled-components';

import PricesTable from '@/components/PriceList/PricesTable';
import PageTitle from '@/components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { selectPriceList } from '@/store/selectors/userSelectors';
import Loader from '@/components/Loader';
import { getPriceListAction, userActions } from '@/store/actions/userActions';

const PriceList = () => {
  const priceList = useSelector(selectPriceList);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getPriceListAction());

    return () => dispatch(userActions.setPriceList(null));
  }, []);

  return (
    <Page>
      {priceList ? (
        <Content>
          <PageTitle marginBottom="2rem">
            Price List
          </PageTitle>
          <PricesTable priceList={priceList} />
        </Content>
      ) : <Loader />}
    </Page>
  );
};

const Page = styled.section`
  --vertical-padding: 1.5rem;
  padding: var(--vertical-padding) 2rem;
  min-height: calc(100vh - var(--search-height) - (var(--vertical-padding) * 2));
`;

const Content = styled.div`
  display: flex;
  flex-flow: column;
  flex-grow: 1;
  min-height: 719px;
  padding: 32px;
  border-radius: 12px;
  background-color: #fff;
  overflow-x: hidden;
`;

export default PriceList;
