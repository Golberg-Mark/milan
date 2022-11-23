import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import convertTimestamp from '@/utils/convertTimestamp';
import { selectMatters } from '@/store/selectors/userSelectors';
import Loader from '@/components/Loader';
import getNounByForm from '@/utils/getNounByForm';
import useInput from '@/hooks/useInput';
import Search from '@/components/Dashboard/Search';
import Pagination from '@/components/Pagination';
import Datepicker from '@/components/Datepicker/Datepicker';

const limits = [20, 50, 100];

const MattersTable = () => {
  const [search, setSearch] = useInput();
  const [startDay, setStartDay] = useState<Date>();
  const [endDay, setEndDay] = useState<Date>();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(0);

  const matters = Object.values(useSelector(selectMatters) || {});
  const navigate = useNavigate();

  const submitDates = (start?: Date, end?: Date) => {
    setStartDay(start);
    setEndDay(end);
  };

  const chooseMatter = (matter: string) => {
    navigate(`/dashboard/matters/${matter}`);
  };

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

  const maxPages = Math.ceil(matters.length / limits[limit]);
  const calculatedOffset = maxPages > 1 ? offset : 0;
  const filteredMatters = [];

  if (maxPages >= 1) {
    for (let i = calculatedOffset * limits[limit]; i < calculatedOffset * limits[limit] + limits[limit]; i++) {
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
            <Datepicker
              isApplied={!!(startDay && endDay)}
              setDates={submitDates}
              isForMatters
            />
          </Buttons>
        </Filters>
        {filteredMatters.length ? (
          <TableWrapper>
            <Table>
              <THead>
                <tr>
                  <FolderCell>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.5 8.25V12.75C16.5 15.75 15.75 16.5 12.75 16.5H5.25C2.25 16.5 1.5 15.75 1.5 12.75V5.25C1.5 2.25 2.25 1.5 5.25 1.5H6.375C7.5 1.5 7.7475 1.83 8.175 2.4L9.3 3.9C9.585 4.275 9.75 4.5 10.5 4.5H12.75C15.75 4.5 16.5 5.25 16.5 8.25Z" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10"/>
                    </svg>
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
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.5 8.25V12.75C16.5 15.75 15.75 16.5 12.75 16.5H5.25C2.25 16.5 1.5 15.75 1.5 12.75V5.25C1.5 2.25 2.25 1.5 5.25 1.5H6.375C7.5 1.5 7.7475 1.83 8.175 2.4L9.3 3.9C9.585 4.275 9.75 4.5 10.5 4.5H12.75C15.75 4.5 16.5 5.25 16.5 8.25Z" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10"/>
                      </svg>
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
          currentPage={calculatedOffset}
          maxPages={maxPages}
          maxElements={search || isFiltered ? mattersWithAppliedFilters.length : matters.length}
          limits={limits}
          limit={limit}
          setLimit={setLimit}
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
