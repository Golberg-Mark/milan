import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
`;

interface Props {
  size?: number,
  color?: string
}

const CircleSpinner: React.FC<Props> = ({ size = 40, color = 'rgb(36, 99, 235)' }) => {
  return (
    <PageWrapper>
      <Wrapper size={size} color={color} />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: inherit;
`;

const Wrapper = styled.div<{ size: number, color: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${props => `${props.size}px`};
    height: ${props => `${props.size}px`};
    border: ${props => `4px solid ${props.color}`};
    border-right-color: transparent;
    border-radius: 50%;
    animation: ${rotate} 0.75s linear infinite;
`;

export default CircleSpinner;
