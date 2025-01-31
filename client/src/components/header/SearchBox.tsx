import { Input, InputProps } from '@chakra-ui/react';
import { InputGroup } from '../ui/input-group';
import { LuSearch } from 'react-icons/lu';

function SearchBox({ ...rest }: InputProps) {
  return (
    <InputGroup {...rest} startElement={<LuSearch />}>
      <Input
        w="full"
        transition="all"
        variant="flushed"
        css={{ '--focus-color': 'var(--primary-purple)' }}
        type="search"
        name="q"
        id="q"
        placeholder="Search"
        letterSpacing="wide"
      />
    </InputGroup>
  );
}

export default SearchBox;
