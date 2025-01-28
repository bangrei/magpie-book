"use client";

import { Flex, Table, Button, Text } from "@radix-ui/themes";
import { useState } from "react";
import { deleteCategory } from "@/services/bookService";
import Modal from "./Modal";

interface Props {
  onEdit: Function | undefined;
  categories: Category[] | [];
  onRefreshList: Function | undefined;
}

const CategoryList = (props: Props) => {
  const [confirmDelete, setConfirmDelete] = useState(null);

  const _onEdit = (category: Category) => {
    if (!props.onEdit == undefined) return;
    props.onEdit!(category);
  };

  const _remove = async () => {
    await deleteCategory(confirmDelete!);
    setConfirmDelete(null);
    props.onRefreshList!();
  };

  return (
    <Flex direction={"column"}>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.categories.map((c: any) => {
            return (
              <Table.Row key={c.name}>
                <Table.RowHeaderCell>{c.name}</Table.RowHeaderCell>
                <Table.Cell>
                  <Flex direction={"row"} gap={"4"}>
                    <Button variant="soft" onClick={() => _onEdit(c)}>
                      Edit
                    </Button>
                    <Button
                      variant="soft"
                      color="crimson"
                      onClick={() => setConfirmDelete(c.id)}
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
          actionText="Yes"
          onClose={() => setConfirmDelete(null)}
          onAction={() => _remove()}
        >
          <Text>Are you sure to remove this category?</Text>
        </Modal>
      )}
    </Flex>
  );
};
export default CategoryList;
