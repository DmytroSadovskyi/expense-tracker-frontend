import { useLocation } from 'react-router';

import { Router } from '../../pages/Router';
import { Header } from '../Header';
import { Footer } from '../Footer';

export const MainLayout = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      {!pathname.startsWith('/dashboard') && <Header />}

      <Router />
      {!pathname.startsWith('/dashboard') && <Footer />}
    </>
  );
};
