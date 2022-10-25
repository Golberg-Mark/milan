import React from 'react';
import styled from 'styled-components';

interface Props extends React.PropsWithChildren {
  fontSize?: number,
  marginBottom?: string
}

const PageTitle: React.FC<Props> = ({
  fontSize = 24,
  marginBottom = '.25rem',
  children
}) => {
  return (
    <H1
      fontSize={fontSize}
      marginBottom={marginBottom}
    >
      {children}
    </H1>
  );
};

const H1 = styled.h1<{ fontSize: number, marginBottom: string }>`
  margin-bottom: ${({ marginBottom }) => marginBottom};
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: 600;
`;

export default PageTitle;
