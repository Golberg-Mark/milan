import React, { ForwardedRef, forwardRef, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import styled, { css } from 'styled-components';
import DatePicker from 'react-datepicker';

import convertTimestamp from '@/utils/convertTimestamp';
import { Order, OrderStatusEnum, OrganizationUser } from '@/store/reducers/user';
import { selectMatters, selectOrganizationUsers } from '@/store/selectors/userSelectors';
import Loader from '@/components/Loader';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import useInput from '@/hooks/useInput';
import Search from '@/components/Dashboard/Search';

import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  orders: Order[],
  isFromMatter?: boolean
}

const statuses = (Object.keys(OrderStatusEnum) as Array<keyof typeof OrderStatusEnum>)
  .map((key) => key);

export const Wrapper: React.FC = () => {
  const { matterId } = useParams();
  const matters = useSelector(selectMatters);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return matterId && matters
    ? <OrdersTable isFromMatter orders={matters[matterId].orders}/>
    : <Loader />;
};

const OrdersTable: React.FC<Props> = ({ orders, isFromMatter = false }) => {
  const [search, setSearch] = useInput();
  const [startDay, setStartDay] = useState<Date | null>(null);
  const [endDay, setEndDay] = useState<Date | null>(null);
  const [status, setStatus] = useState< keyof typeof OrderStatusEnum | null>(null);
  const [statusRef, isStatusVisible, toggleIsStatusVisible] = useOnClickOutside<HTMLButtonElement>();
  const [selectedUser, setSelectedUser] = useState<OrganizationUser | null>(null);
  const [usersRef, isUsersVisible, toggleIsUsersVisible] = useOnClickOutside<HTMLButtonElement>();

  const orgUsers = useSelector(selectOrganizationUsers);

  const navigate = useNavigate();

  const onDateChange = (dates: any) => {
    const [start, end] = dates;

    setStartDay(start);
    if (end) setEndDay(new Date(end.setHours(23, 59, 59, 99)));
    else setEndDay(null);
  };

  const selectStatus = (s: keyof typeof OrderStatusEnum) => {
    setStatus(s);
    toggleIsStatusVisible(false);
  };

  const selectOrgUser = (userObj: OrganizationUser) => {
    setSelectedUser(userObj);
    toggleIsUsersVisible(false);
  };

  const clearFilters = () => {
    setStartDay(null);
    setEndDay(null);
    setStatus(null);
    setSelectedUser(null);
  };

  // @ts-ignore
  const CustomInput = forwardRef(({ value, onClick }, ref: ForwardedRef<HTMLButtonElement>) => (
    <FilterButton onClick={onClick} ref={ref} isApplied={!!startDay}>
      {value || 'Date'}
    </FilterButton>
  ));

  const filteredOrders = useMemo(() => orders.filter((order) => {
    if (!search) return true;

    const regexp = new RegExp(`.*${search.toLowerCase()}.*`);
    return regexp.test(order.matter.toLowerCase()) || regexp.test(order.service.toLowerCase());
  }).filter((order) => {
    if (!startDay || !endDay) return true;

    let orderDate = new Date(+order.date);
    return orderDate >= startDay && orderDate <= endDay;
  }).filter((order) => {
    if (!status) return true;
    return OrderStatusEnum[status] === order.status;
  }).filter((order) => {
    if (!selectedUser) return true;
    return order.user === selectedUser.id
  }), [search, startDay, endDay, status, selectedUser]);

  const isFiltered = (startDay && endDay) || status || selectedUser;

  return orgUsers ? (
    <div>
      <Filters>
        <Search
          value={search}
          onChange={setSearch}
          placeholder="Search matters & orders"
          clearField={() => setSearch('')}
        />
        <Buttons>
          {isFiltered ? (
            <FilterButton onClick={clearFilters}>
              Clear filters
            </FilterButton>
          ) : ''}
          <DatePicker
            startDate={startDay}
            endDate={endDay}
            onChange={onDateChange}
            customInput={<CustomInput />}
            tabIndex={0}
            selectsRange
          />
          <FilterButton
            ref={statusRef}
            isApplied={!!status}
            onClick={toggleIsStatusVisible}
          >
            {status?.toLowerCase() || 'Status'}
            {isStatusVisible ? (
              <List>
                {statuses.map((el) => (
                  <ListItem
                    key={el}
                    isSelected={el === status}
                    onClick={() => selectStatus(el)}
                  >
                    {el.toLowerCase().replaceAll('_', ' ')}
                  </ListItem>
                ))}
              </List>
            ) : ''}
          </FilterButton>
          <FilterButton
            ref={usersRef}
            isApplied={!!selectedUser}
            onClick={toggleIsUsersVisible}
          >
            {selectedUser?.name || 'User'}
            {isUsersVisible ? (
              <List>
                {orgUsers.map((el) => (
                  <ListItem
                    key={el.email}
                    isSelected={el.id === selectedUser?.id}
                    onClick={() => selectOrgUser(el)}
                  >
                    {el.name}
                  </ListItem>
                ))}
              </List>
            ) : ''}
          </FilterButton>
        </Buttons>
      </Filters>
      {filteredOrders.length ? (
        <TableWrapper>
          <Table>
            <THead>
              <tr>
                <th style={{ padding: '1rem 0 1rem 1.5rem' }}>
                  <Checkbox type="checkbox" />
                </th>
                {!isFromMatter ? (
                  <th style={{ padding: '14px 12px 14px 24px' }}>
                    Matter
                  </th>
                ) : ''}
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
              {filteredOrders.map((order, i) => (
                <TRow key={i} onClick={() => navigate(`/orders/${order.id}`)}>
                  <th style={{ padding: '1rem 0 1rem 1.5rem' }}>
                    <Checkbox type="checkbox" />
                  </th>
                  {!isFromMatter ? (
                    <th style={{ padding: '16px 12px 16px 24px' }}>
                      <MatterLink to={`/matters/${order.matter}`}>
                        {order.matter}
                      </MatterLink>
                    </th>
                  ) : ''}
                  <td>
                    {order.service}
                  </td>
                  <td>
                    {order.description}
                  </td>
                  <td>
                    <Status orderStatus={order.status}>
                      {order.status}
                    </Status>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <User>
                      {orgUsers!.find((el) => el.id === order.user)?.name.substring(0, 2).toUpperCase() || "UN"}
                    </User>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {convertTimestamp(order.date)}
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
                </TRow>
              ))}
            </TBody>
          </Table>
        </TableWrapper>
      ) : ''}
    </div>
  ) : <></>;
};

