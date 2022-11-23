import React from 'react';
import styled from 'styled-components';
import { CaptionProps, useNavigation } from 'react-day-picker';
import { format } from 'date-fns';

const Caption: React.FC<CaptionProps> = ({ displayMonth }) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();

  return (
    <H2>
      <NavButton
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
      >
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.0002 3.22027L5.65355 7.56694C5.14022 8.08027 5.14022 8.92027 5.65355 9.43361L10.0002 13.7803" stroke="#6C7278" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Previous
      </NavButton>
      {format(displayMonth, 'MMM yyy')}
      <NavButton
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
      >
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.93994 13.7797L10.2866 9.43306C10.7999 8.91973 10.7999 8.07973 10.2866 7.56639L5.93994 3.21973" stroke="#6C7278" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Next
      </NavButton>
    </H2>
  );
};

const H2 = styled.h2`
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-gap: 4px;
  margin-bottom: 24px;
  font-size: 14px;
  font-weight: 500;
`;

const NavButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: none;
  width: 16px;
  height: 16px;
  font-size: 0;
  background-color: transparent;
  
  svg {
    width: 100%;
    height: 100%;
    
    :hover * {
      stroke: var(--primary-green-color);
    }
  }
`;

export default Caption;
