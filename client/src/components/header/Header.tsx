import { Box, Center, Container, Grid, GridItem, Group, Image } from '@chakra-ui/react';
import Logo from '../../assets/img/Logo.svg';
import SearchBox from './SearchBox';
import ProfileButton from '../buttons/ProfileButton';
import FavoritesButton from '../buttons/FavoritesButton';
import CartButton from '../buttons/CartButton';
import { NavMenu } from './NavMenu';

function Header() {
  return (
    <Box as="header" w="full" h="32">
      <Container maxW="5/6" h="full">
        <Grid
          gridTemplateColumns="1fr auto"
          md={{ gridTemplateColumns: 'auto 1fr auto' }}
          gap="8"
          w="full"
          h="full"
          alignItems="center"
        >
          <GridItem hideBelow="md" className="logo-part">
            <Image src={Logo} alt="Logo" w="16" />
          </GridItem>

          <GridItem as="form" className="search-part">
            <Center>
              <SearchBox
                w="full"
                md={{ w: '3/4' }}
                bg="var(--subtle-purple)"
                borderRadius="sm"
                _dark={{
                  color: 'gray.100',
                  bg: 'gray.900',
                  _focus: { borderColor: 'gray.200' },
                  _selection: { bg: 'gray.500' },
                }}
              />
            </Center>
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
      </Container>
    </Box>
  );
}

export default Header;
