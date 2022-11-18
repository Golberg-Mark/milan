import React, { useEffect } from 'react';
import { Navigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { selectIsLoadingUser, selectUser } from '@/store/selectors/userSelectors';
import Loader from '@/components/Loader';
import { getMeAction } from '@/store/actions/userActions';
import useToggle from '@/hooks/useToggle';

interface Props extends React.PropsWithChildren {
  isForAuth?: boolean
}

const ProtectedRouter: React.FC<Props> = ({ isForAuth = false, children }) => {
  if (!localStorage.getItem('token') && !localStorage.getItem('refreshToken')) return <Navigate to="/auth" />

  const [isFinished, toggleIsFinished] = useToggle(false);
  const dispatch = useDispatch<any>();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoadingUser);

  useEffect(() => {
    dispatch(getMeAction(toggleIsFinished));
  }, []);

  if (isLoading && !isFinished) return <div style={{ minHeight: '100vh' }}><Loader /></div>;

  if (!isLoading && isFinished) {
    if (!user) return <Navigate to="/auth" />;
    if (isForAuth && user) return <Navigate to="/dashboard" />
  }

  return user ? <>{children}</> : <div style={{ minHeight: '100vh' }}><Loader /></div>;
};

export default ProtectedRouter;
