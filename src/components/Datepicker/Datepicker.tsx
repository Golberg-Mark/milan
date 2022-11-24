import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { DayPicker } from 'react-day-picker';
import InputMask from 'react-input-mask';

import FilterButton from '@/components/Table/FilterButton';
import Caption from '@/components/Datepicker/Caption';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import Button from '@/components/Button';
import useInput from '@/hooks/useInput';
import checkDate from '@/utils/checkDate';

import 'react-day-picker/dist/style.css';

export type setDates = (start?: Date, end?: Date) => void;

interface Props {
  isApplied: boolean,
  isForMatters?: boolean,
  setDates: setDates
}

const Datepicker: React.FC<Props> = ({ isApplied, isForMatters = false, setDates }) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [startDateInput, setStartDateInput] = useInput();
  const [endDateInput, setEndDateInput] = useInput();
  const [ref, isVisible, toggleIsVisible] = useOnClickOutside<HTMLDivElement>();

  useEffect(() => {
    const date = checkDate(startDateInput);

    if (date) setStartDate(date);
    else setStartDate(undefined);
  }, [startDateInput]);

  useEffect(() => {
    const date = checkDate(endDateInput);

    if (date) setEndDate(date);
    else setEndDate(undefined);
  }, [endDateInput]);

  const submit = () => {
    if (startDate && endDate) {
      setDates(startDate, new Date(endDate.setHours(23, 59, 59, 99)));
      toggleIsVisible(false);
    }
  };

  const clear = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setDates();
  };

  return (
    <StyledFilterButton
      ref={ref}
      value="Date"
      onClick={() => toggleIsVisible(!isVisible)}
      isApplied={isApplied}
      isDropdownVisible={isVisible}
      isVisible={isVisible}
      style={{ marginRight: isForMatters ? '0' : '8px' }}
    >
      {isVisible ? (
        <StyledDatepicker
          isForMatters={isForMatters}
          onClick={(evt) => evt.stopPropagation()}
        >
          <DatepickerTitle>
            Date
            <svg onClick={toggleIsVisible} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.16748 4.16675L15.8334 15.8326" stroke="#ACB5BB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.16664 15.8326L15.8325 4.16675" stroke="#ACB5BB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </DatepickerTitle>
          <Inputs>
            <Label>
              <span>Start Date</span>
              <StyledMaskInput
                mask="99/99/9999"
                maskPlaceholder="DD/MM/YYYY"
                alwaysShowMask
                value={startDateInput}
                onChange={setStartDateInput}
              />
            </Label>
            <Label>
              <span>End Date</span>
              <StyledMaskInput
                mask="99/99/9999"
                maskPlaceholder="DD/MM/YYYY"
                alwaysShowMask
                value={endDateInput}
                onChange={setEndDateInput}
              />
            </Label>
          </Inputs>
          <Pickers>
            <DayPicker
              mode="single"
              selected={startDate}
              onSelect={setStartDate}
              components={{
                Caption
              }}
              showOutsideDays
            />
            <DayPicker
              mode="single"
              selected={endDate}
              onSelect={setEndDate}
              components={{
                Caption
              }}
              showOutsideDays
            />
          </Pickers>
          <Buttons>
            <StyledCancel isCancel onClick={clear}>
              Cancel
            </StyledCancel>
            <StyledSubmit disabled={!startDate || !endDate} onClick={submit}>
              Select
            </StyledSubmit>
          </Buttons>
        </StyledDatepicker>
      ) : ''}
    </StyledFilterButton>
  );
};

const StyledFilterButton = styled(FilterButton)<{ isVisible: boolean }>`
  ${({ isVisible }) => isVisible ? css`
    ::after {
      content: '';
      position: absolute;
      top: calc(100% + 7px);
      left: 50%;
      display: block;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 16px 32px 16px;
      border-color: transparent transparent #fff transparent;
      transform: translateX(-50%);
      z-index: 1;
    }
  ` : ''}
`;

const StyledDatepicker = styled.div<{ isForMatters: boolean }>`
  position: absolute;
  top: calc(100% + 24px);
  right: 0;
  padding: 24px;
  border-radius: 10px;
  background-color: #fff;
  z-index: 1;
  box-shadow: 4px 4px 250px rgba(68, 68, 79, 0.12);
  cursor: default;
  
  .rdp {
    --rdp-cell-size: 32px;
    --rdp-accent-color: var(--primary-green-color);
    --rdp-background-color: var(--primary-green-background-color);
    
    margin: 0;
  }
  
  .rdp-head_cell span {
    font-size: 12px;
    color: #B9B9B9;
    font-weight: 500;
  }
  
  ${({ isForMatters }) => !isForMatters ? css`
    right: 50%;
    transform: translateX(calc(50% - 30px));
  ` : ''}
`;

const DatepickerTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(172, 181, 187, 0.16);
  font-size: 16px;
  font-weight: 600;
  
  svg {
    cursor: pointer;
    
    :hover * {
      stroke: var(--primary-dark-color);
    }
  }
`;

const Inputs = styled.div`
  display: flex;
  justify-content: space-between;
  grid-gap: 20px;
  margin-bottom: 20px;
  
  label {
    width: 100%;
  }
  
  div {
    margin: 0;
  }
  
  input {
    height: 34px;
  }
`;

const Label = styled.label`
  span {
    display: block;
    margin-bottom: 10px;
    font-size: 12px;
    font-weight: 400;
    color: var(--primary-dark-color);
  }
`;

const StyledMaskInput = styled(InputMask)`
  padding: 13px 16px;
  width: 100%;
  height: 38px;
  border: 1px solid rgba(35, 35, 35, 0.16);
  border-radius: 4px;
  font-size: 12px;
  background-color: #fff;

  :focus {
    outline: 2px solid var(--primary-blue-color);
  }
`;

const Pickers = styled.div`
  display: flex;
  grid-gap: 20px;
  margin-bottom: 16px;
`;

const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-areas: "e e c s";
  grid-gap: 20px;
`;

const StyledCancel = styled(Button)`
  grid-area: c;
`;

const StyledSubmit = styled(Button)`
  grid-area: s;
`;

export default Datepicker;
