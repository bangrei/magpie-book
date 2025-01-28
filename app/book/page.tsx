"use client";

import { Flex, Heading, Button, TextField } from "@radix-ui/themes";
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
  const [keyword, setKeyword] = useState("");

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
    const res: any = await fetchBooks(keyword);
    const data: Book[] = res.books;
    setBooks(res?.books || []);
    setLoading(false);
  };

  useEffect(() => {
    let typingTimer: any;
    const typingDelay = 1000;
    const fetchResults = () => {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => {
        retrieveBooks();
      }, typingDelay);
    };
    fetchResults();
  }, [keyword]);

  return (
    <Dashboard>
      <div className="w-full flex flex-col gap-8">
        <Flex justify={"between"}>
          <Heading>Books</Heading>
          <Button onClick={() => _openModal(null)}>New Book</Button>
        </Flex>
        <Flex>
          <TextField.Root
            radius="small"
            size="3"
            value={keyword}
            type="text"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search book"
          />
        </Flex>
        <BookList
          books={books}
          loading={loading}
          onRefreshList={() => retrieveBooks()}
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
