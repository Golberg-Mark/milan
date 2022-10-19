import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Input from '@/components/Input';
import useInput from '@/hooks/useInput';
import AuthImage from '@/assets/AuthImage.png';
import checkEmail from '@/utils/checkEmail';
import useToggle from '@/hooks/useToggle';
import SuccessIcon from '@/assets/icons/SuccessIcon';

const Auth = () => {
  const [email, setEmail] = useInput();
  const [password, setPassword] = useInput();
  const [isPopupVisible, toggleIsPopupVisible] = useToggle();

  useEffect(() => {
    if (isPopupVisible) {
      const timer = setTimeout(() => {
        toggleIsPopupVisible(false);
      }, 4000);

      return () => {
        clearTimeout(timer);
      }
    }
  }, [isPopupVisible]);

  const sendData = () => {
    if (isEmailValid && password) {
      toggleIsPopupVisible(true);
    }
  };

  const isEmailValid = checkEmail(email);

  return (
    <StyledAuth>
      <Content>
        <PageTitle>
          Sign Up
        </PageTitle>
        <StyledInput
          type="email"
          value={email}
          onChange={setEmail}
          labelFontSize=".95rem"
          label="Email"
          placeholder="Enter username"
        />
        <StyledInput
          type="password"
          value={password}
          onChange={setPassword}
          labelFontSize=".9rem"
          label="Password"
          placeholder="Enter password"
        />
        <Buttons>
          <StyledLink to="#">Resend link</StyledLink>
          <Button
            disabled={!isEmailValid || !password}
            onClick={sendData}
          >
            Log In
          </Button>
        </Buttons>
      </Content>
      {/*<div>
        <img src={AuthImage} alt="Auth image"/>
      </div>*/}
      {isPopupVisible ? (
        <Popup>
          <SuccessIcon />
          Verification link was sent to your email.
        </Popup>
      ) : ''}
    </StyledAuth>
  );
};

const StyledAuth = styled.div`
  display: flex;
  align-items: center;
  padding: 40px 15px;
  min-height: inherit;
  
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
    
    & > div {
      width: 380px;
    }
  }
`;

const Content = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 420px;
`;

const PageTitle = styled.h1`
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 600;
  
  @media (min-width: 768px) {
    margin-bottom: 40px;
  }
`;

const StyledInput = styled(Input)`
  width: 100%;
  max-width: 420px;
`;

const StyledLink = styled(Link)`
  color: var(--primary-blue-color);
  
  :hover {
    color: rgba(36, 99, 235, .7);
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-gap: 20px;
`;

const Button = styled.button`
  padding: .75rem 1rem;
  width: 100%;
  max-width: 180px;
  border: none;
  border-radius: 5px;
  font-size: .9rem;
  font-weight: 600;
  color: #fff;
  background-color: rgb(36, 99, 235);
  
  :hover {
    background-color: rgba(36, 99, 235, .9);
  }
  
  :disabled {
    cursor: default;
    color: rgb(187, 187, 187);
    background-color: rgba(187, 187, 187, 0.3);
  }
`;

const Popup = styled.div`
  position: absolute;
  top: 40px;
  right: 15px;
  left: 15px;
  display: flex;
  align-items: center;
  grid-gap: 10px;
  padding: .75rem 1rem;
  width: auto;
  border: 1px solid rgba(187, 187, 187, 1);
  font-size: .9rem;
  border-radius: 10px;
  background-color: #fff;
  
  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
  
  @media (min-width: 480px) {
    top: 60px;
    right: unset;
    padding: 1rem 1.25rem;
    font-size: 1rem;
    
    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;

export default Auth;
