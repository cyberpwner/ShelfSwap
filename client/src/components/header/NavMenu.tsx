import { Button, Flex, Icon, Separator, Stack, Text } from '@chakra-ui/react';
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useState } from 'react';
import { RiMenu3Line } from 'react-icons/ri';
import { NavLink } from 'react-router';
import { FiHeart, FiShoppingBag, FiUser } from 'react-icons/fi';
import LogoutButton from '../buttons/LogoutButton';
import { useAuth } from '@/contexts/AuthContext/useAuth';
import { Toaster, toaster } from '../ui/toaster';

export function NavMenu() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DrawerBackdrop />

      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          <RiMenu3Line />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>

        <DrawerBody>
          <Stack>
            <NavLink to={'/login'} onClick={() => setOpen(false)}>
              <Flex alignItems="center" gap="2" transition="all" _hover={{ color: 'var(--primary-purple)' }}>
                <Icon as={FiUser} />
                <Text>Login</Text>
              </Flex>
            </NavLink>

            <Separator />

            <NavLink to={'/favorites'} onClick={() => setOpen(false)}>
              <Flex alignItems="center" gap="2" transition="all" _hover={{ color: 'var(--primary-purple)' }}>
                <Icon as={FiHeart} />
                <Text>Favorites</Text>
              </Flex>
            </NavLink>

            <Separator />

            <NavLink to={'/cart'} onClick={() => setOpen(false)}>
              <Flex alignItems="center" gap="2" transition="all" _hover={{ color: 'var(--primary-purple)' }}>
                <Icon as={FiShoppingBag} />
                <Text>Cart</Text>
              </Flex>
            </NavLink>

            <Separator />
          </Stack>
        </DrawerBody>

        <DrawerFooter>
          <DrawerActionTrigger asChild>
            <Button variant="outline">Close</Button>
          </DrawerActionTrigger>

          {user && (
            <LogoutButton
              onClick={() => {
                setOpen(false);

                toaster.create({
                  type: 'success',
                  title: 'Logged out',
                  description: 'Logged out successfully!',
                });
              }}
            >
              Logout
            </LogoutButton>
          )}
        </DrawerFooter>

        <DrawerCloseTrigger />
      </DrawerContent>

      <Toaster />
    </DrawerRoot>
  );
}
