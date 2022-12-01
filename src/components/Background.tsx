import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

import { HandleToggle } from '@/hooks/useToggle';

interface Props extends PropsWithChildren {
  close: HandleToggle
}

const Background: React.FC<Props> = ({ close, children }) => {
  return (
    <StyledBackground onClick={close}>
      {children}
    </StyledBackground>
  );
};

const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(26, 28, 30, 0.5);
  cursor: pointer;
  z-index: 1003;
`;

export default Background;
