import fs from 'fs';
import { BookType } from './app/book-context';


export async function getBooks(){
  const booksBytes = fs.readFileSync('./data.json');
  const books: BookType[] = JSON.parse(booksBytes.toString());
  return books;
}

export async function addBook(newBook:BookType) {
  try {
    const booksBytes = fs.readFileSync('./data.json');
    let books: BookType[] = JSON.parse(booksBytes.toString());
    books = [{...newBook, id: books[0].id + 1}, ...books];

    fs.writeFileSync('./data.json', JSON.stringify(books, null, 2));
    return books[0];
  } catch (error) {
    console.log("error adding book:", error);
    return null;
  }
}

export async function updateBook(newBook:BookType) {
  try{
    const booksBytes = fs.readFileSync('./data.json');
    let books: BookType[] = JSON.parse(booksBytes.toString());

    books = books.map((book) => {
      if (book.id === newBook.id) {
        return {
          ...book,
          ...newBook
        };
      }
      return book;
    });
    
    fs.writeFileSync('./data.json', JSON.stringify(books, null, 2));
  } catch (error ) {
    console.log("error updating books: ", error);
    return false;
  }
  return true;
}

export async function deleteBook(id:number) {
  try {
    const booksBytes = fs.readFileSync('./data.json');
    let books: BookType[] = JSON.parse(booksBytes.toString());

    books = books.filter(book => book.id !== id);
    fs.writeFileSync('./data.json', JSON.stringify(books, null, 2));
  } catch (error) {
    console.log("error deleting books: ", error);
    return false;
  }
  return true;
}


