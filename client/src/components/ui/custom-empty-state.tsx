import { EmptyState, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
  size?: 'sm' | 'md' | 'lg';
}

function CustomEmptyState({ icon, description, title, size = 'md' }: Props) {
  return (
    <EmptyState.Root size={size}>
      <EmptyState.Content>
        <EmptyState.Indicator>{icon}</EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>{title}</EmptyState.Title>
          <EmptyState.Description>{description}</EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}

export default CustomEmptyState;
