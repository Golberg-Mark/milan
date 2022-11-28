import React from 'react';
import { useParams } from 'react-router';

const OrganisationDetail = () => {
  const { id } = useParams();

  return (
    <div>
      {id}
    </div>
  );
};

export default OrganisationDetail;
