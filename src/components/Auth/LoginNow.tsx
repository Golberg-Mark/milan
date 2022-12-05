import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Logo from '@/assets/logo.png';
import PageTitle from '@/components/PageTitle';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { validateOtpAction } from '@/store/actions/userActions';
import useToggle from '@/hooks/useToggle';
import Loader from '@/components/Loader';

const LoginNow = () => {
  const [isLoading, toggleIsLoading] = useToggle();

  const location = useLocation().pathname.split('/');
  const otp = location.length > 2 ? location[2] : null;
  const email = location.length > 2 ? window.atob(location[3]) : null;

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const validate = async () => {
    if (otp && email) {
      try {
        toggleIsLoading(true);
        await dispatch(validateOtpAction(email, otp));
        toggleIsLoading(false);
        navigate('/dashboard');
      } catch (e) {
        toggleIsLoading(false);
      }
    }
  }

  return (
    <Page>
      <LogoWrapper>
        <img src={Logo} alt="Alts logo" />
      </LogoWrapper>
      <Content>
        <CheckmarkContainer>
          <CheckmarkWrapper>
            <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.75 20.2125L6.53751 15L4.76251 16.7625L11.75 23.7501L26.75 8.75005L24.9875 6.98755L11.75 20.2125Z" fill="#27A376"/>
            </svg>
          </CheckmarkWrapper>
        </CheckmarkContainer>
        <PageTitle
          fontSize={56}
          marginBottom="0"
          textAlign="center"
        >
          {otp && email ? "Account successfully Verify" : "Account registered successfully"}
        </PageTitle>
        <Description>
          {otp && email
            ? "Let’s login to our system, and enjoy the experience"
            : "Please check your email, to verify your account"
          }
        </Description>
        {otp && email ? (
          <Button
            onClick={validate}
            style={{ width: '100%', maxWidth: '300px', height: '50px' }}
          >
            {isLoading ? <Loader size={24} thickness={2} color="#fff" /> : 'Login Now'}
          </Button>
        ) : ''}
      </Content>
      <Footer />
    </Page>
  );
};

const Page = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
  justify-content: space-between;
  align-items: center;
  padding: 60px 60px 30px;
  min-height: 100vh;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 227px;
  background-color: var(--primary-dark-color);
  border-radius: 100px;
  
  img {
    width: 160px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 50px;
`;

const CheckmarkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--primary-green-color);
`;

const CheckmarkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #fff;
`;

const Description = styled.p`
  font-size: 24px;
`;

export default LoginNow;
