import { Box, Card, Center, Highlight, HStack, Image, Text } from '@chakra-ui/react';
import { IBook } from '../book-list/fetchBookList';

type Props = Pick<IBook, 'title' | 'price' | 'authors' | 'coverUrl'> & { search: string };

export function BookCard({ title, authors, price, coverUrl, search }: Props) {
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
          <Text key={title}>
            <Highlight
              ignoreCase
              query={search}
              styles={{ fontWeight: 'semibold', bg: 'purple.subtle', color: 'purple.fg' }}
            >
              {title}
            </Highlight>
          </Text>
        </Card.Title>

        <HStack alignItems="center" justifyContent="space-between">
          <Card.Description lineClamp="1" as="div" display="flex" flexDir="column">
            {authors.map((author) => (
              <Text key={author.name}>
                <Highlight
                  ignoreCase
                  query={search}
                  styles={{ fontWeight: 'semibold', bg: 'purple.subtle', color: 'purple.fg' }}
                >
                  {author.name}
                </Highlight>
              </Text>
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
