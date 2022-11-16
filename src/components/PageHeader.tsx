import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RiArrowRightSLine } from 'react-icons/all';

import { selectUser } from '@/store/selectors/userSelectors';
import { logoutAction } from '@/store/actions/userActions';

import useInput from '@/hooks/useInput';
import getRegionsData from '@/utils/getRegionsData';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import getUserAvatar from '@/utils/getUserAvatar';

const mockedData = getRegionsData();

const PageHeader = () => {
  const [search, setSearch] = useInput();
  const [searchResults, setSearchResults] = useState<[string, string][]>([]);
  const [resultsRef, isResultsVisible, toggleIsResultsVisible] = useOnClickOutside<HTMLUListElement>();
  const [settingsRef, isSettingsVisible, toggleIsSettingsVisible] = useOnClickOutside<HTMLDivElement>();
  const user = useSelector(selectUser);

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  useEffect(() => {
    if (search) {
      const results: [string, string][] = [];

      mockedData.forEach((region) => {
        const regexp = new RegExp(`.*${search.toLowerCase()}.*`);

        if (regexp.test(region.region.toLowerCase())) {
          region.services.forEach((service) => {
            results.push([region.region, service.name]);
          });
        } else {
          region.services.forEach((service) => {
            if (regexp.test(service.name.toLowerCase())) {
              results.push([region.region, service.name]);
            }
          });
        }
      });

      setSearchResults(results);
      toggleIsResultsVisible(true);
    } else setSearchResults([]);
  }, [search]);

  const goToOrder = (data: [string, string]) => {
    navigate('/orders/add', {
      state: {
        region: data[0],
        service: data[1]
      }
    });
    setSearch('');
    setSearchResults([]);
    toggleIsResultsVisible(false);
  };

  return (
  <>
    <StyledPageHeader>
      <Search>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.625 15.75C12.56 15.75 15.75 12.56 15.75 8.625C15.75 4.68997 12.56 1.5 8.625 1.5C4.68997 1.5 1.5 4.68997 1.5 8.625C1.5 12.56 4.68997 15.75 8.625 15.75Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16.5 16.5L15 15" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <Input
          type="text"
          placeholder="Search"
          value={search}
          onChange={setSearch}
        />
      </Search>
      <Settings>
        <Notices>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.01169 11.9758C5.65253 11.9758 4.29336 11.76 3.00419 11.3283C2.51419 11.1591 2.14086 10.815 1.97753 10.3658C1.80836 9.91664 1.86669 9.42081 2.13503 8.97748L2.80586 7.86331C2.94586 7.62997 3.07419 7.16331 3.07419 6.88914V5.20331C3.07419 3.03331 4.84169 1.26581 7.01169 1.26581C9.18169 1.26581 10.9492 3.03331 10.9492 5.20331V6.88914C10.9492 7.15748 11.0775 7.62997 11.2175 7.86914L11.8825 8.97748C12.1334 9.39748 12.18 9.90498 12.0109 10.3658C11.8417 10.8266 11.4742 11.1766 11.0134 11.3283C9.73002 11.76 8.37086 11.9758 7.01169 11.9758ZM7.01169 2.14081C5.32586 2.14081 3.94919 3.51164 3.94919 5.20331V6.88914C3.94919 7.31498 3.77419 7.94498 3.55836 8.31248L2.88753 9.42664C2.75919 9.64248 2.72419 9.86998 2.80003 10.0625C2.87003 10.2608 3.04503 10.4125 3.28419 10.4941C5.72253 11.3108 8.30669 11.3108 10.745 10.4941C10.955 10.4241 11.1184 10.2666 11.1942 10.0566C11.27 9.84664 11.2525 9.61914 11.1359 9.42664L10.465 8.31248C10.2434 7.93331 10.0742 7.30914 10.0742 6.88331V5.20331C10.0742 3.51164 8.70336 2.14081 7.01169 2.14081Z" fill="#292D32"/>
            <path d="M8.09669 2.29835C8.05586 2.29835 8.01503 2.29252 7.97419 2.28085C7.80503 2.23419 7.64169 2.19919 7.48419 2.17585C6.98836 2.11169 6.51003 2.14669 6.06086 2.28085C5.89753 2.33335 5.72253 2.28085 5.61169 2.15835C5.50086 2.03585 5.46586 1.86085 5.53003 1.70335C5.76919 1.09085 6.35253 0.688354 7.01753 0.688354C7.68253 0.688354 8.26586 1.08502 8.50503 1.70335C8.56336 1.86085 8.53419 2.03585 8.42336 2.15835C8.33586 2.25169 8.21336 2.29835 8.09669 2.29835Z" fill="#292D32"/>
            <path d="M7.01166 13.3058C6.43416 13.3058 5.87416 13.0725 5.46582 12.6642C5.05749 12.2558 4.82416 11.6958 4.82416 11.1183H5.69916C5.69916 11.4625 5.83916 11.8008 6.08416 12.0458C6.32916 12.2908 6.66749 12.4308 7.01166 12.4308C7.73499 12.4308 8.32416 11.8417 8.32416 11.1183H9.19916C9.19916 12.3258 8.21916 13.3058 7.01166 13.3058Z" fill="#292D32"/>
          </svg>
        </Notices>
        <PhotoWrapper onClick={toggleIsSettingsVisible} ref={settingsRef}>
          {user ? (
            <>
              <Avatar>{getUserAvatar(user.name)}</Avatar>
              <UserInfo>
                <User>{user.name}</User>
                <Organisation>{user.organisations[0].name}</Organisation>
              </UserInfo>
              <ArrowDown
                width="12" height="12" viewBox="0 0 12 12"
                fill="none" xmlns="http://www.w3.org/2000/svg"
                isSettingsVisible={isSettingsVisible}
              >
                <path d="M8.96 4.09003H5.845H3.04C2.56 4.09003 2.32 4.67003 2.66 5.01003L5.25 7.60003C5.665 8.01503 6.34 8.01503 6.755 7.60003L7.74 6.61503L9.345 5.01003C9.68 4.67003 9.44 4.09003 8.96 4.09003Z" fill="#292D32"/>
              </ArrowDown>
            </>
          ) : ''}
          {isSettingsVisible ? (
            <SettingsModal>
              <li onClick={() => navigate('/price-list')}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.50391 10.7474C6.50391 11.7149 7.24641 12.4949 8.16891 12.4949H10.0514C10.8539 12.4949 11.5064 11.8124 11.5064 10.9724C11.5064 10.0574 11.1089 9.73488 10.5164 9.52488L7.49391 8.47488C6.90141 8.26488 6.50391 7.94238 6.50391 7.02738C6.50391 6.18738 7.15641 5.50488 7.95891 5.50488H9.84141C10.7639 5.50488 11.5064 6.28488 11.5064 7.25238" stroke="#232323" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 4.5V13.5" stroke="#232323" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="#232323" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Price List
              </li>
              <Divider />
              <li onClick={() => {
                dispatch(logoutAction());
                navigate('/auth');
              }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.08 10.965L15 9.045L13.08 7.125" stroke="#DC2D2D" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.31995 9.04498H14.9474" stroke="#DC2D2D" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.81995 15C5.50495 15 2.81995 12.75 2.81995 9C2.81995 5.25 5.50495 3 8.81995 3" stroke="#DC2D2D" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Logout
              </li>
            </SettingsModal>
          ) : ''}
        </PhotoWrapper>
      </Settings>
      {searchResults.length && isResultsVisible ? (
        <Results ref={resultsRef}>
          <Li>Services:</Li>
          {searchResults.map((result) => (
            <Li
              key={`${result[0] + result[1]}`}
              onClick={() => goToOrder(result)}
            >
              <div>
                <IconWrapper>
                  <RiArrowRightSLine />
                </IconWrapper>
                {result[1]}
              </div>
              <StyledRegion>{result[0]}</StyledRegion>
            </Li>
          ))}
        </Results>
      ) : ''}
    </StyledPageHeader>
    {searchResults.length && isResultsVisible ? <Background /> : ''}
  </>
  );
};

const StyledPageHeader = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 256px;
  display: flex;
  justify-content: space-between;
  grid-gap: 24px;
  padding: 0 32px;
  height: var(--search-height);
  background-color: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, .25);
  z-index: 1002;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const Input = styled.input`
  display: block;
  padding: 8px 12px 8px 18px;
  width: 100%;
  height: var(--search-height);
  font-size: 1rem;
  border: none;
  background-color: transparent;
`;

