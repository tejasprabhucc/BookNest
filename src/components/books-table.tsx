"use client";
import React from "react";
import { IBook } from "@/src/lib/definitions";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import { DeleteButton, EditButton } from "@/src/components/ui/customButtons";

const BooksTable = ({ books }: { books: IBook[] }) => {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="hidden sm:table-cell">Title</TableHead>
          <TableHead className="hidden sm:table-cell">Author</TableHead>
          <TableHead className="hidden sm:table-cell">Publisher</TableHead>
          <TableHead className="hidden sm:table-cell">Genre</TableHead>
          <TableHead className="hidden sm:table-cell">ISBN</TableHead>
          <TableHead className="hidden sm:table-cell">Pages</TableHead>
          <TableHead className="hidden sm:table-cell">Total Copies</TableHead>
          <TableHead className="hidden sm:table-cell">Available</TableHead>
          <TableHead>Edit</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.map((book) => (
          <TableRow key={book.id}>
            <TableCell className="font-medium sm:table-cell">
              {book.title}
            </TableCell>
            <TableCell className="sm:table-cell">{book.author}</TableCell>
            <TableCell className="sm:table-cell">{book.publisher}</TableCell>
            <TableCell className="sm:table-cell">{book.genre}</TableCell>
            <TableCell className="sm:table-cell">{book.isbnNo}</TableCell>
            <TableCell className="sm:table-cell">{book.numOfPages}</TableCell>
            <TableCell className="sm:table-cell">
              {book.totalNumOfCopies}
            </TableCell>
            <TableCell className="sm:table-cell">
              {book.availableNumOfCopies}
            </TableCell>
            <TableCell>
              <EditButton url={`/admin/books/${book.id}/edit`} />
            </TableCell>
            <TableCell>
              <DeleteButton bookId={book.id} bookTitle={book.title} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BooksTable;
