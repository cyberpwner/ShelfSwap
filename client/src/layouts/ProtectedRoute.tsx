import { useAuth } from '@/contexts/AuthContext/useAuth';
import { Navigate, Outlet } from 'react-router';

function ProtectedRoute() {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to={'/login'} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
