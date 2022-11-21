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
import useToggle from '@/hooks/useToggle';
import getNounByForm from '@/utils/getNounByForm';
import getUserAvatar from '@/utils/getUserAvatar';
import Pagination from '@/components/Pagination';
import Checkbox from '@/components/Checkbox';

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

const limits = [20, 50, 100];

const OrdersTable: React.FC<Props> = ({ orders, isFromMatter = false }) => {
  const [search, setSearch] = useInput();
  const [startDay, setStartDay] = useState<Date | null>(null);
  const [isDatePickerVisible, toggleIsDatePickerVisible] = useToggle();
  const [endDay, setEndDay] = useState<Date | null>(null);
  const [status, setStatus] = useState< keyof typeof OrderStatusEnum | null>(null);
  const [statusRef, isStatusVisible, toggleIsStatusVisible] = useOnClickOutside<HTMLButtonElement>();
  const [selectedUser, setSelectedUser] = useState<OrganizationUser | null>(null);
  const [usersRef, isUsersVisible, toggleIsUsersVisible] = useOnClickOutside<HTMLButtonElement>();
  const [isAllCheckboxChecked, toggleIsAllCheckboxChecked] = useToggle();
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(0);

  const orgUsers = useSelector(selectOrganizationUsers);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth'});
  }, [offset]);

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

  const onCheckboxClick = (isChecked: boolean, id: string) => {
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

  // @ts-ignore
  const CustomInput = forwardRef(({ value, onClick }, ref: ForwardedRef<HTMLButtonElement>) => (
    <FilterButton
      ref={ref}
      onClick={() => {
        toggleIsDatePickerVisible(!isDatePickerVisible);
        onClick();
      }}
      isApplied={!!startDay}
      isDropdownVisible={isDatePickerVisible}
      style={{ marginRight: '8px' }}
    >
      {value || 'Date'}
      <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transition: '.1 ease-in-out' }}>
        <path d="M6.96012 0.0900269H3.84512H1.04012C0.560118 0.0900269 0.320118 0.670027 0.660118 1.01003L3.25012 3.60003C3.66512 4.01503 4.34012 4.01503 4.75512 3.60003L5.74012 2.61503L7.34512 1.01003C7.68012 0.670027 7.44012 0.0900269 6.96012 0.0900269Z" fill="#292D32"/>
      </svg>
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

  const maxPages = Math.ceil(ordersWithAppliedFilters.length / limits[limit]);
  const calculatedOffset = maxPages > 1 ? offset : 0;
  const filteredOrders: Order[] = [];

  if (maxPages >= 1) {
    for (let i = calculatedOffset * limits[limit]; i < calculatedOffset * limits[limit] + limits[limit]; i++) {
      if (ordersWithAppliedFilters[i]) {
        filteredOrders.push(ordersWithAppliedFilters[i]);
      }
    }
  }

  const isFiltered = (startDay && endDay) || status || selectedUser;

  return orgUsers ? (
    <>
      <StyledWrapper>
        <div>
          <Filters>
            <Search
              value={search}
              onChange={(evt) => {
                setSearch(evt.target.value);
                setOffset(0);
              }}
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
                onClickOutside={toggleIsDatePickerVisible}
                tabIndex={0}
                selectsRange
              />
              <FilterButton
                ref={statusRef}
                isApplied={!!status}
                isDropdownVisible={isStatusVisible}
                onClick={toggleIsStatusVisible}
              >
                {status?.toLowerCase() || 'Status'}
                <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.96012 0.0900269H3.84512H1.04012C0.560118 0.0900269 0.320118 0.670027 0.660118 1.01003L3.25012 3.60003C3.66512 4.01503 4.34012 4.01503 4.75512 3.60003L5.74012 2.61503L7.34512 1.01003C7.68012 0.670027 7.44012 0.0900269 6.96012 0.0900269Z" fill="#292D32"/>
                </svg>
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
                isDropdownVisible={isUsersVisible}
                onClick={toggleIsUsersVisible}
              >
                {selectedUser?.name || 'User'}
                <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.96012 0.0900269H3.84512H1.04012C0.560118 0.0900269 0.320118 0.670027 0.660118 1.01003L3.25012 3.60003C3.66512 4.01503 4.34012 4.01503 4.75512 3.60003L5.74012 2.61503L7.34512 1.01003C7.68012 0.670027 7.44012 0.0900269 6.96012 0.0900269Z" fill="#292D32"/>
                </svg>
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
                    <CheckboxCell>
                      <Checkbox
                        type="checkbox"
                        checked={isAllCheckboxChecked}
                        onChange={({ target }) => selectAllCheckboxes(target.checked)}
                      />
                    </CheckboxCell>
                    {!isFromMatter ? (
                      <th>
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
                    <th>
                      User
                    </th>
                    <th>
                      Date
                    </th>
                    <MoreCell />
                  </tr>
                </THead>
                <TBody>
                  {filteredOrders.map((order, i) => (
                    <TRow
                      key={i}
                      isChecked={!!selectedOrders.find(el => el === order.id)}
                      onClick={() => navigate(`/orders/${order.id}`)}
                    >
                      <CheckboxCell>
                        <Checkbox
                          type="checkbox"
                          disabled={order.status !== 'complete'}
                          checked={!!selectedOrders.find(el => el === order.id)}
                          onChange={({ target }) => onCheckboxClick(target.checked, order.id)}
                        />
                      </CheckboxCell>
                      {!isFromMatter ? (
                        <th>
                          <MatterLink to={`/matters/${order.matter}`}>
                            {order.matter}
                          </MatterLink>
                        </th>
                      ) : ''}
                      <th>
                        {order.service}
                      </th>
                      <th>
                        {order.description}
                      </th>
                      <th>
                        <Status orderStatus={order.status}>
                          {order.type === 'list' ? 'list' : order.status}
                        </Status>
                      </th>
                      <UserCell>
                        <User>
                          {getUserAvatar(String(orgUsers!.find((el) => el.id === order.user)?.name), false)}
                        </User>
                        {orgUsers!.find((el) => el.id === order.user)?.name.split(' ')[0]}
                      </UserCell>
                      <th>
                        {convertTimestamp(order.date)}
                      </th>
                      <MoreCell onClick={(evt) => evt.stopPropagation()}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z" stroke="#292D32" strokeWidth="1.5"/>
                          <path d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z" stroke="#292D32" strokeWidth="1.5"/>
                          <path d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" stroke="#292D32" strokeWidth="1.5"/>
                        </svg>
                      </MoreCell>
                    </TRow>
                  ))}
                </TBody>
              </Table>
            </TableWrapper>
          ) : ''}
        </div>
        {filteredOrders.length ? (
          <Pagination
            changePage={setOffset}
            currentPage={calculatedOffset}
            maxPages={maxPages}
            maxElements={search || isFiltered ? ordersWithAppliedFilters.length : orders.length}
            limits={limits}
            limit={limit}
            setLimit={setLimit}
          />
        ) : ''}
      </StyledWrapper>
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
              onClick={() => selectAllCheckboxes(false)}
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

const StyledWrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  flex: 1;
`;

const Filters = styled.div`
  display: flex;
  grid-gap: 16px;
  align-items: center;
  margin-bottom: 1rem;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const FilterButton = styled.button<{ isDropdownVisible?: boolean, isApplied?: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 6px;
  padding: 0 19px;
  height: 38px;
  border: 1px solid rgba(35, 35, 35, 0.16);
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
  white-space: nowrap;
  background-color: ${({ isApplied }) => isApplied ? 'var(--primary-green-background-color)' : '#fff'};
  
  :not(:last-child) {
    margin-right: 8px;
  }
  
  :hover {
    border: 1px solid var(--primary-dark-hover-color);
  }
  
  svg {
    width: 8px;
    height: 4px;
    transition: .1s ease-in-out;
    ${({ isDropdownVisible }) => isDropdownVisible ? 'transform: rotate(180deg)' : ''}
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
  overflow-x: auto;
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
  background-color: #F9F9F9;

  th {
    padding: 12px 35px 12px 0;
    font-size: 12px;
    font-weight: 400;
    color: rgba(17, 24, 39, 0.5);
    text-transform: uppercase;
    text-align: left;

    :first-child {
      padding-left: 18px;
      border-top-left-radius: 4px;
    }

    :last-child {
      border-top-right-radius: 4px;
    }
  }
`;

const CheckboxCell = styled.th`
  width: 18px;
`;

const UserCell = styled.th`
  display: flex;
  align-items: center;
  grid-gap: 16px;
`;

const MoreCell = styled.th`
  padding-right: 18px;
  width: 24px;
  
  svg {
    width: 24px;
    
    :hover * {
      stroke: var(--primary-green-color);
    }
  }
`;

const TBody = styled.tbody`
  th {
    height: 64px;
    background-color: #fff;
    font-size: 14px;
    font-weight: 500;
    text-align: left;
  }
`;

const TRow = styled.tr<{ isChecked: boolean }>`
  cursor: pointer;
  
  th {
    padding: 14px 35px 14px 0;
    background-color: ${({ isChecked }) => isChecked ? '#E8F6FA' : '#fff'};
    
    :first-child {
      padding-left: 18px;
    }
  }
  
  :hover th {
    background-color: ${({ isChecked }) => isChecked ? '#E8F6FA' : '#F9F9F9'};
  }
  
  :last-child {
    th:first-child {
      border-bottom-left-radius: 4px;
    }

    th:last-child {
      border-bottom-right-radius: 4px;
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
  padding: 4px 6px;
  width: fit-content;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
  background-color: rgb(229, 231, 235);
  
  ${({ orderStatus }) => {
    if (orderStatus === OrderStatusEnum.ERROR) return css`
      background-color: #DD5757;
      color: #fff;
    `;
    if (orderStatus === OrderStatusEnum.COMPLETE) return css`
      background-color: var(--primary-green-color);
      color: #fff;
    `;
  }}
`;

const User = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background-color: rgb(229, 231, 235);
`;

const PopUp = styled.div`
  position: fixed;
  bottom: 100px;
  left: calc(50% + 256px / 2);
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
