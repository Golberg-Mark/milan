import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

const PageContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Page>
      <Content>
        {children}
      </Content>
    </Page>
  );
};

const Page = styled.section`
  display: flex;
  flex-flow: column;
  min-height: calc(100vh - var(--search-height));
  padding: 32px;
`;

const Content = styled.div`
  display: flex;
  flex-flow: column;
  flex-grow: 1;
  min-height: 729px;
  padding: 32px;
  border-radius: 12px;
  background-color: #fff;
  overflow-x: hidden;
`;

export default PageContainer;
