import React, { ForwardedRef, forwardRef, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { AiOutlineFolder, BsChevronLeft, BsChevronRight } from 'react-icons/all';

import convertTimestamp from '@/utils/convertTimestamp';
import { selectMatters } from '@/store/selectors/userSelectors';
import Loader from '@/components/Loader';
import getNounByForm from '@/utils/getNounByForm';
import useInput from '@/hooks/useInput';
import Search from '@/components/Dashboard/Search';

const MattersTable = () => {
  const [search, setSearch] = useInput();
  const [startDay, setStartDay] = useState<Date | null>(null);
  const [endDay, setEndDay] = useState<Date | null>(null);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const matters = Object.values(useSelector(selectMatters) || {});
  const navigate = useNavigate();

  const maxPages = Math.ceil(matters.length / limit);

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

  if (maxPages >= 1) {
    for (let i = offset * limit; i <= offset * limit + limit; i++) {
      if (mattersWithAppliedFilters[i]) {
        filteredMatters.push(mattersWithAppliedFilters[i]);
      }
    }
  }

  const isFiltered = startDay || endDay;

  return matters ? (
    <div>
      <Filters>
        <Search
          value={search}
          onChange={setSearch}
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
            tabIndex={0}
            selectsRange
          />
        </Buttons>
      </Filters>
      {filteredMatters.length ? (
        <>
          <TableWrapper>
            <Table>
              <THead>
                <tr>
                  <th style={{ padding: '1rem 0 1rem 1.5rem' }}>
                    <FolderIcon />
                  </th>
                  <th style={{ padding: '14px 12px 14px 24px' }}>
                    Matter ID
                  </th>
                  <th>
                    Description
                  </th>
                  <th>
                    Orders
                  </th>
                  <th style={{ padding: '14px 12px', textAlign: 'center' }}>
                    Pending
                  </th>
                  <th style={{ textAlign: 'center' }}>
                    Last Ordered
                  </th>
                  <th style={{ padding: '14px 24px 14px 12px' }} />
                </tr>
              </THead>
              <TBody>
                {filteredMatters.map((matter, i) => (
                  <TRow key={i} onClick={() => chooseMatter(matter.matter)}>
                    <th style={{ padding: '1rem 0 1rem 1.5rem' }}>
                      <FolderIcon />
                    </th>
                    <th style={{ padding: '16px 12px 16px 24px' }}>
                      {matter.matter}
                    </th>
                    <td>
                      {matter.description}
                    </td>
                    <td>
                      {getNounByForm(matter.ordersAmount, 'order')}
                    </td>
                    <td>
                      <Status>
                        {matter.pending}
                      </Status>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {convertTimestamp(matter.lastOrdered)}
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
  ) : <Loader />;
};

const Filters = styled.div`
  display: flex;
  justify-content: space-between;
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

const FolderIcon = styled(AiOutlineFolder)`
  width: 1.5rem;
  height: 1.5rem;
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

const Status = styled.span`
  display: block;
  padding: 6px 12px;
  text-align: center;
  font-weight: 500;
  border-radius: 100px;
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
  
  svg {
    width: 0.875rem;
    height: 0.875rem;
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

export default MattersTable;
