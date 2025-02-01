import { Card, Center, HStack, Image, Text } from '@chakra-ui/react';
import MenInTheSunCover from '../../assets/img/MenInTheSunCover.jpg';

export function BookCard() {
  return (
    <Card.Root
      maxW={{ base: '72', sm: '80' }}
      overflow="hidden"
      gap="0"
      transition="all"
      _hover={{ '& > .book-image': { bg: 'var(--subtle-purple)/50', _dark: { bg: 'gray.800' } } }}
    >
      <Center
        maxW="full"
        pt="6"
        pr="6"
        pl="6"
        className="book-image"
        transition="all"
        _hover={{ bg: 'var(--subtle-purple)' }}
      >
        <Image w="5/6" rounded={'sm'} src={MenInTheSunCover} alt="Men in the Sun cover" />
      </Center>

      <Card.Body maxW="full" gap="0" pt="4">
        <Card.Title>Men in the Sun</Card.Title>

        <HStack alignItems="center" justifyContent="space-between">
          <Card.Description>Ghassan Kanafani</Card.Description>

          <Text
            color="var(--primary-purple)"
            textStyle={{ base: 'md', md: 'lg' }}
            fontWeight="bold"
            letterSpacing="wide"
          >
            {`87.75€`}
          </Text>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}
