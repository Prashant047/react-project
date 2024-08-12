import { getBooks, updateBook, deleteBook, addBook } from '@/db';

export async function GET(request: Request) {
  const books = await getBooks();
  return Response.json(books);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newBook = await addBook(body);
  return Response.json(newBook);
}

export async function PATCH(request: Request){
  const body = await request.json();
  const updatedBook = await updateBook(body);
  return Response.json({updated:updatedBook});
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const bookDeleted = deleteBook(body.id);
  console.log(body);
  return Response.json({deleted:bookDeleted});
}