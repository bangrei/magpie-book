"use client";

import { Flex, Heading, Button } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import ToastNotification from "@/components/Notification";
import Dashboard from "@/components/Dashboard";
import CategoryForm from "@/components/CategoryForm";
import CategoryList from "@/components/CategoryList";
import { fetchCategory } from "@/services/bookService";

const CategoryPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [edit, setEdit] = useState<Category | undefined>(undefined);
  const [categories, setCategories] = useState<Category[] | []>([]);

  const onDone = async (res: any) => {
    if (res?.message) setMessage(res.message);
    setOpenModal(false);
  };

  const _closeMessage = () => {
    setMessage("");
    fetchCategories();
  };

  const _openModal = (category: Category | undefined) => {
    setEdit(category!);
    setOpenModal(true);
  };

  const fetchCategories = async () => {
    const json: any = await fetchCategory();
    const data: Category[] = json.categories || [];
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Dashboard>
      <div className="w-full flex flex-col gap-8">
        <Flex justify={"between"}>
          <Heading>Categories</Heading>
          <Button onClick={() => _openModal(undefined)}>New Category</Button>
        </Flex>
        <CategoryList
          categories={categories}
          onRefreshList={() => fetchCategories()}
          onEdit={(e: any) => _openModal(e)}
        />
        {openModal && (
          <CategoryForm category={edit!} onDone={(res: any) => onDone(res)} />
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

export default CategoryPage;
