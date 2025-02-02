import { Box, Center, Grid, GridItem, Group, Image } from '@chakra-ui/react';
import Logo from '../../assets/img/Logo.svg';
import SearchBox from './SearchBox';
import ProfileButton from '../buttons/ProfileButton';
import FavoritesButton from '../buttons/FavoritesButton';
import CartButton from '../buttons/CartButton';
import { NavMenu } from './NavMenu';
import { Link, useNavigate } from 'react-router';
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext/AuthContextProvider';
import LogoutButton from '../buttons/LogoutButton';

interface Props {
  setSearch: Dispatch<SetStateAction<string>>;
  searchParams: URLSearchParams;
}

function Header({ setSearch, searchParams }: Props) {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useAuth();

  function handleSubmit(e: FormEvent<HTMLDivElement>) {
    e.preventDefault();

    setSearch(inputValue);

    navigate(`/?search=${encodeURIComponent(inputValue) || ''}`);
  }

  useEffect(() => {
    setInputValue(searchParams.get('search') || '');
  }, [searchParams]);

  return (
    <Box as="header" w="full" h="32">
      <Grid
        gridTemplateColumns="1fr auto"
        md={{ gridTemplateColumns: 'auto 1fr auto' }}
        gap="8"
        w="full"
        h="full"
        alignItems="center"
      >
        <GridItem hideBelow="md" className="logo-part">
          <Link to="/">
            <Image src={Logo} alt="Logo" w="16" />
          </Link>
        </GridItem>

        <GridItem as="form" onSubmit={handleSubmit} className="search-part">
          <Center>
            <SearchBox
              inputValue={inputValue}
              setInputValue={setInputValue}
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
            {isAuth && <LogoutButton setIsAuth={setIsAuth} />}
          </Group>
        </GridItem>

        <GridItem display={{ base: 'block', md: 'none' }} className="menu-part" pos="relative">
          <NavMenu />
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Header;
