import { useLocation } from 'react-router';
import LoginPage from '@/pages/auth/login/index';
import RegisterPage from '@/pages/auth/register/index';

function Index() {
  const { pathname } = useLocation();
  const currentPath = getPathname(pathname);

  if (currentPath === null || currentPath === 'login') {
    return <LoginPage />;
  }

  if (currentPath === 'register') {
    return <RegisterPage />;
  }
}

const getPathname = (pathname: string): 'login' | 'register' | null => {
  if (pathname === '/') return 'login';
  if (pathname === '/register') return 'register';

  return null;
};

export default Index;
