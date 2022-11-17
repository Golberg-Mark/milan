import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import Input from '@/components/Input';
import useInput from '@/hooks/useInput';
import AuthImage from '@/assets/AuthImage.png';
import checkEmail from '@/utils/checkEmail';
import useToggle from '@/hooks/useToggle';
import Button from '@/components/Button';
import useIsFirstRender from '@/hooks/useIsFirstRender';
import { loginAction } from '@/store/actions/userActions';
import Loader from '@/components/Loader';

const Auth = () => {
  const [email, setEmail] = useInput();
  const [isEmailChanged, toggleIsEmailChanged] = useToggle();
  const [password, setPassword] = useInput();
  const [isPasswordChanged, toggleIsPasswordChanged] = useToggle();
  const [isLoading, toggleIsLoading] = useToggle();
  const isFirstRender = useIsFirstRender();

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isFirstRender) toggleIsEmailChanged(true);
  }, [email]);

  useEffect(() => {
    if (!isFirstRender) toggleIsPasswordChanged(true);
  }, [password]);

  const sendData = async () => {
    if (!isEmailError && !isPasswordError) {
      try {
        toggleIsLoading(true);
        await dispatch(loginAction(email, password, () => navigate('/dashboard')));
      } finally {
        toggleIsLoading(false);
      }
    }
  };

  const isEmailError = isEmailChanged && !checkEmail(email);
  const isPasswordError = isPasswordChanged && password.length < 8;

  return (
    <StyledAuth>
      <Content>
        <PageTitle>
          Sign In
        </PageTitle>
        <StyledInput
          type="email"
          value={email}
          onChange={setEmail}
          labelFontSize=".95rem"
          label="Email"
          placeholder="Enter username"
          isError={isEmailError}
        />
        <StyledInput
          type="password"
          value={password}
          onChange={setPassword}
          labelFontSize=".9rem"
          label="Password"
          placeholder="Enter password"
          isError={isPasswordError}
        />
        <Buttons>
          <StyledLink to="#">Forgot Password</StyledLink>
          <Button
            disabled={isEmailError || isPasswordError || !isEmailChanged || !isPasswordChanged}
            onClick={sendData}
          >
            {isLoading ? <Loader size={24} thickness={2} color="#fff" /> : 'Log In'}
          </Button>
        </Buttons>
      </Content>
      <div>
        <img src={AuthImage} alt="Auth image"/>
      </div>
    </StyledAuth>
  );
};

const StyledAuth = styled.div`
  display: flex;
  align-items: center;
  padding: 40px 15px;
  min-height: inherit;
  background-color: #fff;
  
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

const StyledInput = styled(Input)<{ isError: boolean }>`
  width: 100%;
  max-width: 420px;
  
  ${({ isError }) => isError ? 'border: 1px solid #DD5757' : ''}
`;

const StyledLink = styled(Link)`
  font-size: 14px;
  color: var(--primary-dark-color);
  transition: .1s ease-in-out;
  
  :hover {
    color: var(--primary-green-hover-color);
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-gap: 20px;
`;

export default Auth;
