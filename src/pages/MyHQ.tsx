import React from 'react';

import PageTitle from '@/components/PageTitle';
import styled from 'styled-components';

const MyHQ = () => {
  return (
    <StyledMyHQ>
      <PageTitle>My HQ</PageTitle>
    </StyledMyHQ>
  );
};

const StyledMyHQ = styled.div`
  padding: 24px 16px;
  
  @media (min-width: 768px) {
    padding: 24px 32px;
  }
`;

export default MyHQ;
