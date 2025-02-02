import Footer from '@/components/Footer';
import HeaderWithoutSearch from '@/components/header/HeaderWithoutSearch';
import { Skeleton } from '@/components/ui/skeleton';
import { useBookDetails } from '@/hooks/useBookDetails/useBookDetails';
import { Box, Button, Container, Grid, GridItem, Heading, HStack, Image, Stack, Text } from '@chakra-ui/react';
import { FiChevronLeft } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router';
import { Fragment } from 'react/jsx-runtime';

function capitalizeName(sentence: string) {
  const names = sentence.split(' ');

  return names.map((name) => name.charAt(0).toUpperCase().concat(name.slice(1))).join(' ');
}

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const decodedId = decodeURIComponent(id?.trim() || '');
  const { isPending, isError, data } = useBookDetails(id || '');

  if (!decodedId || decodedId.trim().length === 0) {
    navigate('/');
  }

  if (isError) {
    return <Text>An error has occurred. Try again later.</Text>;
  }

  return (
    <Stack letterSpacing="wide" justifyContent="center" py={{ base: '16', sm: '0' }}>
      <Container minH="100vh" maxW="5/6" xl={{ maxW: '4/6' }}>
        <Stack>
          <HeaderWithoutSearch />

          <HStack>
            <Button variant="ghost" h="12" onClick={() => navigate(-1)}>
              <FiChevronLeft fontSize="xl" />
            </Button>
            <Box>
              <Heading fontSize="2xl">Book details</Heading>
            </Box>
          </HStack>

          <Grid justifyContent="center" templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap="12">
            {isPending ? (
              <Fragment>
                <GridItem>
                  <Skeleton w="72" h="96" />
                </GridItem>

                <Stack gap="16">
                  <Stack>
                    <Skeleton h="5" w="36" />
                    <Skeleton h="5" w="48" />
                  </Stack>

                  <Stack gap="6">
                    <Box>
                      <Skeleton h="5" w="36" />
                    </Box>

                    <Stack gap="4">
                      <Skeleton h="5" w="96" />
                      <Skeleton h="5" w="96" />
                      <Skeleton h="5" w="96" />
                      <Skeleton h="5" w="96" />
                      <Skeleton h="5" w="96" />
                    </Stack>
                  </Stack>
                </Stack>
              </Fragment>
            ) : (
              <Fragment>
                <GridItem
                  rounded="md"
                  p="12"
                  bg="var(--subtle-purple)"
                  _dark={{ bg: 'gray.800', borderColor: 'gray.600' }}
                  borderStyle="solid"
                  borderColor="var(--primary-purple)/10"
                  borderWidth="1px"
                  maxW="450px"
                >
                  <Image src={data?.coverUrl || ''} rounded="md" />
                </GridItem>

                <Stack justifyContent="space-evenly" gap="8">
                  <Stack gap="12">
                    <Stack gap="4">
                      <Heading as="h1" fontSize="3xl">
                        {data?.title}
                      </Heading>

                      <Heading as="h2" fontSize="xl" color="gray.500">
                        {data?.authors?.map(({ name }) => capitalizeName(name)).join(', ')}
                      </Heading>
                    </Stack>

                    <Stack justifyContent="space-between">
                      <Stack gap="4">
                        <Heading as="h3">Summary</Heading>
                        {data?.description ? (
                          <Text color={'gray.700'} _dark={{ color: 'gray.300' }} lineHeight="taller">
                            {' '}
                            {data.description}{' '}
                          </Text>
                        ) : (
                          <Text textAlign="justify" lineHeight="tall">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                          </Text>
                        )}
                      </Stack>
                    </Stack>
                  </Stack>

                  <Button>Buy now!</Button>
                </Stack>
              </Fragment>
            )}
          </Grid>
        </Stack>
      </Container>

      <Footer />
    </Stack>
  );
}

export default BookDetails;
