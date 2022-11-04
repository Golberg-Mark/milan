import React, { ForwardedRef, forwardRef, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import styled, { css } from 'styled-components';
import DatePicker from 'react-datepicker';
import { BsChevronLeft, BsChevronRight } from 'react-icons/all';

import convertTimestamp from '@/utils/convertTimestamp';
import { Order, OrderStatusEnum, OrganizationUser } from '@/store/reducers/user';
import { selectMatters, selectOrganizationUsers } from '@/store/selectors/userSelectors';
import Loader from '@/components/Loader';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import useInput from '@/hooks/useInput';
import Search from '@/components/Dashboard/Search';

import 'react-datepicker/dist/react-datepicker.css';
import useToggle from '@/hooks/useToggle';
import getNounByForm from '@/utils/getNounByForm';

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
  const [isAllCheckboxChecked, toggleIsAllCheckboxChecked] = useToggle();
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const orgUsers = useSelector(selectOrganizationUsers);

  const navigate = useNavigate();

  const maxPages = Math.ceil(orders.length / limit);

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

  const onCheckboxClick = (isChecked: boolean, id: number) => {
    setSelectedOrders(prevState => {
      if (!isChecked) return prevState.filter(el => el !== id);
      return [...prevState, id];
    });
    toggleIsAllCheckboxChecked(false);
  };

  const selectAllCheckboxes = (isSelected: boolean) => {
    if (!isSelected) {
      setSelectedOrders([]);
      toggleIsAllCheckboxChecked(false);
    } else {
      setSelectedOrders(filteredOrders.filter(order => order.status === 'complete').map(order => order.id));
      toggleIsAllCheckboxChecked(true);
    }
  };

  const previousPage = () => {
    setOffset(prevState => prevState ? prevState - 1 : 0);
  };

  const nextPage = () => {
    setOffset(prevState => prevState + 2 > maxPages ? prevState : prevState + 1);
  };

  // @ts-ignore
  const CustomInput = forwardRef(({ value, onClick }, ref: ForwardedRef<HTMLButtonElement>) => (
    <FilterButton onClick={onClick} ref={ref} isApplied={!!startDay}>
      {value || 'Date'}
    </FilterButton>
  ));

  const ordersWithAppliedFilters = useMemo(() => orders.filter((order) => {
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
  const filteredOrders: Order[] = [];

  if (maxPages > 1) {
    for (let i = offset * limit; i <= offset * limit + limit; i++) {
      if (ordersWithAppliedFilters[i]) {
        filteredOrders.push(ordersWithAppliedFilters[i]);
      }
    }
  }

  const isFiltered = (startDay && endDay) || status || selectedUser;

  return orgUsers ? (
    <>
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
          <>
            <TableWrapper>
              <Table>
                <THead>
                  <tr>
                    <th style={{ padding: '1rem 0 1rem 1.5rem' }}>
                      <Checkbox
                        type="checkbox"
                        checked={isAllCheckboxChecked}
                        onClick={(evt) => evt.stopPropagation()}
                        onChange={({ target }) => selectAllCheckboxes(target.checked)}
                      />
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
                        <Checkbox
                          type="checkbox"
                          checked={!!selectedOrders.find(el => el === order.id)}
                          onClick={(evt) => evt.stopPropagation()}
                          onChange={({ target }) => onCheckboxClick(target.checked, order.id)}
                        />
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
                          {order.type === 'validation' ? 'list' : order.status}
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
            {maxPages > 1 ? (
              <Pagination>
                <PageWrapper>
                  <Arrow isDisabled={!offset}>
                    <BsChevronLeft onClick={previousPage} />
                  </Arrow>
                  <Page>
                    Page
                    <span>{offset + 1}</span>
                  </Page>
                  <Arrow isDisabled={offset + 1 === maxPages}>
                    <BsChevronRight onClick={nextPage} />
                  </Arrow>
                </PageWrapper>
              </Pagination>
            ) : ''}
          </>
        ) : ''}
      </div>
      {selectedOrders.length ? (
        <PopUp>
          <FilesCount>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.2526 10.725L15.9526 14.475C15.8401 15.6225 15.7501 16.5 13.7176 16.5H4.28257C2.25007 16.5 2.16007 15.6225 2.04757 14.475L1.74757 10.725C1.68757 10.1025 1.88257 9.525 2.23507 9.0825C2.24257 9.075 2.24257 9.075 2.25007 9.0675C2.66257 8.565 3.28507 8.25 3.98257 8.25H14.0176C14.7151 8.25 15.3301 8.565 15.7351 9.0525C15.7426 9.06 15.7501 9.0675 15.7501 9.075C16.1176 9.5175 16.3201 10.095 16.2526 10.725Z" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10"/>
              <path d="M2.625 8.57249V4.70999C2.625 2.15999 3.2625 1.52249 5.8125 1.52249H6.765C7.7175 1.52249 7.935 1.80749 8.295 2.28749L9.2475 3.56249C9.4875 3.87749 9.63 4.07249 10.2675 4.07249H12.18C14.73 4.07249 15.3675 4.70999 15.3675 7.25999V8.60249" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.07251 12.75H10.9275" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {`${getNounByForm(selectedOrders.length, 'file')} selected`}
          </FilesCount>
          <Actions>
            <li>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.4375 5.25H12.5625V3.75C12.5625 2.25 12 1.5 10.3125 1.5H7.6875C6 1.5 5.4375 2.25 5.4375 3.75V5.25Z" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 11.25V14.25C12 15.75 11.25 16.5 9.75 16.5H8.25C6.75 16.5 6 15.75 6 14.25V11.25H12Z" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.75 7.5V11.25C15.75 12.75 15 13.5 13.5 13.5H12V11.25H6V13.5H4.5C3 13.5 2.25 12.75 2.25 11.25V7.5C2.25 6 3 5.25 4.5 5.25H13.5C15 5.25 15.75 6 15.75 7.5Z" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.75 11.25H11.8425H5.25" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.25 8.25H7.5" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Print
            </li>
            <li>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.75 15.375H5.25C3 15.375 1.5 14.25 1.5 11.625V6.375C1.5 3.75 3 2.625 5.25 2.625H12.75C15 2.625 16.5 3.75 16.5 6.375V11.625C16.5 14.25 15 15.375 12.75 15.375Z" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.75 6.75L10.4025 8.625C9.63 9.24 8.3625 9.24 7.59 8.625L5.25 6.75" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Email
            </li>
            <li>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.98999 8.75999L8.90999 10.68L10.83 8.75999" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.90991 3V10.6275" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 9.13499C15 12.45 12.75 15.135 9 15.135C5.25 15.135 3 12.45 3 9.13499" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download
            </li>
            <CloseIcon
              width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
              onClick={(evt) => selectAllCheckboxes(false)}
            >
              <path d="M5.00098 5L19 18.9991" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.99996 18.9991L18.999 5" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </CloseIcon>
          </Actions>
        </PopUp>
      ) : ''}
    </>
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
  margin-bottom: 1rem;
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 2rem;
`;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: .5rem;
`;

const Arrow = styled.div<{ isDisabled: boolean }>`
  width: 1rem;
  height: 1rem;
  
  svg {
    cursor: ${({ isDisabled }) => isDisabled ? 'default' : 'pointer'};

    ${({ isDisabled }) => !isDisabled ? css`
      :hover {
        fill: var(--primary-blue-color);
      }
    ` : css`
      fill: rgba(0, 0, 0, .2);
    `}
  }
`;

const Page = styled.p`
  display: flex;
  align-items: center;
  grid-gap: .5rem;
  
  span {
    display: block;
    padding: .25rem 1rem;
    border-radius: 3px;
    background-color: #fff;
    background-color: rgba(17, 24, 39, .05);
  }
`;

const PopUp = styled.div`
  position: fixed;
  bottom: 100px;
  left: calc(50% + 255px / 2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 38px 88px 38px 32px;
  max-width: 822px;
  width: 100%;
  transform: translateX(-50%);
  background-color: #fff;
  box-shadow: 0 12px 80px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const FilesCount = styled.p`
  display: flex;
  align-items: center;
  grid-gap: 13px;
`;

const Actions = styled.ul`
  display: flex;
  align-items: center;
  grid-gap: 16px;
  
  li {
    display: flex;
    align-items: center;
    grid-gap: 13px;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    background: #F8F9FB;
    cursor: pointer;
    
    :hover {
      background: #EAEAEB;
    }
  }
`;

const CloseIcon = styled.svg`
  position: absolute;
  top: 50%;
  right: 32px;
  transform: translateY(-50%);
  cursor: pointer;
`;

export default OrdersTable;
