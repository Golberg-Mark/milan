import React, { useEffect } from 'react';

import PricesTable from '@/components/PriceList/PricesTable';
import PageTitle from '@/components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { selectPriceList } from '@/store/selectors/userSelectors';
import Loader from '@/components/Loader';
import { getPriceListAction, userActions } from '@/store/actions/userActions';
import PageContainer from '@/components/PageContainer';

const PriceList = () => {
  const priceList = useSelector(selectPriceList);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getPriceListAction());

    return () => dispatch(userActions.setPriceList(null));
  }, []);

  return (
    <PageContainer>
      {priceList ? (
        <>
          <PageTitle marginBottom="2rem">
            Price List
          </PageTitle>
          <PricesTable priceList={priceList} />
        </>
      ) : <Loader />}
    </PageContainer>
  );
};

export default PriceList;
