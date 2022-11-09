import React, { useEffect } from 'react';
import { Navigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { selectIsLoggedIn, selectUser } from '@/store/selectors/userSelectors';
import { getMeAction } from '@/store/actions/userActions';
import Loader from '@/components/Loader';

const ProtectedRouter: React.FC<any> = ({ children }: any) => {
  const dispatch = useDispatch<any>();
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (!user) dispatch(getMeAction());
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/auth" />
  }

  return user ? children : <div style={{ minHeight: '100vh' }}><Loader /></div>;
};

export default ProtectedRouter;
