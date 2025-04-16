import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useAuth } from '../../../hooks/useAuth';
import { useAppDispatch } from '../../../redux/store';

import { Router } from '../../pages/Router';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { refreshUser } from '../../../redux/auth/operations.ts';

export const MainLayout = () => {
  const location = useLocation();
  const { pathname } = location;
  const { isRefreshing } = useAuth();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <p>Loading...</p>
  ) : (
    <>
      {!pathname.startsWith('/dashboard') && <Header />}

      <Router />
      {!pathname.startsWith('/dashboard') && <Footer />}
    </>
  );
};
