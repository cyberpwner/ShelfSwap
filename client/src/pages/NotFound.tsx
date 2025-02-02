import Footer from '@/components/Footer';
import HeaderWithoutSearch from '@/components/header/HeaderWithoutSearch';
import CustomEmptyState from '@/components/ui/custom-empty-state';
import { Box, Container, Stack } from '@chakra-ui/react';
import { LuSwatchBook } from 'react-icons/lu';

function NotFound() {
  return (
    <Box h="100vh">
      <Stack h="full" gap="8" justifyContent="space-between">
        <Container>
          <HeaderWithoutSearch />
          <CustomEmptyState
            size="lg"
            icon={<LuSwatchBook />}
            title="Not Found"
            description="Page could not be found."
          />
        </Container>

        <Footer />
      </Stack>
    </Box>
  );
}

export default NotFound;
