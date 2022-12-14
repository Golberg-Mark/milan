import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

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
import { selectPopup, selectUser } from '@/store/selectors/userSelectors';
import Organisations from '@/pages/Organisations';
import { Roles } from '@/store/reducers/user';
import Registration from '@/pages/Registration';
import LoginNow from '@/components/Auth/LoginNow';
import Notices from '@/pages/Notices';
import ResetPassword from '@/components/Auth/GetResetLink';
import UpdatePassword from '@/components/Auth/UpdatePassword';
import Popup from '@/components/Popup';
import { getActiveNoticesAction } from '@/store/actions/noticesActions';
import Notice from '@/components/Notices/Notice';
import UserNotices from '@/pages/UserNotices';
import Users from '@/pages/Users';
import AllServices from './pages/AllServices';
import { selectServicesModal } from './store/selectors/servicesSelector';

const App = () => {
  const user = useSelector(selectUser);
  const popup = useSelector(selectPopup);
  const servicesModal = useSelector(selectServicesModal);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getActiveNoticesAction());
  }, []);

  return (
    <GlobalContainer>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<ProtectedRouter><Navigate to="/dashboard" /></ProtectedRouter>} />
        <Route path="/sign-in" element={<Auth />} />
        <Route path="/sign-up" element={<Registration />} />
        <Route path="/login-now/*" element={<LoginNow />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
        <Route path="/update-password/*" element={<UpdatePassword />} />
        <Route path="/*" element={(
          <ProtectedRouter>
            <Menu />
            <ContentContainer>
              { servicesModal && <AllServices />}
              <PageHeader />
              <Notice />
              <Routes>
                <Route path="/dashboard/*" element={<Orders />}/>
                <Route path="orders/:id" element={<OrderDetails />} />
                <Route path="/new-order" element={<AddOrder />} />
                <Route path="/price-list" element={<PriceList />} />
                <Route path="/settings/*" element={<Settings />} />
                {user?.role === Roles.SYSTEM_ADMIN ? (
                  <Route path="/organisations/*" element={<Organisations />} />
                ) : ''}
                {user?.role === Roles.SYSTEM_ADMIN ? (
                  <Route path="/users" element={<Users />} />
                ) : ''}
                <Route path="/notices" element={
                  user?.role === Roles.SYSTEM_ADMIN ? <Notices /> : <UserNotices />
                }/>
              </Routes>
            </ContentContainer>
          </ProtectedRouter>
        )} />
      </Routes>
      {popup ? (
        <Popup
          type={popup.type}
          mainText={popup.mainText}
          additionalText={popup.additionalText}
        />
      ) : ''}
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
