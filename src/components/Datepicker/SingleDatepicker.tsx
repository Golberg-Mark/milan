import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DayPicker } from 'react-day-picker';

import FilterButton from '@/components/Table/FilterButton';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import Caption from '@/components/Datepicker/Caption';
import CloseIcon from '@/assets/icons/CloseIcon';
import convertTimestamp from '@/utils/convertTimestamp';
import useToggle from '@/hooks/useToggle';

interface Props {
  label: string,
  setFunc: Function,
  modalRef: HTMLDivElement
}

const SingleDatepicker: React.FC<Props> = ({
  label,
  setFunc,
  modalRef
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isInitialValue, toggleIsInitialValue] = useToggle(true);
  const [ref, isVisible, toggleIsVisible] = useOnClickOutside<HTMLDivElement>(false, modalRef);

  useEffect(() => {
    setFunc(date!.getTime(), isInitialValue);
  }, [date]);

  const dateValue = convertTimestamp(date!.getTime());

  return (
    <Wrapper>
      <span>{label}</span>
      <FilterButton
        ref={ref}
        value={dateValue}
        onClick={() => toggleIsVisible(!isVisible)}
        isDropdownVisible={isVisible}
        isCalendar
      >
        {isVisible ? (
          <StyledDatepicker>
            <StyledCloseIcon handler={toggleIsVisible} />
            <DayPicker
              mode="single"
              selected={date}
              onSelect={(day) => {
                toggleIsInitialValue(false);
                setDate(day);
              }}
              components={{
                Caption
              }}
              showOutsideDays
            />
          </StyledDatepicker>
        ) : ''}
      </FilterButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  span {
    display: flex;
    align-items: center;
    grid-gap: 4px;
    margin-bottom: 12px;
    font-size: 16px;
    color: #6C7278;
    font-weight: 500;
  }
`;

const StyledDatepicker = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  padding: 32px 48px 12px;
  border-radius: 10px;
  background-color: #fff;
  z-index: 1;
  box-shadow: 4px 4px 250px rgba(68, 68, 79, 0.4);
  transform: translateX(-50%);
  cursor: default;
  
  .rdp {
    --rdp-cell-size: 28px;
    --rdp-accent-color: var(--primary-green-color);
    --rdp-background-color: var(--primary-green-background-color);
    
    margin: 0;
  }
  
  .rdp-months {
    justify-content: center;
  }
  
  .rdp-head_cell span {
    font-size: 12px;
    color: #B9B9B9;
    font-weight: 500;
  }
  
  h2 {
    margin-bottom: 12px;
  }
`;

const StyledCloseIcon = styled(CloseIcon)`
  position: absolute;
  top: 14px;
  right: 14px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export default SingleDatepicker;
