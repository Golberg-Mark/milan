import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Routes, Route, NavLink, useNavigate } from 'react-router-dom';

import { getOrdersAction, getUsersByOrganizationAction, userActions } from '@/store/actions/userActions';
import { selectOrders, selectOrganizationUsers, selectSelectedMatter } from '@/store/selectors/userSelectors';

import PageTitle from '@/components/PageTitle';
import Loader from '@/components/Loader';
import OrdersTable from '@/components/Dashboard/OrdersTable';
import Matters from '@/components/Dashboard/Matters';
import Button from '@/components/Button';
import ArrowBackIcon from '@/assets/icons/ArrowBackIcon';
import RightArrowIcon from '@/assets/icons/RightArrowIcon';
import PageContainer from '@/components/PageContainer';

const Orders = () => {
  const orders = useSelector(selectOrders);
  const orgUsers = useSelector(selectOrganizationUsers);
  const selectedMatter = useSelector(selectSelectedMatter);

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!orders) dispatch(getOrdersAction());
    if (!orgUsers) dispatch(getUsersByOrganizationAction());

    return () => {
      dispatch(userActions.setOrders(null));
      dispatch(userActions.setOrgUsers(null));
    }
  }, []);

  return orders && orgUsers ? (
    <PageContainer>
      <PageHeader>
        <LineNavigationWrapper>
          {selectedMatter ? (
            <>
              <StyledBackIcon onClick={() => navigate(-1)} />
              <LineNavigation>
                <span>Matters</span>
                <RightArrowIcon />
                <span>{selectedMatter}</span>
              </LineNavigation>
            </>
          ) : (
            <PageTitle fontSize={20} marginBottom="0">
              Matters & Orders
            </PageTitle>
          )}
        </LineNavigationWrapper>
        <Link to="/new-order">
          <StyledButton>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="#fff"
              strokeWidth="3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Order
          </StyledButton>
        </Link>
      </PageHeader>
      <NavWrapper>
        <Nav>
          <StyledNavLink to="/dashboard/" end>All orders</StyledNavLink>
          <StyledNavLink to="/dashboard/matters">All matters</StyledNavLink>
        </Nav>
      </NavWrapper>
      <Routes>
        <Route path="/" element={<OrdersTable orders={orders} />} />
        <Route path="/matters/*" element={<Matters />} />
      </Routes>
    </PageContainer>
  ) : <Loader />;
};

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-gap: 1rem;
  margin-bottom: 32px;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const LineNavigationWrapper = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 12px;
  
  span:first-child {
    color: #ACB5BB;
    font-weight: 500;
  }
  
  span:last-child {
    font-weight: 600;
  }
`;

const StyledBackIcon = styled(ArrowBackIcon)`
  cursor: pointer;
`;

const LineNavigation = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 8px;
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 8px;
    width: 1rem;
    height: 1rem;
  }
`;

const NavWrapper = styled.div`
  margin-bottom: 24px;
`;

const Nav = styled.div`
  position: relative;
  display: flex;
  grid-gap: 1rem;
  border-bottom: 1px solid rgba(26, 28, 30, 0.2);
`;

const StyledNavLink = styled(NavLink)`
  margin-bottom: -1px;
  padding-bottom: 24px;
  color: rgba(26, 28, 30, 0.4);
  font-weight: 500;
  transition: color .1s ease-in-out;

  :not(&.active):hover {
    color: var(--primary-dark-hover-color);
  }

  &.active {
    color: var(--primary-dark-color);
    border-bottom: 2px solid var(--primary-dark-color);
  }
`;

export default Orders;
