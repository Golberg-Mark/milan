import React from 'react';
import styled from 'styled-components';
import SuccessIcon from '@/assets/icons/SuccessIcon';
import CrossErrorIcon from '@/assets/icons/CrossErrorIcon';

export interface IPasswordValidation {
  eightCharacters: boolean,
  upperCaseLetter: boolean,
  lowerCaseLetter: boolean,
  oneDigit: boolean
}

interface Props {
  validationConfig: IPasswordValidation
}

const PasswordValidation: React.FC<Props> = ({ validationConfig }) => {
  return (
    <List>
      <ListItem isValid={validationConfig.eightCharacters}>
        {validationConfig.eightCharacters ? <SuccessIcon /> : <CrossErrorIcon />}
        At least 8 characters
      </ListItem>
      <ListItem isValid={validationConfig.oneDigit}>
        {validationConfig.oneDigit ? <SuccessIcon /> : <CrossErrorIcon />}
        At least a number (0-9)
      </ListItem>
      <ListItem isValid={validationConfig.upperCaseLetter}>
        {validationConfig.upperCaseLetter ? <SuccessIcon /> : <CrossErrorIcon />}
        At least an uppercase letter (A-Z)
      </ListItem>
      <ListItem isValid={validationConfig.lowerCaseLetter}>
        {validationConfig.lowerCaseLetter ? <SuccessIcon /> : <CrossErrorIcon />}
        At least a lowercase letter (a-z)
      </ListItem>
    </List>
  );
};

const List = styled.ul`
  display: flex;
  flex-direction: column;
  grid-gap: 14px;
  margin-bottom: 32px;
`;

const ListItem = styled.li<{ isValid: boolean }>`
  display: flex;
  align-items: center;
  grid-gap: 13px;
  color: ${({ isValid }) => isValid ? 'var(--primary-green-color)' : 'var(--primary-red-color)'};
  font-weight: 500;
`;

export default PasswordValidation;
