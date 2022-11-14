import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {

}

const Button: React.FC<Props> = ({ children, ...props }) => {
  return (
    <StyledButton {...props}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  padding: 13px 22px;
  height: 38px;
  border: none;
  border-radius: 5px;
  font-size: 12px;
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
`;

export default Button;
