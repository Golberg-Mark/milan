import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MattersTable from '@/components/Dashboard/MattersTable';
import { Wrapper } from '@/components/Dashboard/OrdersTable';

const Matters = () => {
  return (
    <Routes>
      <Route path="/" element={<MattersTable />} />
      <Route path="/:matterId" element={<Wrapper />} />
    </Routes>
  );
};

export default Matters;
