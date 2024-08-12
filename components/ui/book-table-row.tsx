"use client";
import { MoreHorizontal, Edit, Minus } from "lucide-react";
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
 
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import BookFormDialog from "./book-form-dialog";
import { BookType } from "@/app/book-context";
import { BookContext } from "@/app/book-context";
import { useContext } from "react";


export default function BookTableRow({
  id,
  title,
  status,
  rating,
  progress
}:BookType) {

  // @ts-ignore
  const { deleteBook } = useContext(BookContext);

  return (
    <TableRow>
      <TableCell className="font-medium">{title}</TableCell>
      <TableCell>
        <Badge variant="outline">{status}</Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Progress value={status==="completed"?100:status==="wishlist"?0:progress} />
            </TooltipTrigger>
            <TooltipContent>
              <p>{progress}%</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {status==="completed"?rating:<Minus className="h-4 w-4 text-muted-foreground"/>}
      </TableCell>
      <TableCell className="">
        <BookFormDialog action="edit" value={{
          id, title, status, rating, progress
        }}>
          <Button
            aria-haspopup="true"
            size="icon"
            variant="ghost"
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">edit</span>
          </Button>
        </BookFormDialog>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-haspopup="true"
              size="icon"
              variant="ghost"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="visible md:hidden">
              <DropdownMenuLabel>More Info</DropdownMenuLabel>
              <DropdownMenuItem disabled><strong>Progress:</strong> {progress}%</DropdownMenuItem>
              <DropdownMenuItem disabled><strong>Rating:</strong> {status==="completed"?rating:"n/a"}</DropdownMenuItem>
              <DropdownMenuSeparator />
            </div>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => deleteBook(id)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}