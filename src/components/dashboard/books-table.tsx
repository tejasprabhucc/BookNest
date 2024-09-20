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
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
} from "lucide-react";
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
            sortOptions={sortOptions}
          />
          <SortableHeader
            column="author"
            handleSortChange={handleSortChange}
            label="Author"
            sortOptions={sortOptions}
          />
          <SortableHeader
            column="publisher"
            handleSortChange={handleSortChange}
            label="Publisher"
            sortOptions={sortOptions}
          />
          <SortableHeader
            column="genre"
            handleSortChange={handleSortChange}
            label="Genre"
            sortOptions={sortOptions}
          />
          <SortableHeader
            column="isbnNo"
            handleSortChange={handleSortChange}
            label="ISBN"
            sortOptions={sortOptions}
          />
          <SortableHeader
            column="numOfPages"
            handleSortChange={handleSortChange}
            label="Pages"
            sortOptions={sortOptions}
          />
          <SortableHeader
            column="price"
            handleSortChange={handleSortChange}
            label="Price (₹)"
            sortOptions={sortOptions}
          />
          <SortableHeader
            column="totalNumOfCopies"
            handleSortChange={handleSortChange}
            label="Copies"
            sortOptions={sortOptions}
          />
          <SortableHeader
            column="availableNumOfCopies"
            handleSortChange={handleSortChange}
            label="Available"
            sortOptions={sortOptions}
          />
          <TableHead className="font-bold text-md">Borrow</TableHead>
          <TableHead className="font-bold text-md">Edit</TableHead>
          <TableHead className="font-bold text-md">Delete</TableHead>
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
  sortOptions,
}: {
  column: keyof IBook;
  handleSortChange: (column: string) => void;
  label: string;
  sortOptions: SortOptions<IBook>;
}) => (
  <TableHead className="hidden sm:table-cell">
    <Button
      variant="ghost"
      onClick={() => handleSortChange(column)}
      className="w-full flex flex-1 font-bold text-md justify-between hover:bg-transparent focus:outline-none p-0"
    >
      {label}
      {sortOptions.sortBy === column ? (
        sortOptions.sortOrder === "asc" ? (
          <ChevronUp className="ml-1 h-5 w-5" />
        ) : (
          <ChevronDown className="ml-1 h-5 w-5" />
        )
      ) : (
        <ChevronsUpDown className="ml-1 h-5 w-5 opacity-25" />
      )}
    </Button>
  </TableHead>
);

export default BooksTable;
