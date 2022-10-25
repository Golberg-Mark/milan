import React from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';

import GlobalStyle from '@/utils/getNormalizedCSS';
import MyHQ from '@/pages/MyHQ';
import Orders from '@/pages/Orders';
import Menu from '@/components/Menu';
import PageHeader from '@/components/PageHeader';
import Auth from '@/pages/Auth';
import AddOrder from '@/pages/AddOrder';
import OrderDetails from '@/pages/OrderDetails';

const App = () => {
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
                <Route path="/*" element={<Orders />} />
                <Route path="/orders/*" element={
                  <Routes>
                    <Route path="/add" element={<AddOrder />} />
                    <Route path="/:id" element={<OrderDetails />} />
                  </Routes>
                }/>
                <Route path="/my-hq" element={<MyHQ />} />
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
  padding-left: 255px;
`;

export default App;
