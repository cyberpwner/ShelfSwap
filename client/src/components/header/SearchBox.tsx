import { Input, InputProps } from '@chakra-ui/react';
import { InputGroup } from '../ui/input-group';
import { LuSearch } from 'react-icons/lu';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

interface Props extends InputProps {
  setInputValue: Dispatch<SetStateAction<string>>;
  inputValue: string;
}

function SearchBox({ setInputValue, inputValue, ...rest }: Props) {
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
        value={inputValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
      />
    </InputGroup>
  );
}

export default SearchBox;
