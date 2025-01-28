"use client";

import Modal from "@/components/Modal";
import { Flex, Text, TextField, Select, Spinner } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { createBook, fetchCategory, editBook } from "@/services/bookService";
import FormField from "./FormField";
import FormSelection from "./FormSelection";

interface Props {
  onDone: Function | undefined;
  book: Book;
}

const BookForm = (props: Props) => {
  const [openModal, setOpenModal] = useState(true);
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [author, setAuthor] = useState("");
  const [categoryId, setCategoryId] = useState<Number | null>(null);
  const [categories, setCategories] = useState<Category[] | []>([]);
  const [qty, setQty] = useState("");
  const [loading, setLoading] = useState(true);

  const prefillForm = () => {
    if (props.book != null) {
      setCategoryId(props.book.category.id);
      setTitle(props.book.title!.toString());
      setIsbn(props.book.ISBN!.toString());
      setAuthor(props.book.author!.toString());
      setQty(props.book.quantity!.toString());
    }
  };

  const onClosed = () => {
    setOpenModal(false);
    if (props.onDone) props.onDone();
  };

  const saveBook = async () => {
    if (loading) return;
    if (!title || !author || !isbn || qty == "" || !categoryId) {
      return;
    }
    setOpenModal(false);
    try {
      setLoading(true);
      let res: any;
      if (props.book) {
        res = await editBook({
          id: props.book.id,
          title: title,
          author: author,
          ISBN: isbn,
          quantity: parseInt(qty),
          categoryId: categoryId,
        });
      } else {
        res = await createBook({
          title: title,
          author: author,
          ISBN: isbn,
          quantity: parseInt(qty),
          categoryId: categoryId,
        });
      }
      setLoading(false);
      if (props.onDone)
        props.onDone({
          success: res.success,
          message: "Successfully created!",
        });
    } catch (err: any) {
      let message = "Something went wrong!";
      if (err.response?.data?.message) message = err?.response?.data?.message;
      setLoading(false);
      if (props.onDone) props.onDone({ success: false, message: message });
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    const res: any = await fetchCategory();
    const data: Category[] | [] = res?.categories || [];
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    prefillForm();
    fetchCategories();
  }, []);

  return (
    <Modal
      title="New Book"
      actionText="Save"
      closeText="Cancel"
      onClose={() => onClosed()}
      onAction={() => saveBook()}
    >
      <Flex direction="column">
        <Flex direction={"column"}>
          {loading && (
            <Flex
              minHeight={"400px"}
              direction={"column"}
              align={"center"}
              justify={"center"}
            >
              <Spinner loading={true} />
            </Flex>
          )}
          {!loading && (
            <Flex direction={"column"} gap={"4"}>
              <FormSelection
                items={categories}
                label={"Category"}
                defaultValue={categoryId?.toString()}
                onChange={(val: any) => setCategoryId(parseInt(val))}
              />
              <FormField
                label={"Title"}
                value={title}
                type={"text"}
                isRequired={true}
                onChange={(val: any) => setTitle(val)}
              />
              <FormField
                label={"Author"}
                value={author}
                type={"text"}
                isRequired={true}
                onChange={(val: any) => setAuthor(val)}
              />
              <FormField
                label={"ISBN"}
                value={isbn}
                type={"text"}
                isRequired={true}
                onChange={(val: any) => setIsbn(val)}
              />
              <FormField
                label={"Quantity"}
                value={qty}
                type={"number"}
                isRequired={true}
                onChange={(val: any) => setQty(val)}
              />
            </Flex>
          )}
        </Flex>
      </Flex>
    </Modal>
  );
};

export default BookForm;
