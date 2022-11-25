import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface Props extends PropsWithChildren {
  contentPadding?: string
}

const PageContainer: React.FC<Props> = ({ contentPadding = '32px', children }) => {
  return (
    <Page>
      <Content padding={contentPadding}>
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

const Content = styled.div<{ padding: string }>`
  display: flex;
  flex-flow: column;
  flex-grow: 1;
  min-height: 729px;
  padding: ${({ padding }) => padding};
  border-radius: 12px;
  background-color: #fff;
  overflow-x: hidden;
`;

export default PageContainer;
