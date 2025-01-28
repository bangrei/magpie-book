import { Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import Footer from "./Footer";
import { ReactElement } from "react";

interface Props {
  children: ReactElement | undefined;
}

const Dashboard = (props: Props) => {
  const menu = [
    {
      name: "Books",
      path: "/book",
    },
    {
      name: "Lendings",
      path: "/lending",
    },
    {
      name: "Members",
      path: "/members",
    },
    {
      name: "Category",
      path: "/category",
    },
  ];
  return (
    <div className="flex w-full">
      <aside className="w-full max-w-[200px] flex flex-col border-r border-r-slate-200">
        <Flex p={"4"} mb={"4"}>
          <Heading>Magpie</Heading>
        </Flex>
        <Flex direction={"column"} gap={"4"}>
          {menu.map((m: any) => {
            return (
              <Flex px={"4"} className="cursor-pointer" key={m.name}>
                <Link href={m.path}>{m.name}</Link>
              </Flex>
            );
          })}
        </Flex>
      </aside>
      <div className="flex-1 grid grid-rows-[20px_1fr_20px] min-h-[calc(100vh-1.8rem)]">
        <main className="w-full flex flex-col gap-8 row-start-2 p-4">
          {props.children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
