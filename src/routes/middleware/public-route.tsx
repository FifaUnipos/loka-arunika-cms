// routes/PublicRoute.tsx
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/hooks/use-auth';

export function PublicRoute() {
  // const { user } = useAuth();

  // if (user) {
  //   return <Navigate to="/dashboard" replace />;
  // }

  return <Outlet />;
}
