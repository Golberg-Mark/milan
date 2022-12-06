import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { selectActiveNotices } from '@/store/selectors/noticesSelector';
import CloseIcon from '@/assets/icons/CloseIcon';
import { noticesActions } from '@/store/actions/noticesActions';
import InfoIcon from '@/assets/icons/InfoIcon';

const Notice = () => {
  const notices = useSelector(selectActiveNotices);

  const dispatch = useDispatch<any>();

  return notices ? (
    <Wrapper>
      <Div>
        <Content isCentered={ notices.length === 1 }>
          <InfoIcon />
          <Info>
            {notices.map((el) => (
              <P key={el.id}>
                {el.message}
              </P>
            ))}
          </Info>
        </Content>
        <StyledCloseIcon onClick={() => dispatch(noticesActions.setActiveNotices(null))}/>
      </Div>
    </Wrapper>
  ) : <></>;
};

const Wrapper = styled.div`
  padding: 32px 32px 0;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  grid-gap: 16px;
  padding: 10px;
  border: 1px solid var(--primary-yellow-color);
  border-radius: 10px;
  background-color: var(--primary-yellow-background-color);
`;

const Content = styled.div<{ isCentered: boolean }>`
  display: flex;
  align-items: ${({ isCentered }) => isCentered ? 'center' : 'flex-start'};
  grid-gap: 10px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 12px;
`;

const P = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: var(--primary-yellow-dark-color);
`;

const StyledCloseIcon = styled(CloseIcon)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  
  * {
    stroke: #ACB5BB;
  }
`;

export default Notice;
