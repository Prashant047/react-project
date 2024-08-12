"use client";
import { createContext, ReactNode, useEffect, useState } from 'react';

export type BookType = {
  id: number,
  title: string,
  status: string,
  progress: number,
  rating: number,
}

async function getBooks(){
  const books = await fetch('/api/books');
  const booksJSON = await books.json();
  return booksJSON;
}

export const BookContext = createContext({});

export function BookContextProvider({children}:{children: ReactNode}){
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init(){
      setLoading(true);
      const initialBooks:BookType[] = await getBooks();
      setLoading(false);
      setBooks(initialBooks);
    }
    init();
  },[]);

  const updateBook = async (changedBook:BookType) => {
    const response = await fetch("/api/books", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changedBook),
    });

    const responseJSON = await response.json();
    if (!responseJSON.updated){
      return
    }

    let updatedBookList = [...books];
    updatedBookList = updatedBookList.map(book => {
      if (book.id === changedBook.id){
        return {
          ...book,
          ...changedBook
        };
      }
      return book;
    });

    setBooks(updatedBookList);
  }
  
  const deleteBook = async (id:number) => {
    const response = await fetch("/api/books", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id}),
    });
    const responseJSON = await response.json();
    if (!responseJSON.deleted){
      return
    }

    let updatedBookList = [...books];
    updatedBookList = updatedBookList.filter(book => book.id !== id);
    setBooks(updatedBookList);
  }
  
  const changeStatus = async (status:"all" | "completed" | "reading" | "wishlist") => {
    let tempBooks:BookType[] = [];
    
    if (status === "all") {
      tempBooks = await getBooks();
    } else if (status == "completed") {
      tempBooks = await getBooks();
      tempBooks = tempBooks.filter(book => book.status === "completed");
    } else if (status == "reading") {
      tempBooks = await getBooks();
      tempBooks = tempBooks.filter(book => book.status === "reading");
    } else if (status == "wishlist") {
      tempBooks = await getBooks();
      tempBooks = tempBooks.filter(book => book.status === "wishlist");
    }
    
    setBooks(tempBooks);
  }
  
  const addBook = async (newBook:BookType) => {
    const response = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });
    const responseJSON:BookType = await response.json();

    setBooks([responseJSON, ...books]);
    return responseJSON;
  }

  const value = {
    updateBook,
    changeStatus,
    deleteBook,
    addBook,
    setBooks,
    loading,
    books,
  }

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  )
}