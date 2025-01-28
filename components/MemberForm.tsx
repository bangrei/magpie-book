"use client";

import Modal from "@/components/Modal";
import { Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { createMember, editMember } from "@/services/authService";
import FormField from "./FormField";
import FormSelection from "./FormSelection";

interface Props {
  member: Member | undefined;
  onDone: Function | undefined;
}

const MemberForm = (props: Props) => {
  const [openModal, setOpenModal] = useState(true);
  const [id, setId] = useState<Number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const onClosed = () => {
    setOpenModal(false);
    if (props.onDone) props.onDone();
  };

  const save = async () => {
    setOpenModal(false);
    console.log(status);
    try {
      setLoading(true);
      let res: any;
      if (id) {
        res = await editMember({
          id: id,
          name: name,
          email: email,
          status: status,
        });
      } else {
        res = await createMember({
          name: name,
          email: email,
          status: status,
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
    if (props.member) {
      setId(props.member!.id);
      setName(props.member!.user.name.toString());
      setEmail(props.member!.user.email.toString());
      setStatus(props.member!.status.toString());
    }
  }, []);

  return (
    <Modal
      title="New Member"
      actionText="Save"
      closeText="Cancel"
      onClose={() => onClosed()}
      onAction={() => save()}
    >
      <Flex direction="column" gap="4">
        <FormField
          label={"Name"}
          value={name}
          type={"text"}
          isRequired={true}
          onChange={(value: any) => setName(value)}
        />
        <FormField
          label={"Email Address"}
          value={email}
          type={"email"}
          isRequired={true}
          onChange={(value: any) => setEmail(value)}
        />
        <FormSelection
          items={[
            { id: "ACTIVE", name: "ACTIVE" },
            { id: "DRAFT", name: "DRAFT" },
          ]}
          label={"Status"}
          defaultValue={status}
          onChange={(val: any) => setStatus(val)}
        />
      </Flex>
    </Modal>
  );
};

export default MemberForm;
