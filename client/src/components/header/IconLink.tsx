import { Icon, IconButton } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router';

interface IconLinkProps {
  to: string;
  icon: React.ElementType;
}

function IconLink({ to, icon }: IconLinkProps) {
  return (
    <IconButton
      asChild
      bg={'var(--subtle-purple)'}
      _hover={{ _light: { bg: 'var(--primary-purple)/20' } }}
      _focus={{ outline: 'none' }}
      _dark={{
        bg: 'gray.900',
        '& .icon': { color: 'gray.200' },
        _hover: { '& > .icon': { color: 'var(--primary-purple)' } },
      }}
      w="12"
    >
      <NavLink to={to}>
        <Icon className="icon" as={icon} w="18" color="var(--dark-color)" transition="all" />
      </NavLink>
    </IconButton>
  );
}

export default IconLink;
