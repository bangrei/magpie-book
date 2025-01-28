"use client";

import { Flex, Heading, Button } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import ToastNotification from "@/components/Notification";
import Dashboard from "@/components/Dashboard";
import { fetchMembers } from "@/services/authService";
import MemberList from "@/components/MemberList";
import MemberForm from "@/components/MemberForm";

const MembersPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [edit, setEdit] = useState<Member | undefined>(undefined);
  const [members, setMembers] = useState<Member[] | []>([]);

  const onDone = async (res: any) => {
    if (res?.message) setMessage(res.message);
    setOpenModal(false);
  };

  const _closeMessage = () => {
    setMessage("");
    retrieveMembers();
  };

  const _openModal = (member: Member | undefined) => {
    setEdit(member!);
    setOpenModal(true);
  };

  const retrieveMembers = async () => {
    const json: any = await fetchMembers(null);
    const data: Member[] = json.members || [];
    setMembers(data);
  };

  useEffect(() => {
    retrieveMembers();
  }, []);

  return (
    <Dashboard>
      <div className="w-full flex flex-col gap-8">
        <Flex justify={"between"}>
          <Heading>Members</Heading>
          <Button onClick={() => _openModal(undefined)}>New Member</Button>
        </Flex>
        <MemberList
          members={members}
          onRefreshList={() => retrieveMembers()}
          onEdit={(e: any) => _openModal(e)}
        />
        {openModal && (
          <MemberForm member={edit!} onDone={(res: any) => onDone(res)} />
        )}
        {message && (
          <ToastNotification
            message={message}
            onClose={() => _closeMessage()}
          />
        )}
      </div>
    </Dashboard>
  );
};

export default MembersPage;
