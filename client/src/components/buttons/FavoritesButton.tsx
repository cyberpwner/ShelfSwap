import { FiHeart } from 'react-icons/fi';
import IconLink from '../header/IconLink';

function FavoritesButton() {
  return <IconLink to="/favorites" icon={FiHeart} />;
}

export default FavoritesButton;
