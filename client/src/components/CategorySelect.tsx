import { createListCollection, Skeleton } from '@chakra-ui/react';
import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from './ui/select';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@/loaders/fetchCategories';
import { useState } from 'react';

function CategorySelect() {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const { isError, isPending, data } = useQuery({ queryKey: ['categories'], queryFn: fetchCategories });

  if (isError) {
    return null;
  }

  if (isPending) {
    return <Skeleton />;
  }

  const categoriesList = createListCollection({
    items: data.map(({ name }) => ({
      label: capitalize(name),
      value: name,
    })),
  });

  return (
    <SelectRoot
      value={selectedCategory}
      onValueChange={(e) => setSelectedCategory(e.value)}
      collection={categoriesList}
      size="sm"
      maxW="72"
    >
      <SelectLabel color="var(--dark-color)" fontWeight="bold" letterSpacing="wide" _dark={{ color: 'gray.100' }}>
        Filter by category:
      </SelectLabel>

      <SelectTrigger>
        <SelectValueText placeholder="Select category" />
      </SelectTrigger>

      <SelectContent>
        {categoriesList.items.map((category) => (
          <SelectItem item={category} key={category.value}>
            {category.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase().concat(text.slice(1));
}

export default CategorySelect;
