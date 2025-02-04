import { Box, Center, Container, Grid, GridItem, Heading, Image, VStack } from '@chakra-ui/react';
import Picture from '../assets/img/Picture.png';
import Logo from '../assets/img/Logo.svg';
import LoginForm from '@/components/forms/LoginForm';
import RegisterForm from '@/components/forms/RegisterForm';
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router';
import { setupAxiosInterceptors } from '@/api/api.constants';
import { useAuth } from '@/contexts/AuthContext/useAuth';

function LoginPage() {
  const [isShowRegister, setIsShowRegister] = useState(false);
  const { isAuth } = useAuth();

  useEffect(() => {
    setupAxiosInterceptors();
  }, []);

  if (isAuth) {
    return <Navigate to={'/'} replace />;
  }

  return (
    <Grid
      w="full"
      as="section"
      minH="100vh"
      gridTemplateColumns="1fr"
      md={{ overflow: 'hidden' }}
      lg={{ gridTemplateColumns: 'repeat(2, 1fr)', h: '100vh' }}
      py={{ base: '16', sm: '0' }}
    >
      <GridItem as="section" bgImage={`url(${Picture})`} bgSize="cover" bgPos="center" hideBelow="lg" />

      <GridItem as="section" h="full">
        <Center h="100vh">
          <Container w="20rem" sm={{ w: '25rem' }}>
            <VStack justify="center" gap="12">
              <Link to="/">
                <Image src={Logo} alt="Logo" w={{ base: '24', md: '32' }} />
              </Link>

              <Box as="header" w="full">
                <Heading
                  fontWeight="medium"
                  color={'gray.500'}
                  w="full"
                  as="h2"
                  textAlign="left"
                  _dark={{ color: 'gray.300' }}
                >
                  {isShowRegister ? 'Welcome!' : 'Welcome back!'}
                </Heading>

                <Heading
                  fontWeight="bold"
                  color="var(--dark-color)"
                  w="full"
                  as="h1"
                  fontSize={{ base: '2xl', sm: '3xl' }}
                  textAlign="left"
                  _dark={{ color: 'white' }}
                >
                  {isShowRegister ? 'Create an account' : 'Login to your account'}
                </Heading>
              </Box>

              {isShowRegister ? (
                <RegisterForm w="full" setIsShowRegister={setIsShowRegister} />
              ) : (
                <LoginForm w="full" setIsShowRegister={setIsShowRegister} />
              )}
            </VStack>
          </Container>
        </Center>
      </GridItem>
    </Grid>
  );
}

export default LoginPage;
