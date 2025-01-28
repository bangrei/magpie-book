"use client";

import { Flex, Text, TextField } from "@radix-ui/themes";

interface Props {
  onChange: Function;
  value: string | number | undefined;
  type: any;
  isRequired: boolean | undefined;
  label: String;
}

const FormField = (props: Props) => {
  return (
    <Flex direction="column" gap="2">
      <Text>{props.label}</Text>
      <TextField.Root
        radius="small"
        size="3"
        value={props.value}
        type={props.type}
        onChange={(e) => props.onChange(e.target.value)}
        required={props.isRequired}
      />
    </Flex>
  );
};

export default FormField;
