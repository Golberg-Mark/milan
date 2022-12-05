import React from 'react';
import styled, { css } from 'styled-components';
import { HandleToggle } from '@/hooks/useToggle';
import CloseIcon from '@/assets/icons/CloseIcon';
import SuccessIcon from '@/assets/icons/SuccessIcon';

export enum PopupTypes {
  SUCCESS = 'success',
  ERROR = 'error'
}

interface Props {
  type: PopupTypes,
  mainText: string,
  additionalText: string,
  close: HandleToggle
}

const Popup: React.FC<Props> = ({ type, mainText, additionalText, close }) => {
  return (
    <Div type={type}>
      <StyledSuccessIcon />
      <div>
        <Header>
          <MainText>{mainText}</MainText>
          <CloseIcon handler={close} />
        </Header>
        <AdditionalText>{additionalText}</AdditionalText>
      </div>
    </Div>
  );
};

const Div = styled.div<{ type: PopupTypes }>`
  position: fixed;
  top: calc(var(--search-height) + 16px);
  right: 16px;
  display: flex;
  align-items: center;
  grid-gap: 18px;
  padding: 12px 12px 12px 18px;
  width: 100%;
  max-width: 330px;
  border-radius: 4px;
  
  ${({ type }) => {
    if (type === PopupTypes.SUCCESS) {
      return css`
        border-left: 3px solid var(--primary-green-color);
        background-color: #ECF8F0;
      `;
    }
    if (type === PopupTypes.ERROR) {
      return css`
        border-left: 3px solid var(--primary-red-color);
        background-color: var(--primary-red-background-color);
      `;
    }
  }}
`;

const StyledSuccessIcon = styled(SuccessIcon)`
  width: 28px;
  height: 28px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-gap: 16px;
  width: 100%;
  
  svg {
    width: 18px;
    height: 18px;
    cursor: pointer;
    
    * {
      stroke: rgba(0, 0, 0, .54);
    }
  }
`;

const MainText = styled.p`
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 600;
  color: var(--primary-green-color);
`;

const AdditionalText = styled.p`
  padding-right: 34px;
  font-size: 12px;
  color: var(--primary-green-color);
`;

export default Popup;
