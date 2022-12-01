import React, { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isCancel?: boolean,
  isRedButton?: boolean
}

const Button: React.FC<Props> = ({
  isCancel = false,
  isRedButton = false,
  children,
  ...props
}) => {
  return (
    <StyledButton isCancel={isCancel} isRedButton={isRedButton} {...props}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ isCancel: boolean, isRedButton?: boolean }>`
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
  
  ${({ isCancel, isRedButton }) => {
    if (isCancel) return css`
      color: var(--primary-dark-color);
      background-color: #EDF1F3;

      :not(:disabled):hover {
        background-color: rgba(189, 193, 195, 0.6);
      }
    `;
    if (isRedButton) return css`
      background-color: var(--primary-red-color);

      :not(:disabled):hover {
        background-color: var(--primary-red-hover-color);
      }
    `;
  }}
`;

export default Button;
