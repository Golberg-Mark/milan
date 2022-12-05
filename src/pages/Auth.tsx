import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import Input from '@/components/Input';
import useInput from '@/hooks/useInput';
import checkEmail from '@/utils/checkEmail';
import useToggle from '@/hooks/useToggle';
import Button from '@/components/Button';
import useIsFirstRender from '@/hooks/useIsFirstRender';
import { loginAction } from '@/store/actions/userActions';
import Loader from '@/components/Loader';
import Logo from '@/assets/logo.png';

const Auth = () => {
  const [email, setEmail] = useInput();
  const [isEmailChanged, toggleIsEmailChanged] = useToggle();
  const [password, setPassword] = useInput();
  const [isPasswordChanged, toggleIsPasswordChanged] = useToggle();
  const [isLoading, toggleIsLoading] = useToggle();
  const [rememberMe, toggleRememberMe] = useToggle();
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
    if (email && password && !isEmailError && !isPasswordError) {
      try {
        toggleIsLoading(true);
        await dispatch(loginAction(email, password, rememberMe));
        navigate('/dashboard');
      } finally {
        toggleIsLoading(false);
      }
    }
  };

  const isEmailError = isEmailChanged && !checkEmail(email);
  const isPasswordError = isPasswordChanged && password.length < 8;

  return (
    <StyledAuth>
      <LeftSide>
        <LeftSideTextBlock>
          <LogoImage src={Logo} alt="Alts logo" />
          <Title>Let’s empower your document product today.</Title>
          <p>We help to complete all your conveyancing needs easily</p>
        </LeftSideTextBlock>
      </LeftSide>
      <SideWrapper>
        <AuthWrapper>
          <PageTitle>
            Login to your account
          </PageTitle>
          <StyledInput
            type="email"
            value={email}
            onChange={setEmail}
            label="Email"
            labelMarginBottom={12}
            placeholder="Enter username"
          />
          <StyledInput
            type="password"
            value={password}
            onChange={setPassword}
            label="Password"
            labelMarginBottom={12}
            placeholder="Enter password"
          />
          <Additional>
            <CheckboxLabel onClick={toggleRememberMe}>
              {rememberMe ? (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.25 2.25H3.75C2.9175 2.25 2.25 2.925 2.25 3.75V14.25C2.25 15.075 2.9175 15.75 3.75 15.75H14.25C15.0825 15.75 15.75 15.075 15.75 14.25V3.75C15.75 2.925 15.0825 2.25 14.25 2.25ZM7.5 12.75L3.75 9L4.8075 7.9425L7.5 10.6275L13.1925 4.935L14.25 6L7.5 12.75Z" fill="#27A376"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.25 2.25H3.75C2.9175 2.25 2.25 2.925 2.25 3.75V14.25C2.25 15.075 2.9175 15.75 3.75 15.75H14.25C15.0825 15.75 15.75 15.075 15.75 14.25V3.75C15.75 2.925 15.0825 2.25 14.25 2.25ZM7.5 1" stroke="#27A376"/>
                </svg>
              )}
              Remember me
            </CheckboxLabel>
            <StyledLink to="/forgot-password">Forgot Password</StyledLink>
          </Additional>
          <StyledButton
            disabled={isEmailError || isPasswordError || !isEmailChanged || !isPasswordChanged}
            onClick={sendData}
          >
            {isLoading ? <Loader size={24} thickness={2} color="#fff" /> : 'Login'}
          </StyledButton>
          <ToRegistration>
            Don’t have an account?
            <Link to="/sign-up"> Register Here</Link>
          </ToRegistration>
        </AuthWrapper>
      </SideWrapper>
    </StyledAuth>
  );
};

const StyledAuth = styled.div`
  display: grid;
  grid-template-columns: calc(50% + 30px) auto;
  min-height: inherit;
`;

const SideWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const LeftSide = styled(SideWrapper)`
  padding: 20px;
  background-color: var(--primary-dark-color);
  
  * {
    color: #fff;
  }
`;

const LeftSideTextBlock = styled.div`
  width: 100%;
  max-width: 550px;
  
  p {
    font-size: 24px;
  }
`;

const LogoImage = styled.img`
  margin-bottom: 48px;
  width: 187px;
`;

const Title = styled.h1`
  margin-bottom: 48px;
  font-size: 56px;
  line-height: 130%;
`;

const AuthWrapper = styled.div`
  padding: 32px;
  width: 100%;
  max-width: 480px;
  border-radius: 16px;
  background-color: #fff;
`;

const PageTitle = styled.h1`
  margin-bottom: 32px;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`;

const StyledInput = styled(Input)`
  width: 100%;
  max-width: 420px;
  
  span {
    color: #fff;
  }
`;

const Additional = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 34px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  grid-gap: 8px;
  font-size: 14px;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  font-size: 14px;
  font-weight: 600;
  color: var(--primary-green-color);
  transition: .1s ease-in-out;
  
  :hover {
    color: var(--primary-green-hover-color);
  }
`;

const StyledButton = styled(Button)`
  margin-bottom: 32px;
  width: 100%;
`;

const ToRegistration = styled.p`
  color: #6C7278;
  font-weight: 500;
  text-align: center;
  
  a {
    color: var(--primary-green-color);
    font-weight: 500;
    transition: .1s ease-in-out;
    
    :hover {
      color: var(--primary-green-hover-color);
    }
  }
`;

export default Auth;