const Filters = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0 16px;
  
  .react-datepicker-wrapper {
    width: auto;
  }
  
  input {
    padding: .5rem .75rem .5rem 2.25rem;
    width: 100%;
    max-width: 300px;
    height: 34px;
    border: 1px solid rgba(156, 163, 175, .6);
    border-radius: 5px;
    font-size: calc(1rem - 2px);
    line-height: 1.5rem;
    background-color: rgba(17, 24, 39, .05);
    color: rgba(17, 24, 39, .6);

    ::placeholder {
      color: rgba(17, 24, 39, .35);
    }

    :focus {
      outline: 2px solid var(--primary-blue-color);
    }
  }

  @media (min-width: 768px) {
    padding: 0 32px;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const FilterButton = styled.button<{ isApplied?: boolean }>`
  position: relative;
  margin-left: .5rem;
  padding: .5rem 1rem;
  border: 1px solid rgba(0, 0, 0, .3);
  border-radius: 6px;
  font-size: 14px;
  text-transform: capitalize;
  background-color: ${({ isApplied }) => isApplied ? 'rgba(36, 99, 235, .07)' : '#fff'};
  
  :hover {
    border: 1px solid var(--primary-blue-color);
  }
`;

const List = styled.ul`
  position: absolute;
  top: calc(100% + .8rem);
  left: 50%;
  padding: .5rem 0;
  border-radius: 6px;
  background-color: #fff;
  transform: translateX(-50%);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, .25);
`;

const ListItem = styled.li<{ isSelected: boolean }>`
  padding: .25rem 1rem;
  text-align: left;
  white-space: nowrap;
  color: ${({ isSelected }) => isSelected ? 'var(--primary-blue-color)' : 'inherit'};
  text-transform: capitalize;
  cursor: pointer;
  
  :hover {
    background-color: rgba(0, 0, 0, .05);
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
    height: 70px;
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
`;

const TRow = styled.tr`
  cursor: pointer;
  
  :hover td, :hover th {
    background-color: rgba(229, 231, 235, .01);
  }
  
  :last-child {
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

const MatterLink = styled(Link)`
  transition: .1s ease-in-out;
  
  :hover {
    color: rgba(36, 99, 235, .8);
  }
`;

const Status = styled.span<{ orderStatus: OrderStatusEnum }>`
  display: block;
  padding: 6px 12px;
  text-align: center;
  font-weight: 500;
  border-radius: 100px;
  background-color: rgb(229, 231, 235);
  
  ${({ orderStatus }) => {
    if (orderStatus === OrderStatusEnum.ERROR) return css`
      background-color: rgba(255, 51, 51, 0.3);
      color: rgb(255, 51, 51);
      font-weight: 600;
    `;
    if (orderStatus === OrderStatusEnum.COMPLETE) return css`
      background-color: rgba(47, 255, 0, 0.3);
      color: rgb(40, 154, 0);
      font-weight: 600;
    `;
  }}
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

export default OrdersTable;
