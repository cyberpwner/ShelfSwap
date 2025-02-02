import { Box, Container, Text, VStack } from '@chakra-ui/react';

function Footer() {
  return (
    <Box p="20" as="footer" py="16" bg="var(--dark-color)" color="gray.100" letterSpacing="wide">
      <Container maxW="5/6" h="full">
        <VStack justifyContent="flex-end">
          <Text verticalAlign="">&copy; 2025 - Free Palestine </Text>
        </VStack>
      </Container>
    </Box>
  );
}

export default Footer;
