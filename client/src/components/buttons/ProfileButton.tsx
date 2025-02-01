import { FiUser } from 'react-icons/fi';
import IconLink from '../header/IconLink';

function ProfileButton() {
  return <IconLink to="/login" icon={FiUser} />;
}

export default ProfileButton;
