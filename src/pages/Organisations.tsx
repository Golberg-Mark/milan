import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PageContainer from '@/components/PageContainer';
import { default as OrganisationsPage } from '@/components/Organisations/Organisations';
import OrganisationDetail from '@/components/Organisations/OrganisationDetail';

const Organisations = () => {
  return (
    <PageContainer contentPadding="32px 0">
      <Routes>
        <Route path="/" element={<OrganisationsPage />} />
        <Route path="/:id" element={<OrganisationDetail />} />
      </Routes>
    </PageContainer>
  );
};

export default Organisations;
