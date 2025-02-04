import { useAuth } from '@/contexts/AuthContext/useAuth';
import { Navigate, Outlet } from 'react-router';

function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to={'/login'} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
