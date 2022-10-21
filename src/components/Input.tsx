import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string,
  labelFontSize?: string,
  isError?: boolean
}

const Input: React.FC<Props> = ({ label, labelFontSize = '1.125rem', isError, ...props }) => {
  return (
    <Label>
      <LabelText fontSize={labelFontSize}>
        {label}
      </LabelText>
      <StyledInput isError={isError} {...props} />
    </Label>
  );
};

const Label = styled.label`
  display: flex;
  flex-direction: column;
  grid-gap: 2px;
  color: var(--primary-grey-color);
  font-weight: 600;
`;

const LabelText = styled.span<{ fontSize: string }>`
  font-size: ${({ fontSize }) => fontSize};
`;

const StyledInput = styled.input<{ isError?: boolean }>`
  margin-bottom: 1.25rem;
  padding: .5rem .75rem;
  border: 1px solid ${({ isError }) => isError ? '#ff3333' : 'rgba(156, 163, 175, .6)'};
  border-radius: 5px;
  line-height: 1.5rem;
  background-color: rgba(249, 250, 251, .8);
  
  :focus {
    outline: 2px solid var(--primary-blue-color);
  }
`;

export default Input;
