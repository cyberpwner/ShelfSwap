import { Button } from '@chakra-ui/react';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MouseEventHandler, useState } from 'react';

interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

function ConfirmPopup({ onClick }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger asChild>
        <Button colorPalette="red" size="md">
          Delete user
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>

        <DialogBody>
          <p>¡Careful! This action cannot be undone</p>
        </DialogBody>

        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>

          <Button
            onClick={async (e) => {
              onClick(e);
              setOpen(false);
            }}
          >
            Continue
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}

export default ConfirmPopup;
