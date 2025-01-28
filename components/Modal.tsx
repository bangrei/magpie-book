import { Dialog, Button, Flex, Separator } from "@radix-ui/themes";
import { ReactElement, useState } from "react";

interface Props {
  children: ReactElement | undefined;
  title: String | undefined;
  actionText: String | "Action";
  closeText: String | "Close";
  onClose: Function | undefined;
  onAction: Function | undefined;
}

const Modal = (props: Props) => {
  const [open, setOpen] = useState(true);
  const _close = () => {
    setOpen(false);
    if (props.onClose != undefined) props.onClose();
  };
  const _action = () => {
    _close();
    if (props.onAction != undefined) props.onAction();
  };
  return (
    <Dialog.Root open={open}>
      <Dialog.Content maxWidth="650px">
        <Dialog.Title>{props.title}</Dialog.Title>
        <Separator my="4" size="4" />
        <Flex direction="column" gap="3" mt={"6"}>
          {props.children}
        </Flex>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" onClick={() => _close()}>
              {props.closeText}
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={() => _action()}>{props.actionText}</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Modal;
