import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import styled, { css } from 'styled-components';

import convertTimestamp from '@/utils/convertTimestamp';
import { Order, OrderStatusEnum, OrganizationUser } from '@/store/reducers/user';
import { selectMatters, selectOrganizationUsers } from '@/store/selectors/userSelectors';
import Loader from '@/components/Loader';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import useInput from '@/hooks/useInput';
import useToggle from '@/hooks/useToggle';
import getNounByForm from '@/utils/getNounByForm';
import getUserAvatar from '@/utils/getUserAvatar';
import Pagination from '@/components/Pagination';
import Checkbox from '@/components/Checkbox';
import { userActions } from '@/store/actions/userActions';
import Filters from '@/components/Table/Filters';

interface Props {
  orders: Order[],
  isFromMatter?: boolean
}

const statuses = (Object.keys(OrderStatusEnum) as Array<keyof typeof OrderStatusEnum>)
  .map((key) => key);

export const Wrapper: React.FC = () => {
  const { matterId } = useParams();
  const matters = useSelector(selectMatters);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {
      dispatch(userActions.setSelectedMatter(null));
    };
  }, []);

  return matterId && matters
    ? <OrdersTable isFromMatter orders={matters[matterId].orders}/>
    : <Loader />;
};

const limits = [20, 50, 100];

const OrdersTable: React.FC<Props> = ({ orders, isFromMatter = false }) => {
  const [search, setSearch] = useInput();
  const [startDay, setStartDay] = useState<Date>();
  const [endDay, setEndDay] = useState<Date>();
  const [status, setStatus] = useState< keyof typeof OrderStatusEnum | null>(null);
  const [statusRef, isStatusVisible, toggleIsStatusVisible] = useOnClickOutside<HTMLDivElement>();
  const [selectedUser, setSelectedUser] = useState<OrganizationUser | null>(null);
  const [usersRef, isUsersVisible, toggleIsUsersVisible] = useOnClickOutside<HTMLDivElement>();
  const [isAllCheckboxChecked, toggleIsAllCheckboxChecked] = useToggle();
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(0);

  const orgUsers = useSelector(selectOrganizationUsers);

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth'});
  }, [offset]);

  const submitDates = (start?: Date, end?: Date) => {
    setStartDay(start);
    setEndDay(end);
  };

  const selectStatus = (s: keyof typeof OrderStatusEnum) => {
    setStatus(s);
    toggleIsStatusVisible(false);
  };

  const selectOrgUser = (userObj: OrganizationUser) => {
    setSelectedUser(userObj);
    toggleIsUsersVisible(false);
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
          <Filters
            search={{
              searchValue: search,
              placeholder: 'Search matters & orders',
              setSearchValue: (evt) => {
                setSearch(evt.target.value);
                setOffset(0);
              },
              clear: () => setSearch('')
            }}
            datepicker={{
              startDate: startDay,
              endDate: endDay,
              setDates: submitDates
            }}
            filters={[
              {
                ref: statusRef,
                name: 'Status',
                value: status,
                setValue: selectStatus,
                values: statuses,
                isApplied: !!status,
                isDropdownVisible: isStatusVisible,
                toggleIsVisible: toggleIsStatusVisible,
                normalizeValue: (v: string) => v.replaceAll('_', ' ').toLowerCase()
              },
              {
                ref: usersRef,
                name: 'User',
                value: selectedUser?.name || '',
                setValue: selectOrgUser,
                values: orgUsers,
                keyForValue: 'name',
                isApplied: !!selectedUser,
                isDropdownVisible: isUsersVisible,
                toggleIsVisible: toggleIsUsersVisible
              }
            ]}
          />
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
                    {!isFromMatter ? (
                      <ActionCell>
                        Action
                      </ActionCell>
                    ) : ''}
                  </tr>
                </THead>
                <TBody>
                  {filteredOrders.map((order, i) => (
                    <TRow
                      key={i}
                      isChecked={!!selectedOrders.find(el => el === order.id)}
                      onClick={() => navigate(`/dashboard/orders/${order.id}`)}
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
                          <MatterLink
                            to={`/dashboard/matters/${order.matter}`}
                            onClick={(evt) => {
                              evt.stopPropagation();
                              dispatch(userActions.setSelectedMatter(order.matter));
                            }}
                          >
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
                      </UserCell>
                      <th>
                        {convertTimestamp(order.date)}
                      </th>
                      {!isFromMatter ? (
                        <ActionCell onClick={(evt) => evt.stopPropagation()}>
                          <Info>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8.00004 1.33301C4.32004 1.33301 1.33337 4.31967 1.33337 7.99967C1.33337 11.6797 4.32004 14.6663 8.00004 14.6663C11.68 14.6663 14.6667 11.6797 14.6667 7.99967C14.6667 4.31967 11.68 1.33301 8.00004 1.33301ZM8.00004 11.333C7.63337 11.333 7.33337 11.033 7.33337 10.6663V7.99967C7.33337 7.63301 7.63337 7.33301 8.00004 7.33301C8.36671 7.33301 8.66671 7.63301 8.66671 7.99967V10.6663C8.66671 11.033 8.36671 11.333 8.00004 11.333ZM8.66671 5.99967H7.33337V4.66634H8.66671V5.99967Z" fill="#1A1C1E"/>
                            </svg>
                          </Info>
                        </ActionCell>
                      ) : ''}
                    </TRow>
                  ))}
                </TBody>
              </Table>
            </TableWrapper>
          ) : <NotFound>Orders wasn't found</NotFound>}
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

const ActionCell = styled.th`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 12px 10px 12px 0 !important;
`;

const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  background-color: #F1EFE9;
  
  :hover {
    background-color: #E1DFD9;
  }

  svg {
    width: 16px;
    height: 16px;
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
    padding-right: 25px;
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
  display: flex;
  align-items: center;
  height: 100%;
  transition: .1s ease-in-out;
  
  :hover {
    color: var(--primary-green-color);
  }
`;

const Status = styled.span<{ orderStatus: OrderStatusEnum }>`
  display: block;
  padding: 4px 6px;
  width: fit-content;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  color: #6C7278;
  text-align: center;
  text-transform: uppercase;
  background-color: #EDF1F3;
  
  ${({ orderStatus }) => {
    if (orderStatus === OrderStatusEnum.ERROR) return css`
      background-color: var(--primary-red-background-color);
      color: var(--primary-red-color);
    `;
    if (orderStatus === OrderStatusEnum.COMPLETE) return css`
      background-color: var(--primary-green-background-color);
      color: var(--primary-green-color);
    `;
    if (orderStatus === OrderStatusEnum.IN_PROGRESS) return css`
      background-color: var(--primary-warning-background-color);
      color: var(--primary-warning-color);
    `;
  }}
`;

const User = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.25rem;
  height: 2.25rem;
  font-weight: 500;
  border-radius: 50%;
  background-color: rgb(229, 231, 235);
`;

const NotFound = styled.div`
  text-align: center;
  padding-top: 206px;
  font-size: 18px;
  font-weight: 500;
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
