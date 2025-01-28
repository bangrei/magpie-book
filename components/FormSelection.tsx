"use client";

import { Flex, Select, Text, TextField } from "@radix-ui/themes";

interface Props {
  onChange: Function;
  items: any[] | [];
  label: String;
  defaultValue: string | undefined;
}

const FormSelection = (props: Props) => {
  return (
    <Flex direction="column" gap="2">
      <Text>{props.label}</Text>
      <Select.Root
        size="3"
        defaultValue={props.defaultValue}
        onValueChange={(val) => props.onChange(val)}
      >
        <Select.Trigger />
        <Select.Content>
          {props.items.map((c: any) => {
            return (
              <Select.Item value={c.id} key={c.id}>
                {c.name}
              </Select.Item>
            );
          })}
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};

export default FormSelection;
