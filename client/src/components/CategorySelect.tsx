import { Button, createListCollection, Flex, Skeleton } from '@chakra-ui/react';
import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from './ui/select';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@/loaders/fetchCategories';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  selectedCategory: string[];
  setSelectedCategory: Dispatch<SetStateAction<string[]>>;
}

function CategorySelect({ selectedCategory, setSelectedCategory }: Props) {
  const { isError, isPending, data } = useQuery({ queryKey: ['categories'], queryFn: fetchCategories });

  if (isError) {
    return null;
  }

  if (isPending) {
    return <Skeleton h="36px" w="64" />;
  }

  const categoriesList = createListCollection({
    items: data.data.map(({ name }) => ({
      label: capitalize(name),
      value: name,
    })),
  });

  return (
    <Flex gap="8" pos="relative" w="full">
      <SelectRoot
        value={selectedCategory}
        onValueChange={(e) => setSelectedCategory(e.value)}
        collection={categoriesList}
        size="sm"
        maxW={{ base: '48', sm: '72' }}
        minW="48"
      >
        <SelectLabel color="var(--dark-color)" fontWeight="bold" letterSpacing="wide" _dark={{ color: 'gray.100' }}>
          Filter by category:
        </SelectLabel>

        <SelectTrigger>
          <SelectValueText placeholder="Select category" />
        </SelectTrigger>

        <SelectContent>
          {categoriesList.items.map((category) => (
            <SelectItem item={category} key={category.value} cursor="pointer">
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>

      <Button
        onClick={() => setSelectedCategory([])}
        size="sm"
        pos="absolute"
        bottom="0"
        right="0"
        _dark={{ bg: 'var(--primary-purple)', color: 'white', _hover: { bg: 'var(--primary-purple)/90' } }}
      >
        Reset
      </Button>
    </Flex>
  );
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase().concat(text.slice(1));
}

export default CategorySelect;
