import { Box, Card, Center, HStack, Image, Text } from '@chakra-ui/react';
import { IBook } from '../book-list/fetchBookList';

type Props = Pick<IBook, 'title' | 'price' | 'authors' | 'coverUrl'>;

export function BookCard({ title, authors, price, coverUrl }: Props) {
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
        <Image w="5/6" rounded={'sm'} src={coverUrl} alt="Men in the Sun cover" />
      </Center>

      <Card.Body maxW="full" gap="0" pt="4">
        <Card.Title fontSize={{ base: 'sm', md: 'md' }} lineClamp="1">
          {title}
        </Card.Title>

        <HStack alignItems="center" justifyContent="space-between">
          <Card.Description as="div" display="flex" flexWrap="wrap">
            {authors.map((author) => (
              <Text key={author.name}>{author.name}</Text>
            ))}
          </Card.Description>

          <Box
            color="var(--primary-purple)"
            textStyle={{ base: 'md', md: 'lg' }}
            fontWeight="bold"
            letterSpacing="wide"
          >
            {`${price}€`}
          </Box>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}
