import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Logo from '@/assets/logo.png';
import PageTitle from '@/components/PageTitle';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { getResetLinkAction } from '@/store/actions/userActions';
import useToggle from '@/hooks/useToggle';
import Loader from '@/components/Loader';
import useInput from '@/hooks/useInput';
import checkEmail from '@/utils/checkEmail';
import Input from '@/components/Input';
import useIsFirstRender from '@/hooks/useIsFirstRender';
import Popup, { PopupTypes } from '@/components/Popup';

const GetResetLink = () => {
  const [email, setEmail] = useInput();
  const [isEmailChanged, toggleIsEmailChanged] = useToggle();
  const [isLoading, toggleIsLoading] = useToggle();
  const [isPopupVisible, toggleIsPopupVisible] = useToggle(false);
  const isFirstRender = useIsFirstRender();

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isFirstRender) toggleIsEmailChanged(true);
  }, [email]);

  const submit = async () => {
    if (isEmailCorrect) {
      try {
        toggleIsLoading(true);
        await dispatch(getResetLinkAction(email));
        toggleIsLoading(false);
        toggleIsPopupVisible(true);
        setTimeout(() => {
          toggleIsPopupVisible(false);
        }, 10000);
      } catch (e) {
        toggleIsLoading(false);
      }
    }
  }

  const isEmailCorrect = checkEmail(email);

  return (
    <Page>
      <Content>
        <ContentText>
          <LogoWrapper>
            <img src={Logo} alt="Alts logo" />
          </LogoWrapper>
          <PageTitle
            fontSize={56}
            marginBottom="0"
            textAlign="center"
          >
            Forgot Password
          </PageTitle>
          <Description>
            Input your email address account to receive a reset link
          </Description>
        </ContentText>
        <Form>
          <FormTitle>Input your email first</FormTitle>
          <Input
            label="Email"
            labelMarginBottom={12}
            value={email}
            onChange={setEmail}
            placeholder="Input your email address"
            inputMarginBottom="32px"
            isError={!isEmailCorrect && isEmailChanged}
          />
          <Buttons>
            <Button
              isCancel
              onClick={() => navigate('/sign-in')}
              style={{ height: '50px' }}
            >
              Cancel
            </Button>
            <Button
              onClick={submit}
              disabled={!isEmailCorrect}
              style={{ height: '50px' }}
            >
              {isLoading ? <Loader size={24} thickness={2} color="#fff" /> : 'Continue'}
            </Button>
          </Buttons>
        </Form>
      </Content>
      <Footer />
      {isPopupVisible ? (
        <Popup
          type={PopupTypes.SUCCESS}
          mainText="Email was sent"
          additionalText="Please check your and create new password"
          close={toggleIsPopupVisible}
        />
      ) : ''}
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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 50px;
`;

const ContentText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 24px;
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

const Description = styled.p`
  font-size: 24px;
`;

const Form = styled.div`
  padding: 32px;
  width: 100%;
  max-width: 480px;
  border-radius: 16px;
  background-color: #fff;
`;

const FormTitle = styled.h4`
  margin-bottom: 32px;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`;

const Buttons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`;

export default GetResetLink;
