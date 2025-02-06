import { Button, ButtonGroup, DrawerFooter, Separator, Stack } from '@chakra-ui/react';
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';
import { RiMenuUnfold3Line } from 'react-icons/ri';
import { Toaster } from './ui/toaster';
import { Dispatch, SetStateAction, useState } from 'react';
import { DashboardPages } from '@/pages/Dashboard';

interface Props {
  currentPage: DashboardPages;
  setCurrentPage: Dispatch<SetStateAction<DashboardPages>>;
}

function DashboardDrawer({ currentPage, setCurrentPage }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <DrawerRoot placement="start" open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DrawerBackdrop />

      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          <RiMenuUnfold3Line />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Dashboard</DrawerTitle>
        </DrawerHeader>

        <DrawerBody>
          <Stack>
            <ButtonGroup orientation="vertical" fontWeight="semibold">
              <Button
                disabled={currentPage === 'users'}
                onClick={() => {
                  setCurrentPage('users');
                  setOpen(false);
                }}
                fontWeight="inherit"
              >
                Users
              </Button>

              <Separator />

              <Button
                fontWeight="inherit"
                disabled={currentPage === 'books'}
                onClick={() => {
                  setCurrentPage('books');
                  setOpen(false);
                }}
              >
                Books
              </Button>
            </ButtonGroup>
          </Stack>
        </DrawerBody>

        <DrawerFooter>
          <DrawerActionTrigger asChild>
            <Button variant="outline">Close</Button>
          </DrawerActionTrigger>
        </DrawerFooter>

        <DrawerCloseTrigger />
      </DrawerContent>

      <Toaster />
    </DrawerRoot>
  );
}

export default DashboardDrawer;
