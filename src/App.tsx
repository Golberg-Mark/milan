import React from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';

import GlobalStyle from '@/utils/getNormalizedCSS';
import Orders from '@/pages/Orders';
import Menu from '@/components/Menu';
import PageHeader from '@/components/PageHeader';
import Auth from '@/pages/Auth';
import AddOrder from '@/pages/AddOrder';
import OrderDetails from '@/pages/OrderDetails';
import PriceList from '@/pages/PriceList';
import ProtectedRouter from '@/components/ProtectedRouter';
import Settings from '@/pages/Settings';
import { selectUser } from '@/store/selectors/userSelectors';
import Organisations from '@/pages/Organisations';
import { Roles } from '@/store/reducers/user';

const App = () => {
  const user = useSelector(selectUser);

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
                <Route path="/settings/*" element={<Settings />} />
                {user?.role === Roles.SYSTEM_ADMIN ? (
                  <Route path="/organisations/*" element={<Organisations />} />
                ) : ''}
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
