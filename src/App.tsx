import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import { Routes, Route, useNavigate } from 'react-router-dom';

import GlobalStyle from '@/utils/getNormalizedCSS';
import Orders from '@/pages/Orders';
import Menu from '@/components/Menu';
import PageHeader from '@/components/PageHeader';
import Auth from '@/pages/Auth';
import AddOrder from '@/pages/AddOrder';
import OrderDetails from '@/pages/OrderDetails';
import PriceList from '@/pages/PriceList';

const App = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === '/') navigate('/dashboard', { replace: true });
  }, [pathname]);

  return (
    <GlobalContainer>
      <GlobalStyle />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/*" element={(
          <>
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
          </>
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
  padding-top: 64px;
  padding-left: 256px;
`;

export default App;
