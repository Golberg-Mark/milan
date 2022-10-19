import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '@/store/selectors/userSelectors';
import { getMeAction } from '@/store/actions/userActions';

const PageHeader = () => {
  const user = useSelector(selectUser);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (!user) dispatch(getMeAction());
  }, []);

  return (
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
        <Input type="text" placeholder="Search" />
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
        <PhotoWrapper>
          {user ? <Photo src={user.photo} alt="Your profile photo" /> : ''}
        </PhotoWrapper>
      </Settings>
    </StyledPageHeader>
  );
};

const StyledPageHeader = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 255px;
  display: flex;
  justify-content: space-between;
  grid-gap: 24px;
  padding: 0 16px;
  background-color: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, .25);
  z-index: 100;
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
  display: flex;
  align-items: center;
  grid-gap: 16px;
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const PhotoWrapper = styled.div`
  width: 32px;
  height: 32px;
`;

const Photo = styled.img`
  border-radius: 50%;
`;

export default PageHeader;
