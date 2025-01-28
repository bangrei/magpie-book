"use client";

import Modal from "@/components/Modal";
import { Flex, Text, TextField, Button } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { createCategory, editCategory } from "@/services/bookService";
import FormField from "./FormField";

interface Props {
  category: Category | undefined;
  onDone: Function | undefined;
}

const CategoryForm = (props: Props) => {
  const [openModal, setOpenModal] = useState(true);
  const [id, setId] = useState<Number | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const onClosed = () => {
    setOpenModal(false);
    if (props.onDone) props.onDone();
  };

  const save = async () => {
    setOpenModal(false);
    try {
      setLoading(true);
      let res: any;
      if (id) {
        res = await editCategory({
          name: name,
          id: id,
        });
      } else {
        res = await createCategory({
          name: name,
        });
      }
      setLoading(false);
      if (props.onDone)
        props.onDone({
          success: res.success,
          message: `Successfully ${id ? "updated" : "created"}!`,
        });
    } catch (err: any) {
      let message = "Something went wrong!";
      if (err.response?.data?.message) message = err?.response?.data?.message;
      setLoading(false);
      if (props.onDone) props.onDone({ success: false, message: message });
    }
  };

  useEffect(() => {
    if (props.category) {
      setId(props.category!.id);
      setName(props.category!.name.toString());
    }
  }, []);

  return (
    <Modal
      title="New Category"
      actionText="Save"
      closeText="Cancel"
      onClose={() => onClosed()}
      onAction={() => save()}
    >
      <Flex direction="column" gap="4">
        <FormField
          label={"Category"}
          value={name}
          type={"text"}
          isRequired={true}
          onChange={(value: any) => setName(value)}
        />
      </Flex>
    </Modal>
  );
};

export default CategoryForm;
