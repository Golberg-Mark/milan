import React from 'react';

import Datepicker, { setDates } from '@/components/Datepicker/Datepicker';
import styled, { css } from 'styled-components';
import Search from '@/components/Dashboard/Search';
import FilterButton from '@/components/Table/FilterButton';
import { HandleToggle } from '@/hooks/useToggle';

interface ISearch {
  searchValue: string,
  setSearchValue: (evt: React.ChangeEvent<HTMLInputElement>) => void,
  placeholder: string,
  clear: () => void
}

interface IFilter {
  name: string,
  value: string | null,
  setValue: Function,
  values: any[],
  keyForValue?: string,
  isApplied: boolean,
  ref: React.RefObject<HTMLDivElement>,
  isDropdownVisible: boolean,
  toggleIsVisible: HandleToggle,
  normalizeValue?: (value: string) => string,
  containLargeValues?: boolean
}

interface IDatepickerFilter {
  startDate: Date | undefined,
  endDate: Date | undefined,
  isForMatters?: boolean,
  setDates: setDates,
  makeItLast?: boolean
}

interface Props {
  search: ISearch,
  datepicker?: IDatepickerFilter,
  filters?: IFilter[]
}

const Filters: React.FC<Props> = ({
  search,
  filters,
  datepicker
}) => {
  return (
    <StyledFilters>
      <Search
        value={search.searchValue}
        onChange={search.setSearchValue}
        placeholder={search.placeholder}
        clearField={search.clear}
      />
      <Buttons withOrder={!!datepicker?.makeItLast}>
        {datepicker ? (
          <Datepicker
            isForMatters={datepicker.isForMatters}
            isApplied={!!(datepicker.startDate && datepicker.endDate)}
            setDates={datepicker.setDates}
          />
        ) : ''}
        {filters ? filters.map((filter, i) => {
          let value = filter.normalizeValue && filter.value
            ? filter.normalizeValue(filter.value)
            : filter.value || filter.name;

          return (
            <FilterButton
              key={filter.name}
              ref={filter.ref}
              value={value}
              isApplied={filter.isApplied}
              isDropdownVisible={filter.isDropdownVisible}
              onClick={filter.toggleIsVisible}
            >
              {filter.isDropdownVisible ? (
                <List isLast={i + 1 === filters.length} containLargeValues={filter.containLargeValues}>
                  {filter.values.map((item, i) => {
                    const itemValue = filter.keyForValue ? item[filter.keyForValue] : item;

                    return (
                      <ListItem
                        key={itemValue + i}
                        isSelected={itemValue === filter.value}
                        onClick={() => filter.setValue(item)}
                      >
                        {filter.normalizeValue ? filter.normalizeValue(itemValue) : itemValue}
                      </ListItem>
                    );
                  })}
                </List>
              ) : ''}
            </FilterButton>
          );
        }) : ''}
      </Buttons>
    </StyledFilters>
  );
};

const StyledFilters = styled.div`
  display: flex;
  grid-gap: 16px;
  align-items: center;
  margin-bottom: 1rem;
`;

const Buttons = styled.div<{ withOrder: boolean }>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  grid-gap: 8px;
  
  ${({ withOrder }) => withOrder ? css`
    flex-direction: row-reverse;
    
    div:first-child > div {
      right: 0;
      transform: unset;
    }
  ` : ''}
`;

const List = styled.ul<{ isLast: boolean, containLargeValues?: boolean }>`
  position: absolute;
  top: calc(100% + 24px);
  left: 50%;
  padding: .5rem 0;
  border-radius: 6px;
  background-color: #fff;
  transform: translateX(-50%);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, .25);
  
  ${({ isLast, containLargeValues }) => {
    if (isLast) return containLargeValues ? css`
      right: 0;
      left: unset;
      transform: unset;
      max-width: 300%;
      
      li {
        white-space: unset;
        word-break: unset;
      }
    ` : 'max-width: 100%';
    return containLargeValues ? 'width: max-content' : 'width: 100%';
  }};
`;

const ListItem = styled.li<{ isSelected: boolean }>`
  padding: .25rem 1rem;
  text-align: left;
  white-space: normal;
  word-break: break-all;
  color: ${({ isSelected }) => isSelected ? 'var(--primary-green-color)' : 'inherit'};
  text-transform: capitalize;
  cursor: pointer;
  
  :hover {
    background-color: rgba(0, 0, 0, .05);
  }
`;

export default Filters;
