import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DayPicker, SelectSingleEventHandler } from 'react-day-picker';

import { hoursList, minutesList, tod, getCurrentTime } from '@/utils/times';
import FilterButton from '@/components/Table/FilterButton';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import Select from '@/components/Select';
import Caption from '@/components/Datepicker/Caption';
import CloseIcon from '@/assets/icons/CloseIcon';

interface Props {
  label: string,
  setFunc: Function,
  modalRef: HTMLDivElement,
  isEnd?: boolean
}

const { hours, minutes, timesOfDay: initialTimesOfDay } = getCurrentTime();

const DatepickerWithTime: React.FC<Props> = ({ label, setFunc, modalRef, isEnd = false }) => {
  const [hour, setHour] = useState(isEnd
    ? +hours === 12 ? 0 : +hours
    : +hours - 1);
  const [minute, setMinute] = useState(+minutes);
  const [timesOfDay, setTimesOfDay] = useState(initialTimesOfDay);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [ref, isVisible, toggleIsVisible] = useOnClickOutside<HTMLDivElement>(false, modalRef);
  const [pickerModalRef, setPickerModalRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const h = hoursList[hour];
    const m = minute;
    const t = tod[timesOfDay];
    const newDate = new Date(`${h}:${m} ${t} ${date!.getMonth() + 1}/${date!.getDate()}/${date!.getFullYear()}`);
    setDate(newDate);
    setFunc(newDate.getTime());
  }, [hour, minute, timesOfDay]);

  let day = String(date!.getDate());
  let month = String(date!.getMonth() + 1);
  day = +day < 10 ? `0${day}` : day;
  month = +month < 10 ? `0${month}` : month;
  const dateValue = `${hoursList[hour]}:${minutesList[minute]} ${tod[timesOfDay]} - 
    ${day}/${month}/${date!.getFullYear()}`;

  const setDateWithTime: SelectSingleEventHandler = (d) => {
    if (d) {
      const h = hoursList[hour];
      const m = minute;
      const t = tod[timesOfDay];
      const newDate = new Date(`${h}:${m} ${t} ${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`);
      setDate(newDate);
      setFunc(newDate.getTime());
    }
  };

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
          <StyledDatepicker
            ref={(ref) => setPickerModalRef(ref)}
            onClick={(evt) => evt.stopPropagation()}
          >
            <StyledCloseIcon handler={toggleIsVisible} />
            {pickerModalRef ? (
              <TimeSelector>
                <label>
                  <Select
                    selectedItem={hour}
                    setSelectedItem={setHour}
                    items={hoursList}
                    modalRef={pickerModalRef}
                  />
                </label>
                <label>
                  <Select
                    selectedItem={minute}
                    setSelectedItem={setMinute}
                    items={minutesList}
                    modalRef={pickerModalRef}
                  />
                </label>
                <label>
                  <Select
                    selectedItem={timesOfDay}
                    setSelectedItem={setTimesOfDay}
                    items={tod}
                    modalRef={pickerModalRef}
                  />
                </label>
              </TimeSelector>
            ) : ''}
            <DayPicker
              mode="single"
              selected={date}
              onSelect={setDateWithTime}
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

const TimeSelector = styled.div`
  display: flex;
  grid-gap: 10px;
  margin-bottom: 12px;
  
  button {
    padding: 0 10px;
    height: 24px;
  }
`;

export default DatepickerWithTime;
