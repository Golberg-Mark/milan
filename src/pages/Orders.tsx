import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import PageTitle from '@/components/PageTitle';
import { getOrdersAction } from '@/store/actions/userActions';
import { selectOrders } from '@/store/selectors/userSelectors';
import Loader from '@/components/Loader';

const Orders = () => {
  const orders = useSelector(selectOrders);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (!orders) dispatch(getOrdersAction())
  }, []);

  return orders ? (
    <div>
      <PageHeader>
        <div>
          <PageTitle fontSize={20}>
            All Matters & Orders
          </PageTitle>
          <Description>
            A list of all the orders you've requested for in the past.
          </Description>
        </div>
        <Link to="/orders/add">
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
      <TableWrapper>
        <Table>
          <THead>
            <tr>
              <th style={{ padding: '16px 32px' }}>
                <Checkbox type="checkbox" />
              </th>
              <th style={{ padding: '14px 12px 14px 24px' }}>
                Matter
              </th>
              <th>
                Service
              </th>
              <th>
                Description
              </th>
              <th>
                Status
              </th>
              <th style={{ padding: '14px 12px', textAlign: 'center' }}>
                User
              </th>
              <th style={{ textAlign: 'center' }}>
                Date
              </th>
              <th style={{ padding: '14px 24px 14px 12px' }} />
            </tr>
          </THead>
          <TBody>
            {orders.map((order, i) => (
              <tr key={i}>
                <th style={{ padding: '16px 32px' }}>
                  <Checkbox type="checkbox" />
                </th>
                <th style={{ padding: '16px 12px 16px 24px' }}>
                  {order.matter}
                </th>
                <td>
                  {order.service}
                </td>
                <td>
                  {order.description}
                </td>
                <td>
                  <Status>
                    {order.status}
                  </Status>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <User>
                    {order.user}
                  </User>
                </td>
                <td style={{ textAlign: 'center' }}>
                  {order.date}
                </td>
                <th style={{ padding: '16px 24px 16px 1px' }}>
                  <EyeWrapper>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#000"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </EyeWrapper>
                </th>
              </tr>
            ))}
          </TBody>
        </Table>
      </TableWrapper>
    </div>
  ) : <Loader />;
};

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-gap: 16px;
  margin-bottom: 32px;
  padding: 24px 16px 0;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    padding: 24px 32px 0;
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

const TableWrapper = styled.div`
  padding: 0 16px;
  overflow-x: auto;
  
  @media (min-width: 768px) {
    padding: 0 32px;
  }
`;

const Table = styled.table`
  display: table;
  width: 100%;
  border-spacing: 0;
  -webkit-border-horizontal-spacing: 0;
  -webkit-border-vertical-spacing: 0;
  
  * {
    white-space: nowrap;
  }
`;

const THead = styled.thead`
  background-color: rgb(249, 250, 251);
  
  th {
    padding: 14px 32px;
    font-size: 14px;
    font-weight: 600;
    text-align: left;
    border-top: 1px solid rgb(229, 231, 235);
    
    :first-child {
      border-left: 1px solid rgb(229, 231, 235);
      border-top-left-radius: 8px;
    }
    
    :last-child {
      border-right: 1px solid rgb(229, 231, 235);
      border-top-right-radius: 8px;
    }
  }
`;

const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
  border: 1px solid #6b7280;
  
  &:checked {
    border: 1px solid rgb(36, 99, 235);
    background-color: rgb(36, 99, 235);
  }
`;

const TBody = styled.tbody`
  th, td {
    padding: 16px 32px;
    height: 69px;
    line-height: 1.25rem;
    background-color: #fff;
  }
  
  th {
    font-size: 14px;
    text-align: left;
    border-top: 1px solid rgb(229, 231, 235);

    :first-child {
      display: flex;
      align-items: center;
      border-left: 1px solid rgb(229, 231, 235);
    }

    :last-child {
      border-right: 1px solid rgb(229, 231, 235);
    }
    
    svg {
      width: .875rem;
      height: .875rem;
    }
  }

  td {
    font-size: 14px;
    text-align: left;
    color: #6B7280;
    border-top: 1px solid rgb(229, 231, 235);
  }
  
  tr:last-child {
    th, td {
      border-bottom: 1px solid rgb(229, 231, 235);
    }
    
    th:first-child {
      border-left: 1px solid rgb(229, 231, 235);
      border-bottom-left-radius: 8px;
    }
    
    th:last-child {
      border-right: 1px solid rgb(229, 231, 235);
      border-bottom-right-radius: 8px;
    }
  }
`;

const Status = styled.span`
  display: block;
  padding: 6px 12px;
  text-align: center;
  font-weight: 500;
  border-radius: 100px;
  background-color: rgb(229, 231, 235);
`;

const User = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background-color: rgb(229, 231, 235);
`;

const EyeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: rgba(229, 231, 235, .4);
  cursor: pointer;
  
  :hover {
    background-color: rgba(229, 231, 235, .8);
  }
`;

export default Orders;
