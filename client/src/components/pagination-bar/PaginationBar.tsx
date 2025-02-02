import { Button, HStack, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  totalPages: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

function PaginationBar({ totalPages, currentPage, setCurrentPage }: Props) {
  if (!totalPages) {
    return null;
  }

  // an array of numbers (1 to numOfPages)
  const array = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <HStack className="pagination-list">
      {array.map((num) => (
        <Button
          bg={{
            _light: currentPage === num ? 'var(--primary-purple)' : 'var(--subtle-purple)',
            _dark: currentPage === num ? 'gray.600' : 'var(--primary-purple)',
          }}
          color={{ _light: currentPage === num ? 'white' : 'black' }}
          disabled={currentPage === num}
          _dark={{
            _hover: { bg: currentPage === num ? 'gray.600/80' : 'var(--primary-purple)/80' },
          }}
          _light={{ _hover: { bg: currentPage === num ? 'gray.600/80' : 'var(--primary-purple)/80' } }}
          transition="all"
          key={num}
          type="button"
          onClick={() => setCurrentPage(num)}
        >
          <Text fontWeight="bold">{num}</Text>
        </Button>
      ))}
    </HStack>
  );
}

export default PaginationBar;
