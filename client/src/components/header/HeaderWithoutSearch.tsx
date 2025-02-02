import { Box, Grid, GridItem, Group, Image } from '@chakra-ui/react';
import { Link } from 'react-router';
import ProfileButton from '../buttons/ProfileButton';
import FavoritesButton from '../buttons/FavoritesButton';
import CartButton from '../buttons/CartButton';
import { NavMenu } from './NavMenu';
import Logo from '@/assets/img/Logo.svg';

function HeaderWithoutSearch() {
  return (
    <Box as="header" w="full" h="32">
      <Grid gridTemplateColumns="1fr auto" justifyContent="space-between" gap="8" w="full" h="full" alignItems="center">
        <GridItem className="logo-part">
          <Link to="/">
            <Image src={Logo} alt="Logo" w="16" />
          </Link>
        </GridItem>

        <GridItem display={{ base: 'none', md: 'block' }}>
          <Group>
            <ProfileButton />
            <FavoritesButton />
            <CartButton />
          </Group>
        </GridItem>

        <GridItem display={{ base: 'block', md: 'none' }} className="menu-part" pos="relative">
          <NavMenu />
        </GridItem>
      </Grid>
    </Box>
  );
}

export default HeaderWithoutSearch;
