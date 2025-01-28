"use client";

import Modal from "@/components/Modal";
import { Flex, Table, Button, Spinner, Text } from "@radix-ui/themes";
import { useState } from "react";
import { deleteBook } from "@/services/bookService";

interface Props {
  onEdit: Function | undefined;
  books: Book[] | [];
  onRefreshList: Function | undefined;
  loading: Boolean;
}

const BookList = (props: Props) => {
  const [confirmDelete, setConfirmDelete] = useState<Number | null>(null);

  const _onEdit = (book: Book) => {
    if (!props.onEdit == undefined) return;
    props.onEdit!(book);
  };

  const _remove = async () => {
    try {
      await deleteBook(confirmDelete!);
      setConfirmDelete(null);
      props.onRefreshList!();
    } catch (err) {
      console.log(err);
      setConfirmDelete(null);
    }
  };

  return (
    <Flex direction={"column"}>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Author</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>ISBN</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Qty</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.loading && (
            <Table.Row>
              <Table.Cell colSpan={6}>
                <Flex align={"center"} justify={"center"}>
                  <Spinner loading={true} />
                </Flex>
              </Table.Cell>
            </Table.Row>
          )}
          {props.books.map((book: Book) => {
            return (
              <Table.Row key={book.id.toString()}>
                <Table.RowHeaderCell>{book.title}</Table.RowHeaderCell>
                <Table.Cell>{book.author}</Table.Cell>
                <Table.Cell>{book.ISBN}</Table.Cell>
                <Table.Cell>{book.category.name!.toString()}</Table.Cell>
                <Table.Cell>{book.quantity.toString()}</Table.Cell>
                <Table.Cell>
                  <Flex direction={"row"} gap={"4"}>
                    <Button variant="soft" onClick={() => _onEdit(book)}>
                      Edit
                    </Button>
                    <Button
                      variant="soft"
                      color="crimson"
                      onClick={() => setConfirmDelete(book.id)}
                    >
                      Delete
                    </Button>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
      {confirmDelete && (
        <Modal
          title="Confirmation"
          closeText="Cancel"
          actionText="Delete"
          onClose={() => setConfirmDelete(null)}
          onAction={() => _remove()}
        >
          <Text>Are you sure to remove this book?</Text>
        </Modal>
      )}
    </Flex>
  );
};

export default BookList;
