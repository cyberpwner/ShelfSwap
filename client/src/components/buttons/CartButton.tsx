import { FiShoppingCart } from 'react-icons/fi';
import IconLink from '../header/IconLink';

function CartButton() {
  return <IconLink to="/cart" icon={FiShoppingCart} />;
}

export default CartButton;
