import { Box, Center, Container, Grid, GridItem, Heading, Image, VStack } from '@chakra-ui/react';
import Picture from '../assets/img/Picture.png';
import Logo from '../assets/img/Logo.svg';
import LoginForm from '@/components/forms/LoginForm';
import RegisterForm from '@/components/forms/RegisterForm';
import { useState } from 'react';

function LoginPage() {
  const [isShowRegister, setIsShowRegister] = useState(false);

  return (
    <Grid
      w="full"
      as="section"
      h="100vh"
      sm={{ overflow: 'hidden' }}
      gridTemplateColumns="1fr"
      lg={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
    >
      <GridItem as="section" bgImage={`url(${Picture})`} bgSize="cover" bgPos="center" hideBelow="lg" />

      <GridItem as="section" h="full">
        <Center h="100vh">
          <Container w="20rem" sm={{ w: '25rem' }}>
            <VStack justify="center" gap="12">
              <Image src={Logo} alt="Logo" />

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
