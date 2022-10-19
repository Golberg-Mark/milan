import React from 'react';
import styled from 'styled-components';

interface Props extends React.PropsWithChildren {
  fontSize?: number
}

const PageTitle: React.FC<Props> = ({
  fontSize = 24,
  children
}) => {
  return (
    <H1
      fontSize={fontSize}
    >
      {children}
    </H1>
  );
};

const H1 = styled.h1<{ fontSize: number }>`
  margin-bottom: 4px;
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: 600;
`;

export default PageTitle;
