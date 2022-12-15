import React, { useEffect } from 'react';
import { Navigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { selectIsLoadingUser, selectUser } from '@/store/selectors/userSelectors';
import Loader from '@/components/Loader';
import { getMeAction } from '@/store/actions/userActions';
import useToggle from '@/hooks/useToggle';
import { getServices } from '@/store/actions/servicesActions';
import { selectIsServicesLoading } from '@/store/selectors/servicesSelector';

const ProtectedRouter: React.FC<any> = ({ children }) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');
  if (!token && !refreshToken) return <Navigate to="/sign-in" />;

  const [isFinished, toggleIsFinished] = useToggle(false);
  const dispatch = useDispatch<any>();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoadingUser);
  const isServicesLoading = useSelector(selectIsServicesLoading);

  useEffect(() => {
    dispatch(getMeAction(toggleIsFinished));
    dispatch(getServices())
  }, []);

  if ((isLoading && !isFinished) || isServicesLoading) return <div style={{ minHeight: '100vh' }}><Loader /></div>;

  if (!isLoading && isFinished && !user) return <Navigate to="/sign-in" />;

  return user ? <>{children}</> : <div style={{ minHeight: '100vh' }}><Loader /></div>;
};

export default ProtectedRouter;
