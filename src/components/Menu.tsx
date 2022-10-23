import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router';

const appNavLinks = [
  {
    url: "/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#ffffffcc"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
    text: "Home",
  },
  {
    url: "/my-hq",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#ffffffcc"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
        />
      </svg>
    ),
    text: "My HQ",
  }
];

const Menu = () => {
  const { pathname } = useLocation();

  const dashboardRegexp = new RegExp(/(^\/$)|(^\/matters.*$)/);

  return (
    <StyledMenu>
      <Logo
        className="h-8 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=white"
        alt="Milan"
      />
      <Nav>
        {appNavLinks.map((navLink) => (
          <NavItem to={navLink.url} end={!dashboardRegexp.test(pathname)} key={navLink.text}>
            {navLink.icon}
            {navLink.text}
          </NavItem>
        ))}
      </Nav>
    </StyledMenu>
  );
};

const StyledMenu = styled.menu`
  position: fixed;
  left: 0;
  margin: 0;
  padding: 20px 8px 16px;
  min-width: 255px;
  max-width: 255px;
  height: 100vh;
  background-color: var(--primary-blue-color);
  z-index: 1000;
`;

const Logo = styled.img`
  display: block;
  width: auto;
  height: 32px;
  margin: 0 0 20px 8px;
`;

const Nav = styled.nav`
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, .3);
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  grid-gap: 16px;
  margin-bottom: 4px;
  padding: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #ffffffcc;
  cursor: pointer;
  
  &.active {
    background-color: #ffffff4d;
    border-radius: 6px;
  }
`;

export default Menu;
