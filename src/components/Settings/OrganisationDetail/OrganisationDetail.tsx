import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '@/store/selectors/userSelectors';
import { getOrganisationDetailsAction } from '@/store/actions/organisationsActions';

const OrganisationDetail = () => {
  const user = useSelector(selectUser);

  const dispatch = useDispatch<any>();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      const splitLocation = location.pathname.split('/');
      const lastLocationElement = splitLocation[splitLocation.length - 1];
      const id = !isNaN(+lastLocationElement) ? +lastLocationElement : +user.organisations[0].id;

      dispatch(getOrganisationDetailsAction(id));
    }
  }, [user]);

  return (
    <Page>
      <H3>Organisation</H3>
    </Page>
  );
};

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const H3 = styled.h3`
  margin-bottom: 40px;
  font-size: 18px;
  font-weight: 600;
`;

export default OrganisationDetail;
