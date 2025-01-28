"use client";

import { Flex, Table, Button, Text } from "@radix-ui/themes";
import { useState } from "react";
import { deleteMember } from "@/services/authService";
import Modal from "./Modal";

interface Props {
  onEdit: Function | undefined;
  members: Member[] | [];
  onRefreshList: Function | undefined;
}

const MemberList = (props: Props) => {
  const [confirmDelete, setConfirmDelete] = useState<Number | null>(null);

  const _onEdit = (member: Member) => {
    if (!props.onEdit == undefined) return;
    props.onEdit!(member);
  };

  const _remove = async () => {
    await deleteMember(confirmDelete!);
    setConfirmDelete(null);
    props.onRefreshList!();
  };

  return (
    <Flex direction={"column"}>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Joined Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.members.map((m: Member) => {
            return (
              <Table.Row key={m.id.toString()}>
                <Table.RowHeaderCell>{m.user.name}</Table.RowHeaderCell>
                <Table.RowHeaderCell>{m.user.email}</Table.RowHeaderCell>
                <Table.RowHeaderCell>{m.status}</Table.RowHeaderCell>
                <Table.RowHeaderCell>
                  {new Date(m.joinedDate.toString()).toDateString()}
                </Table.RowHeaderCell>
                <Table.Cell>
                  <Flex direction={"row"} gap={"4"}>
                    <Button variant="soft" onClick={() => _onEdit(m)}>
                      Edit
                    </Button>
                    <Button
                      variant="soft"
                      color="crimson"
                      onClick={() => setConfirmDelete(m.id)}
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
          <Text>Are you sure to remove this member?</Text>
        </Modal>
      )}
    </Flex>
  );
};
export default MemberList;
