import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Routes, Route, NavLink } from 'react-router-dom';

import { getOrdersAction, getUsersByOrganizationAction, userActions } from '@/store/actions/userActions';
import { selectOrders, selectOrganizationUsers } from '@/store/selectors/userSelectors';

import PageTitle from '@/components/PageTitle';
import Loader from '@/components/Loader';
import OrdersTable from '@/components/Dashboard/OrdersTable';
import Matters from '@/components/Dashboard/Matters';

const Orders = () => {
  const orders = useSelector(selectOrders);
  const orgUsers = useSelector(selectOrganizationUsers);

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
    <OrdersPage>
      <PageHeader>
        <div>
          <PageTitle fontSize={20}>
            All Matters & Orders
          </PageTitle>
          <Description>
            A list of all the orders you've requested for in the past.
          </Description>
        </div>
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
    </OrdersPage>
  ) : <Loader />;
};

const OrdersPage = styled.div`
  padding-bottom: 2.5rem;
`;

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem 1rem 0;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    padding: 1.5rem 2rem 0;
  }
`;

const Description = styled.p`
  font-size: 14px;
  color: var(--primary-gray-color);
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  font-size: 14px;
  color: #fff;
  white-space: nowrap;
  border: none;
  border-radius: 6px;
  background-color: rgb(36, 99, 235);
  
  :hover {
    background-color: rgba(36, 99, 235, .9);
  }
  
  svg {
    margin-right: 8px;
    width: 1rem;
    height: 1rem;
  }
`;

const NavWrapper = styled.div`
  margin-bottom: 1.5rem;
  padding: 1.5rem 1rem 0;

  @media (min-width: 768px) {
    padding: 1.5rem 2rem 0;
  }
`;

const Nav = styled.div`
  display: flex;
  grid-gap: 1rem;
  padding-bottom: .5rem;
  border-bottom: 1px solid rgb(210, 210, 210);
`;

const StyledNavLink = styled(NavLink)`
  transition: .1s ease-in-out;
  
  :not(&.active):hover {
    color: rgba(36, 99, 235, .8);
  }
  
  &.active {
    color: var(--primary-blue-color);
  }
`;

export default Orders;
