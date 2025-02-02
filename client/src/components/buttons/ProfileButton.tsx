import { FiUser } from 'react-icons/fi';
import IconLink from '../header/IconLink';
import { useAuth } from '@/contexts/AuthContext/useAuth';
import { UserRole } from '@/types/user.types';

function ProfileButton() {
  const { user } = useAuth();

  return <IconLink to={user && user.role === UserRole.ADMIN ? '/dashboard' : 'login'} icon={FiUser} />;
}

export default ProfileButton;
