"use client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import BookTableRow from "@/components/ui/book-table-row";
import BookFormDialog from "@/components/ui/book-form-dialog";
import { Skeleton } from "@/components/ui/skeleton" 
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { BookContext, BookType } from './book-context';
import { useContext } from "react";

export default function Home() {

  // @ts-ignore
  const { books, addBook, changeStatus, loading } = useContext(BookContext);

  return (
    <div>
      <header className="z-10 sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <b onClick={() => addBook({
          title: 'title2',
          status: 'reading',
          progress: 38,
          rating: null
        })}>
          Book_Keeper
        </b>
      </header>
      <main>
        <section className="max-w-5xl mx-auto px-4 py-4 ">
          <div className="flex justify-between">
            <ToggleGroup 
              type="single" 
              onValueChange={(val) => changeStatus(val)}
              defaultValue="all"
              className="justify-start"
            >
              <ToggleGroupItem value="all">All</ToggleGroupItem>
              <ToggleGroupItem value="reading">Reading</ToggleGroupItem>
              <ToggleGroupItem value="completed">Completed</ToggleGroupItem>
              <ToggleGroupItem value="wishlist">Wishlist</ToggleGroupItem>
            </ToggleGroup>
            <BookFormDialog action="new">
              <Button>Add Book</Button>
            </BookFormDialog>
          </div>
          <Card className="my-4">
            <CardHeader>
              <CardTitle>Books</CardTitle>
              <CardDescription>
                Track the progress of your book reading
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading?(
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ):(
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Progress
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Rating
                      </TableHead>
                      <TableHead>
                        <span className="sr-only">edit</span>
                      </TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {books.map((book:BookType) => (
                      <BookTableRow
                        id={book.id}
                        key={book.id}
                        title={book.title}
                        status={book.status}
                        rating={book.rating}
                        progress={book.progress}
                      />
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
