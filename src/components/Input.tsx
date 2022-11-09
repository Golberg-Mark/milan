import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string,
  labelMarginBottom?: number,
  labelFontSize?: string,
  isError?: boolean
}

const Input: React.FC<Props> = ({
  label,
  labelMarginBottom = 16,
  labelFontSize = '16px',
  isError,
  ...props
}) => {
  return (
    <Label>
      {label ? (
        <LabelText fontSize={labelFontSize} marginBottom={labelMarginBottom}>
          {label}
        </LabelText>
      ) : ''}
      <StyledInput isError={isError} {...props} />
    </Label>
  );
};

const Label = styled.label`
  display: flex;
  flex-direction: column;
  color: var(--primary-grey-color);
  font-weight: 600;
`;

const LabelText = styled.span<{ fontSize: string, marginBottom: number }>`
  margin-bottom: ${({ marginBottom }) => marginBottom}px;
  font-size: ${({ fontSize }) => fontSize};
  font-weight: 500;
`;

const StyledInput = styled.input<{ isError?: boolean }>`
  margin-bottom: 1.25rem;
  padding: 13px 16px;
  height: 38px;
  border: 1px solid ${({ isError }) => isError ? '#ff3333' : 'rgba(35, 35, 35, 0.16)'};
  border-radius: 4px;
  font-size: 12px;
  background-color: #fff;

  :focus {
    outline: 2px solid var(--primary-blue-color);
  }
`;

export default Input;
