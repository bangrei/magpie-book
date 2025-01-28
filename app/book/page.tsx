"use client";

import { Flex, Heading, Button } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { fetchBooks } from "@/services/bookService";
import BookForm from "@/components/BookForm";
import ToastNotification from "@/components/Notification";
import Dashboard from "@/components/Dashboard";
import BookList from "@/components/BookList";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [books, setBooks] = useState<Book[] | []>([]);
  const [edit, setEdit] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  const onDone = async (res: any) => {
    if (res?.message) setMessage(res.message);
    setOpenModal(false);
    retrieveBooks();
  };

  const _openModal = (book: Book | null) => {
    setEdit(book);
    setOpenModal(true);
  };

  const retrieveBooks = async () => {
    setLoading(true);
    const res: any = await fetchBooks();
    const data: Book[] = res.books;
    setBooks(res?.books || []);
    setLoading(false);
  };

  useEffect(() => {
    retrieveBooks();
  }, []);

  return (
    <Dashboard>
      <div className="w-full flex flex-col gap-8">
        <Flex justify={"between"}>
          <Heading>Books</Heading>
          <Button onClick={() => _openModal(null)}>New Book</Button>
        </Flex>
        <BookList
          books={books}
          loading={loading}
          onRefreshList={() => fetchBooks()}
          onEdit={(e: any) => _openModal(e)}
        />
        {openModal && (
          <BookForm book={edit!} onDone={(res: any) => onDone(res)} />
        )}
        {message && (
          <ToastNotification message={message} onClose={() => setMessage("")} />
        )}
      </div>
    </Dashboard>
  );
}
