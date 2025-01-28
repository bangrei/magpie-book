import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useState } from "react";

const ToastNotification = ({ message, title, onClose }: any) => {
  const [open, setOpen] = useState(true);
  const _close = () => {
    setOpen(false);
    if (onClose != undefined) onClose();
  };
  return (
    <AlertDialog.Root open={open}>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>{title}</AlertDialog.Title>
        <AlertDialog.Description size="2">{message}</AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray" onClick={() => _close()}>
              Close
            </Button>
          </AlertDialog.Cancel>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default ToastNotification;
