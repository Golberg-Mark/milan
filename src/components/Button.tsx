import React, { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isCancel?: boolean
}

const Button: React.FC<Props> = ({ isCancel = false, children, ...props }) => {
  return (
    <StyledButton isCancel={isCancel} {...props}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ isCancel: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 22px;
  height: 38px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  background-color: var(--primary-green-color);
  
  :disabled {
    background-color: rgba(39, 163, 118, 0.6);
    cursor: default;
  }
  
  :not(:disabled):hover {
    background-color: var(--primary-green-hover-color);
  }
  
  ${({ isCancel }) => isCancel ? css`
    color: var(--primary-dark-color);
    background-color: #EDF1F3;

    :not(:disabled):hover {
      background-color: rgba(189, 193, 195, 0.6);
    }
  ` : ''}
`;

export default Button;
