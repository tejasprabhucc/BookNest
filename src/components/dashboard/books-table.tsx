"use client";
import React from "react";
import { IBook, IBookBase, SortOptions } from "@/src/lib/definitions";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/src/components/ui/table";
import {
  BorrowButton,
  DeleteButton,
  EditButton,
} from "@/src/components/ui/customButtons";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const BooksTable = ({
  books,
  userId,
  sortOptions,
}: {
  books: IBook[];
  userId: number;
  sortOptions: SortOptions<IBook>;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSortChange = (column: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("sort", column);
    newSearchParams.set(
      "order",
      sortOptions.sortOrder === "asc" ? "desc" : "asc"
    );
    replace(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <Table className="w-full sortable">
      <TableHeader>
        <TableRow>
          <SortableHeader
            column="title"
            handleSortChange={handleSortChange}
            label="Title"
          />
          <SortableHeader
            column="author"
            handleSortChange={handleSortChange}
            label="Author"
          />
          <SortableHeader
            column="publisher"
            handleSortChange={handleSortChange}
            label="Publisher"
          />
          <SortableHeader
            column="genre"
            handleSortChange={handleSortChange}
            label="Genre"
          />
          <SortableHeader
            column="isbnNo"
            handleSortChange={handleSortChange}
            label="ISBN"
          />
          <SortableHeader
            column="numOfPages"
            handleSortChange={handleSortChange}
            label="Pages"
          />
          <SortableHeader
            column="price"
            handleSortChange={handleSortChange}
            label="Price (₹)"
          />
          <SortableHeader
            column="totalNumOfCopies"
            handleSortChange={handleSortChange}
            label="Copies"
          />
          <SortableHeader
            column="availableNumOfCopies"
            handleSortChange={handleSortChange}
            label="Available"
          />
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
            <TableCell className="sm:table-cell">{book.price}</TableCell>
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
            <TableCell className="sm:table-cell">
              {book.availableNumOfCopies > 0 && (
                <BorrowButton
                  data={{ bookId: BigInt(book.id), memberId: BigInt(userId) }}
                />
              )}
            </TableCell>
            <TableCell className="sm:table-cell">
              <EditButton url={`/admin/books/${book.id}/edit`} />
            </TableCell>
            <TableCell className="sm:table-cell">
              <DeleteButton data={book} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const SortableHeader = ({
  column,
  handleSortChange,
  label,
}: {
  column: keyof IBook;
  handleSortChange: (column: string) => void;
  label: string;
}) => (
  <TableHead className="hidden sm:table-cell">
    <Button
      variant="ghost"
      onClick={() => handleSortChange(column)}
      className="hover:bg-transparent focus:outline-none p-0 "
    >
      {label}
      <ArrowUpDown className="ml-1 h-4 w-4" />
    </Button>
  </TableHead>
);

export default BooksTable;
