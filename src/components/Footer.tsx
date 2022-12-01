import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <StyledFooter>
      <Copyright>{`© ${new Date().getFullYear()} ALTS CORP. All rights reserved.`}</Copyright>
      <StyledLink to="/t-c">Terms & Conditions</StyledLink>
      <StyledLink to="/terms-of-use">Terms Of Use</StyledLink>
      <StyledLink to="/privacy">Privacy Policy</StyledLink>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 10px;
`;

const Copyright = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #6C7278;
`;

const StyledLink = styled(Link)`
  font-size: 14px;
  font-weight: 500;
  transition: .1s ease-in-out;
  
  :hover {
    color: var(--primary-green-color);
  }
`;

export default Footer;
