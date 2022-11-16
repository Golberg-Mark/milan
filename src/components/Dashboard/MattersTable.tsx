import React, { ForwardedRef, forwardRef, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { AiOutlineFolder } from 'react-icons/all';

import convertTimestamp from '@/utils/convertTimestamp';
import { selectMatters } from '@/store/selectors/userSelectors';
import Loader from '@/components/Loader';
import getNounByForm from '@/utils/getNounByForm';
import useInput from '@/hooks/useInput';
import Search from '@/components/Dashboard/Search';
import Pagination from '@/components/Pagination';
import useToggle from '@/hooks/useToggle';

const limit = 10;

const MattersTable = () => {
  const [search, setSearch] = useInput();
  const [startDay, setStartDay] = useState<Date | null>(null);
  const [endDay, setEndDay] = useState<Date | null>(null);
  const [isDatePickerVisible, toggleIsDatePickerVisible] = useToggle();
  const [offset, setOffset] = useState(0);

  const matters = Object.values(useSelector(selectMatters) || {});
  const navigate = useNavigate();

  const onDateChange = (dates: any) => {
    const [start, end] = dates;

    setStartDay(start);
    if (end) setEndDay(new Date(end.setHours(23, 59, 59, 99)));
    else setEndDay(null);
  };

  const clearFilters = () => {
    setStartDay(null);
    setEndDay(null);
  };

  const chooseMatter = (matter: string) => {
    navigate(`/dashboard/matters/${matter}`);
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

  let mattersWithAppliedFilters = useMemo(() => {
    if (!matters) return [];

    return matters.filter((el) => {
      if (!startDay || !endDay) return true;

      let orderDate = new Date(+el.lastOrdered);
      return orderDate >= startDay && orderDate <= endDay;
    }).filter((matter) => {
      if (!search) return true;

      const regexp = new RegExp(`.*${search.toLowerCase()}.*`);
      return regexp.test(matter.matter.toLowerCase());
    });
  }, [search, matters, startDay, endDay]);

  const filteredMatters = [];
  const maxPages = Math.ceil(matters.length / limit);

  if (maxPages >= 1) {
    for (let i = offset * limit; i < offset * limit + limit; i++) {
      if (mattersWithAppliedFilters[i]) {
        filteredMatters.push(mattersWithAppliedFilters[i]);
      }
    }
  }

  const isFiltered = startDay || endDay;

  return matters ? (
    <StyledWrapper>
      <div>
        <Filters>
          <Search
            value={search}
            onChange={(evt) => {
              setSearch(evt.target.value);
              setOffset(0);
            }}
            placeholder="Search matters"
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
          </Buttons>
        </Filters>
        {filteredMatters.length ? (
          <TableWrapper>
            <Table>
              <THead>
                <tr>
                  <FolderCell>
                    <AiOutlineFolder />
                  </FolderCell>
                  <th>
                    Matter ID
                  </th>
                  <th>
                    Description
                  </th>
                  <th>
                    Orders
                  </th>
                  <th>
                    Pending
                  </th>
                  <th>
                    Last Ordered
                  </th>
                </tr>
              </THead>
              <TBody>
                {filteredMatters.map((matter, i) => (
                  <TRow key={i} onClick={() => chooseMatter(matter.matter)}>
                    <FolderCell>
                      <AiOutlineFolder />
                    </FolderCell>
                    <th>
                      {matter.matter}
                    </th>
                    <th>
                      {matter.description}
                    </th>
                    <th>
                      {getNounByForm(matter.ordersAmount, 'order')}
                    </th>
                    <th>
                      <Status>
                        {matter.pending}
                      </Status>
                    </th>
                    <th>
                      {convertTimestamp(matter.lastOrdered)}
                    </th>
                  </TRow>
                ))}
              </TBody>
            </Table>
          </TableWrapper>
        ) : ''}
      </div>
      {filteredMatters.length ? (
        <Pagination
          changePage={setOffset}
          currentPage={offset}
          maxPages={maxPages}
          maxElements={search || isFiltered ? mattersWithAppliedFilters.length : matters.length}
          limit={limit}
        />
      ) : ''}
    </StyledWrapper>
  ) : <Loader />;
};

const StyledWrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  flex: 1;
`;

const Filters = styled.div`
  display: flex;
  justify-content: space-between;
  grid-gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;

  .react-datepicker-wrapper {
    width: auto;
  }
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
`;

const FolderCell = styled.th`
  width: 18px;
  height: 16px;
  
  svg {
    width: 18px;
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

const TRow = styled.tr`
  cursor: pointer;

  th {
    padding: 14px 35px 14px 0;

    :first-child {
      padding-left: 18px;
    }
  }

  :hover th {
    background-color: #F9F9F9;
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

const Status = styled.span`
  display: block;
  padding: 6px 12px;
  text-align: center;
  font-weight: 500;
  border-radius: 100px;
  background-color: rgb(229, 231, 235);
`;

export default MattersTable;
