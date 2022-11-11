import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';

import GlobalStyle from '@/utils/getNormalizedCSS';
import Orders from '@/pages/Orders';
import Menu from '@/components/Menu';
import PageHeader from '@/components/PageHeader';
import Auth from '@/pages/Auth';
import AddOrder from '@/pages/AddOrder';
import OrderDetails from '@/pages/OrderDetails';
import PriceList from '@/pages/PriceList';
import ProtectedRouter from '@/components/ProtectedRouter';
import { Navigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { getOrderItemsAction } from '@/store/actions/orderActions';

const App = () => {
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(getOrderItemsAction('wa', 'title-reference'));
  }, []);
  return (
    <GlobalContainer>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<ProtectedRouter><Navigate to="/dashboard" /></ProtectedRouter>} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/*" element={(
          <ProtectedRouter>
            <Menu />
            <ContentContainer>
              <PageHeader />
              <Routes>
                <Route path="/dashboard/*" element={<Orders />}/>
                <Route path="orders/:id" element={<OrderDetails />} />
                <Route path="/new-order" element={<AddOrder />} />
                <Route path="/price-list" element={<PriceList />} />
              </Routes>
            </ContentContainer>
          </ProtectedRouter>
        )} />
      </Routes>
    </GlobalContainer>
  )
};

const GlobalContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  min-height: 100vh;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  position: relative;
  min-height: inherit;
  padding-top: var(--search-height);
  padding-left: var(--sidebar-width);
`;

export default App;
