import styled, { css } from 'styled-components';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import logo from '@/assets/logo.png';
import { selectUser } from '@/store/selectors/userSelectors';
import { Roles } from '@/store/reducers/user';
import { useDispatch } from 'react-redux';
import { servicesActions } from '@/store/actions/servicesActions';
import {
  selectPinedServices,
  selectServices,
  selectServicesModal,
} from '@/store/selectors/servicesSelector';
import { useEffect, useMemo } from 'react';
import { IService } from '@/store/reducers/services';
import { Link } from 'react-router-dom';
import RightArrowIcon from '@/assets/icons/RightArrowIcon';

const Menu = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector(selectUser)!;
  const servicesModal = useSelector(selectServicesModal);
  const pinedServices = useSelector(selectPinedServices);
  const allServices = useSelector(selectServices);

  const goToAllServices = () => {
    dispatch(servicesActions.setServicesModal(true));
  };

  useEffect(() => {
    dispatch(servicesActions.setServicesModal(false));
  }, [location.pathname]);

  const servicesId = useMemo(
    () => Object.values(pinedServices).flat(),
    [pinedServices]
  );

  const services = useMemo(
    () =>
      servicesId.reduce((acc, serviceId) => {
        const findedService = allServices.find(
          ({ productId }) => serviceId === productId
        );
        return [...acc, ...(findedService ? [findedService] : [])];
      }, [] as IService[]),
    [servicesId]
  );

  const closeModal = () => {
    dispatch(servicesActions.setServicesModal(false));
  }

  return (
    <StyledMenu>
      <LogoWrapper>
        <Logo src={logo} alt="Logo" />
      </LogoWrapper>
      <MenuWrap>
      <MenuSection>
        <Heading>MENU</Heading>
        <Nav>
          <Item onClick={goToAllServices} isActive={servicesModal}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.37744 5.58008L8.99994 9.41258L15.5774 5.60258"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 16.2073V9.40479"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.44748 1.85997L3.44248 4.07997C2.53498 4.58247 1.79248 5.84247 1.79248 6.87747V11.115C1.79248 12.15 2.53498 13.41 3.44248 13.9125L7.44748 16.14C8.30248 16.6125 9.70498 16.6125 10.56 16.14L14.565 13.9125C15.4725 13.41 16.215 12.15 16.215 11.115V6.87747C16.215 5.84247 15.4725 4.58247 14.565 4.07997L10.56 1.85247C9.69748 1.37997 8.30248 1.37997 7.44748 1.85997Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            All Services
            <IconWrap>
              <RightArrowIcon />
            </IconWrap>
          </Item>
          <NavItem to="/dashboard" isActiveModal={servicesModal} onClick={closeModal}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.2526 10.725L15.9526 14.475C15.8401 15.6225 15.7501 16.5 13.7176 16.5H4.28257C2.25007 16.5 2.16007 15.6225 2.04757 14.475L1.74757 10.725C1.68757 10.1025 1.88257 9.525 2.23507 9.0825C2.24257 9.075 2.24257 9.075 2.25007 9.0675C2.66257 8.565 3.28507 8.25 3.98257 8.25H14.0176C14.7151 8.25 15.3301 8.565 15.7351 9.0525C15.7426 9.06 15.7501 9.0675 15.7501 9.075C16.1176 9.5175 16.3201 10.095 16.2526 10.725Z"
                stroke="white"
                strokeWidth="1.5"
                strokeMiterlimit="10"
              />
              <path
                d="M2.625 8.57252V4.71002C2.625 2.16002 3.2625 1.52252 5.8125 1.52252H6.765C7.7175 1.52252 7.935 1.80752 8.295 2.28752L9.2475 3.56252C9.4875 3.87752 9.63 4.07252 10.2675 4.07252H12.18C14.73 4.07252 15.3675 4.71002 15.3675 7.26002V8.60252"
                stroke="white"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.07251 12.75H10.9275"
                stroke="white"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Matters & Orders
          </NavItem>
          <NavItem to="/reporting" end isActiveModal={servicesModal} onClick={closeModal}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.0475 14.775C5.6625 14.115 6.6 14.1675 7.14 14.8875L7.8975 15.9C8.505 16.7025 9.4875 16.7025 10.095 15.9L10.8525 14.8875C11.3925 14.1675 12.33 14.115 12.945 14.775C14.28 16.2 15.3675 15.7275 15.3675 13.7325V5.28C15.375 2.2575 14.67 1.5 11.835 1.5H6.165C3.33 1.5 2.625 2.2575 2.625 5.28V13.725C2.625 15.7275 3.72 16.1925 5.0475 14.775Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.07205 8.25H6.07879"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.17383 8.25H12.2988"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.07205 5.25H6.07879"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.17383 5.25H12.2988"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Reporting
          </NavItem>
        </Nav>
      </MenuSection>
      <MenuSection>
        <Heading>SYSTEM SETTINGS</Heading>
        <Nav>
          {user.role === Roles.SYSTEM_ADMIN ? (
            <NavItem to="/notices" end isActiveModal={servicesModal} onClick={closeModal}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.06253 1.83749C8.58753 1.39499 9.43503 1.39499 9.94503 1.83749L11.13 2.84999C11.355 3.03749 11.7825 3.19499 12.0825 3.19499H13.3575C14.1525 3.19499 14.805 3.84749 14.805 4.64249V5.91749C14.805 6.21749 14.9625 6.63749 15.15 6.86249L16.1625 8.04749C16.605 8.57249 16.605 9.41999 16.1625 9.92999L15.15 11.115C14.9625 11.34 14.805 11.76 14.805 12.06V13.335C14.805 14.13 14.1525 14.7825 13.3575 14.7825H12.0825C11.7825 14.7825 11.3625 14.94 11.1375 15.1275L9.95254 16.14C9.42754 16.5825 8.58003 16.5825 8.07003 16.14L6.88503 15.1275C6.66003 14.94 6.23253 14.7825 5.94003 14.7825H4.62753C3.83253 14.7825 3.18003 14.13 3.18003 13.335V12.0525C3.18003 11.76 3.03003 11.3325 2.84253 11.115L1.83003 9.92249C1.39503 9.40499 1.39503 8.56499 1.83003 8.04749L2.84253 6.85499C3.03003 6.62999 3.18003 6.20999 3.18003 5.91749V4.64999C3.18003 3.85499 3.83253 3.20249 4.62753 3.20249H5.92503C6.22503 3.20249 6.64503 3.04499 6.87003 2.85749L8.06253 1.83749Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 6.09747V9.71997"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.99585 12H9.00259"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Notices
            </NavItem>
          ) : (
            ''
          )}
          {user.role === Roles.SYSTEM_ADMIN ? (
            <NavItem to="/organisations" isActiveModal={servicesModal} onClick={closeModal}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.5001 5.37C13.4551 5.3625 13.4026 5.3625 13.3576 5.37C12.3226 5.3325 11.4976 4.485 11.4976 3.435C11.4976 2.3625 12.3601 1.5 13.4326 1.5C14.5051 1.5 15.3676 2.37 15.3676 3.435C15.3601 4.485 14.5351 5.3325 13.5001 5.37Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.7276 10.83C13.7551 11.0025 14.8876 10.8225 15.6826 10.29C16.7401 9.585 16.7401 8.43 15.6826 7.725C14.8801 7.1925 13.7326 7.01249 12.7051 7.19249"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.47749 5.37C4.52249 5.3625 4.57499 5.3625 4.61999 5.37C5.65499 5.3325 6.47999 4.485 6.47999 3.435C6.47999 2.3625 5.61749 1.5 4.54499 1.5C3.47249 1.5 2.60999 2.37 2.60999 3.435C2.61749 4.485 3.44249 5.3325 4.47749 5.37Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.24996 10.83C4.22246 11.0025 3.08996 10.8225 2.29496 10.29C1.23746 9.585 1.23746 8.43 2.29496 7.725C3.09746 7.1925 4.24495 7.01249 5.27245 7.19249"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.00006 10.9725C8.95506 10.965 8.90256 10.965 8.85756 10.9725C7.82256 10.935 6.99756 10.0875 6.99756 9.03748C6.99756 7.96498 7.86006 7.10248 8.93256 7.10248C10.0051 7.10248 10.8676 7.97248 10.8676 9.03748C10.8601 10.0875 10.0351 10.9425 9.00006 10.9725Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.81754 13.335C5.76004 14.04 5.76004 15.195 6.81754 15.9C8.01754 16.7025 9.98254 16.7025 11.1825 15.9C12.24 15.195 12.24 14.04 11.1825 13.335C9.99004 12.54 8.01754 12.54 6.81754 13.335Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Organisations
            </NavItem>
          ) : (
            ''
          )}
          <NavItem to="/users" end isActiveModal={servicesModal} onClick={closeModal}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 9C11.0711 9 12.75 7.32107 12.75 5.25C12.75 3.17893 11.0711 1.5 9 1.5C6.92893 1.5 5.25 3.17893 5.25 5.25C5.25 7.32107 6.92893 9 9 9Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.4425 16.5C15.4425 13.5975 12.555 11.25 8.99999 11.25C5.44499 11.25 2.5575 13.5975 2.5575 16.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Users
          </NavItem>
        </Nav>
      </MenuSection>
      <MenuSection>
        <Heading>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5064 5.82487L13.125 5.20625L8.75 0.875L8.17513 1.49406L8.694 2.01294L3.66625 6.26587L2.9155 5.51556L2.29688 6.125L4.77181 8.60869L0.875 12.5051L1.49188 13.125L5.39044 9.22731L7.875 11.7022L8.48444 11.0836L7.73369 10.3329L11.9879 5.306L12.5064 5.82487Z"
              fill="rgba(255, 255, 255, .5)"
            />
          </svg>
          PINNED SERVICES
        </Heading>
        <Services>
          {services.map(({ productId, searchType, region }) => (
            <Service
              to={`/new-order/${region}/${productId}`}
              key={productId}
            >
              {searchType}
            </Service>
          ))}
        </Services>
      </MenuSection>
      </MenuWrap>
    </StyledMenu>
  );
};

