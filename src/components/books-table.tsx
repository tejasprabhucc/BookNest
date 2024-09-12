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
import {
  BorrowButton,
  DeleteButton,
  EditButton,
} from "@/src/components/ui/customButtons";

const BooksTable = ({ books, userId }: { books: IBook[]; userId: number }) => {
  return (
    <Table className="w-full sortable">
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
          <TableHead>Borrow</TableHead>
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
              {book.availableNumOfCopies > 0 ? (
                <p>{book.availableNumOfCopies}</p>
              ) : (
                <p className="text-red-600">Unavailable</p>
              )}
            </TableCell>
            <TableCell>
              {book.availableNumOfCopies > 0 && (
                <BorrowButton
                  data={{ bookId: BigInt(book.id), memberId: BigInt(userId) }}
                />
              )}
            </TableCell>
            <TableCell>
              <EditButton url={`/admin/books/${book.id}/edit`} />
            </TableCell>
            <TableCell>
              <DeleteButton data={book} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BooksTable;
