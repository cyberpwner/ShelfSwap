import { useAuth } from '@/contexts/AuthContext/AuthContextProvider';
import { Navigate, Outlet } from 'react-router';

function ProtectedRoute() {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to={'/login'} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