const IconWrap = styled.div`
  width: 12px;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;

  svg {
    width: 12px;
    height: 12px;
  }
`;

const MenuWrap = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-top: 32px;
  flex: 1;

  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;


const Service = styled(Link)`
  font-weight: 600;
  font-size: 14px;
  letter-spacing: -0.01em;
  color: #6c7278;
  padding-left: 20px;
  cursor: pointer;
`;

const Services = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  padding-top: 16px;
`;

const StyledMenu = styled.menu`
  position: fixed;
  left: 0;
  margin: 0;
  padding: 18px 0 16px;
  min-width: 256px;
  max-width: 256px;
  height: 100vh;
  background-color: var(--primary-dark-color);
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const LogoWrapper = styled.div`
  padding: 0 20px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.16);
  text-align: center;
`;

const Logo = styled.img`
  max-width: 171px;
`;

const MenuSection = styled.div`
  margin-bottom: 32px;
  padding: 0 20px;
`;

const Heading = styled.h3`
  display: flex;
  grid-gap: 8px;
  margin-bottom: 16px;
  padding-left: 20px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.5);
`;

const Nav = styled.nav`
  svg {
    width: 24px;
    height: 24px;
  }
`;

const Item = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  grid-gap: 16px;
  padding: 16px 8px 16px 20px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;

  svg * {
    stroke: rgba(255, 255, 255, 0.5);
  }

  ${({ isActive }) => isActive && css`
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;

    svg * {
      stroke: #fff;
    }
  `}
`;

const NavItem = styled(NavLink)<{isActiveModal: boolean}>`
  display: flex;
  align-items: center;
  grid-gap: 16px;
  padding: 16px 8px 16px 20px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;

  svg * {
      stroke: rgba(255, 255, 255, 0.5);
    }

  ${({isActiveModal}) => !isActiveModal && css`
    &.active {
      color: #fff;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 4px;

      svg * {
        stroke: #fff;
      }
    }
  `}
`;

export default Menu;
