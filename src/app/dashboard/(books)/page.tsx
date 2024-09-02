import React from "react";
import { listBooks } from "@/src/lib/actions";
import { IBook } from "@/src/lib/definitions";
import BooksGrid from "@/src/components/dashboard/booksGrid";
import PaginationControl from "@/src/components/dashboard/pagination";

const Books = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  let currentPage = Number(searchParams?.page) || 1;
  const searchQuery = searchParams?.query || undefined;
  const limit = 5;

  const fetchBooksResult = await listBooks({
    search: searchQuery,
    offset: currentPage * 5 - 5,
    limit: limit,
  });

  if (!fetchBooksResult) {
    throw Error("Something went wrong");
  }

  const paginationOptions = fetchBooksResult.pagination;
  const books: IBook[] | undefined = fetchBooksResult.items;

  return (
    <main className="flex-1 overflow-auto p-8 ">
      <div className="w-full flex justify-between">
        <h1 className="text-3xl mb-3 font-serif lg:text-6xl">Books</h1>
        <div className="">
          <PaginationControl
            currentPage={currentPage}
            options={paginationOptions}
          />
        </div>
      </div>
      {books ? <BooksGrid books={books} /> : <p>No books found.</p>}
    </main>
  );
};

export default Books;
