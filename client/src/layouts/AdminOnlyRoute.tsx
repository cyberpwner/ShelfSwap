import CustomSpinner from '@/components/CustomSpinner';
import { useAuth } from '@/contexts/AuthContext/useAuth';
import { UserRole } from '@/types/user.types';
import { Navigate, Outlet } from 'react-router';

function AdminOnlyRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <CustomSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user && user.role !== UserRole.ADMIN) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AdminOnlyRoute;
