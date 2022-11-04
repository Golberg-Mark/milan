import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BsCurrencyDollar, RiArrowRightSLine } from 'react-icons/all';

import { selectUser } from '@/store/selectors/userSelectors';
import { getMeAction } from '@/store/actions/userActions';

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
    if (!user) dispatch(getMeAction());
  }, []);

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="rgb(156, 163, 175)"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clipRule="evenodd"
          />
        </svg>
        <Input
          type="text"
          placeholder="Search"
          value={search}
          onChange={setSearch}
        />
      </Search>
      <Settings>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="rgb(156, 163, 175)"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>
        <PhotoWrapper onClick={toggleIsSettingsVisible} ref={settingsRef}>
          {user ? <User>{getUserAvatar(user.name)}</User> : ''}
          {isSettingsVisible ? (
            <SettingsModal>
              <li>
                <Link to="/price-list">
                  <BsCurrencyDollar />
                  Price List
                </Link>
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
  padding: 0 16px;
  height: 64px;
  background-color: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, .25);
  z-index: 1002;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const Input = styled.input`
  display: block;
  padding: 8px 12px;
  width: 100%;
  height: 64px;
  font-size: 14px;
  border: none;
  background-color: transparent;
`;

const Settings = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  grid-gap: 16px;
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const PhotoWrapper = styled.div`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;

const User = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 600;
  background-color: #F4F4F4;
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
  width: 200px;
  
  li {
    padding: .5rem 1rem;
    
    :hover {
      background-color: rgba(0, 0, 0, .05);
    }
    
    a {
      display: flex;
      align-items: center;
      grid-gap: .25rem;
    }
    
    svg {
      width: 1rem;
      height: 1rem;
      
      * {
        fill: rgba(0, 0, 0, .6);
      }
    }
  }
`;

export default PageHeader;
