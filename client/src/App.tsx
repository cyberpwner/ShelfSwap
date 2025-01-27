import { Button, Flex, Heading } from '@chakra-ui/react';
import './App.css';

function App() {
  return (
    <Flex direction="column" justify="center" align="center" height="100vh" gap="4">
      <Heading
        as="h1"
        fontSize="2rem"
        mdToLg={{ fontSize: '3rem' }}
        transition="all"
        _hover={{ color: 'red', cursor: 'pointer' }}
      >
        Shelf Swap
      </Heading>
      <Button>Click me</Button>
    </Flex>
  );
}

export default App;
