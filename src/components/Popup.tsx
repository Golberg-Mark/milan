import React from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';

import CloseIcon from '@/assets/icons/CloseIcon';
import SuccessIcon from '@/assets/icons/SuccessIcon';
import { PopupTypes } from '@/store/reducers/user';
import { userActions } from '@/store/actions/userActions';
import ErrorIcon from '@/assets/icons/ErrorIcon';

interface Props {
  type: PopupTypes,
  mainText: string,
  additionalText: string
}

const Popup: React.FC<Props> = ({ type, mainText, additionalText }) => {
  const dispatch = useDispatch<any>();

  const getIcon = () => {
    switch (type) {
      case PopupTypes.SUCCESS: return <StyledSuccessIcon />;
      case PopupTypes.ERROR: return <StyledErrorIcon />;
      default: return <StyledSuccessIcon />;
    }
  }

  return (
    <Div type={type} onClick={(evt) => evt.stopPropagation()}>
      {getIcon()}
      <TextContent>
        <Header>
          <MainText>{mainText}</MainText>
          <CloseIcon onClick={() => dispatch(userActions.setPopup(null))} />
        </Header>
        <AdditionalText>{additionalText}</AdditionalText>
      </TextContent>
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
  z-index: 10000;
  
  ${({ type }) => {
    if (type === PopupTypes.SUCCESS) {
      return css`
        border-left: 3px solid var(--primary-green-color);
        background-color: #ECF8F0;
        
        * {
          color: var(--primary-green-color);
        }
      `;
    }
    if (type === PopupTypes.ERROR) {
      return css`
        border-left: 3px solid var(--primary-red-color);
        background-color: #F8ECEC;

        * {
          color: var(--primary-red-color);
        }
      `;
    }
  }}
`;

const TextContent = styled.div`
  width: 100%;
`;

const StyledSuccessIcon = styled(SuccessIcon)`
  min-width: 28px;
  min-height: 28px;
`;

const StyledErrorIcon = styled(ErrorIcon)`
  min-width: 28px;
  min-height: 28px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-gap: 16px;
  width: 100%;
  
  svg {
    min-width: 18px;
    min-height: 18px;
    max-width: 18px;
    max-height: 18px;
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
`;

const AdditionalText = styled.p`
  padding-right: 34px;
  font-size: 12px;
`;

export default Popup;
