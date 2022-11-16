import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

import EmptyCheckbox from '@/assets/icons/EmptyCheckbox.svg';
import SelectedCheckbox from '@/assets/icons/SelectedCheckbox.svg';

interface Props extends InputHTMLAttributes<HTMLInputElement> {

}

const Checkbox: React.FC<Props> = ({ ...props }) => {
  return (
    <Label
      isChecked={!!props.checked}
      isDisabled={!!props.disabled}
      onClick={(evt) => evt.stopPropagation()}
    >
      <StyledCheckbox {...props} />
    </Label>
  );
};

const Label = styled.label<{ isChecked: boolean, isDisabled: boolean }>`
  display: block;
  width: 18px;
  height: 18px;
  cursor: ${({ isDisabled }) => isDisabled ? 'default' : 'pointer'};
  background-image: url("${({ isChecked }) => isChecked ? SelectedCheckbox : EmptyCheckbox}");
`;

const StyledCheckbox = styled.input`
  display: none;
`;

export default Checkbox;