const Settings = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  grid-gap: 32px;
`;

const Notices = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border: 1px solid rgba(35, 35, 35, 0.16);
  border-radius: 50%;
  cursor: pointer;
  
  :hover {
    border: 1px solid var(--primary-dark-color);
  }
`;

const PhotoWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 2rem;
  cursor: pointer;
`;

const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 16px 0 auto;
  width: 2rem;
  min-width: 2rem;
  height: 2rem;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 600;
  background-color: #F4F4F4;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 18px;
  height: 100%;
`;

const User = styled.p`
  font-size: 14px;
  font-weight: 600;
`;

const Organisation = styled.p`
  font-size: 12px;
  color: rgba(17, 24, 39, 0.7);
`;

const ArrowDown = styled.svg<{ isSettingsVisible: boolean }>`
  transition: .2s ease-in-out;
  
  ${({ isSettingsVisible }) => isSettingsVisible ? css`
    transform: rotate(180deg);
  ` : ''}
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .3);
  cursor: pointer;
  z-index: 1001;
`;

const Results = styled.ul`
  position: absolute;
  top: 70px;
  left: 44px;
  padding: .75rem 0;
  width: 100%;
  max-width: 320px;
  max-height: 300px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, .25);
  overflow-y: auto;
  z-index: 1002;
`;

const Li = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-gap: 2rem;
  padding: .5rem 1rem;
  font-size: calc(1rem - 2px);
  transition: .1s ease-in-out;
  
  :not(:first-child) {
    cursor: pointer;
    
    :hover > div * {
      color: var(--primary-blue-color);
    }
  }
  
  :first-child {
    font-size: 1rem;
    font-weight: 600;
  }
  
  div {
    display: flex;
    align-items: center;
  }
`;

const IconWrapper = styled.div`
  overflow: hidden;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const StyledRegion = styled.span`
  padding: .25rem .75rem;
  border-radius: 100px;
  font-size: calc(1rem - 2px);
  font-weight: 600;
  background-color: rgba(0, 0, 0, .08);
`;

const SettingsModal = styled(Results)`
  right: 0;
  left: unset;
  padding: 12px 0;
  width: 174px;
  
  li {
    display: flex;
    align-items: center;
    grid-gap: 12px;
    padding: 12px 24px;
    font-size: 14px;
    font-weight: 600;
    
    :hover {
      background-color: rgba(0, 0, 0, .05);
    }
    
    svg {
      width: 18px;
      height: 18px;
    }
    
    :last-child a {
      color: #DC2D2D;
    }
  }
`;

const Divider = styled.div`
  margin: 12px 0;
  padding: 0 24px;
  height: 1px;
  background-color: rgba(35, 35, 35, 0.16);
`;

export default PageHeader;
