import React from 'react';
import styled from 'styled-components';

import PricesTable from '@/components/PriceList/PricesTable';
import PageTitle from '@/components/PageTitle';

const PriceList = () => {
  return (
    <Page>
      <PageTitle marginBottom="2rem">
        Price List
      </PageTitle>
      <PricesTable />
    </Page>
  );
};

const Page = styled.section`
  padding: 1.5rem 2rem;
`;

export default PriceList;
