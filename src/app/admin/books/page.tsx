import React from "react";
import { fetchBooks } from "@/src/lib/actions";
import {
  IBook,
  IPagedResponse,
  IPaginationOptions,
} from "@/src/lib/definitions";
import BooksGrid from "@/src/components/dashboard/booksGrid";
import PaginationControl from "@/src/components/dashboard/pagination";
import Search from "@/src/components/ui/search";
import { CreateButton } from "@/src/components/ui/customButtons";
import BooksTable from "@/src/components/books-table";

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
  const limit = 8;
  let books: IBook[] | undefined = [];
  let paginationOptions: IPaginationOptions = {
    offset: 0,
    limit: 8,
    total: 0,
  };
  let errorMessage: string | null = null;

  try {
    const fetchBooksResult = (await fetchBooks({
      search: searchQuery,
      offset: currentPage * 8 - 8,
      limit: limit,
    })) as IPagedResponse<IBook>;

    if (!fetchBooksResult || !fetchBooksResult.items.length) {
      books = [];
      paginationOptions = { ...paginationOptions, total: 0 };
    } else {
      paginationOptions = fetchBooksResult.pagination;
      books = fetchBooksResult.items;
    }
  } catch (error) {
    errorMessage = "No books found matching search.";
  }

  return (
    <main className=" flex flex-1 flex-col gap-2 overflow-y-auto p-4 px-8 ">
      <h1 className="text-3xl mb-3 font-serif lg:text-6xl">Books</h1>
      <div className=" flex items-center justify-between">
        <Search placeholder="Enter a keyword..." />
        <CreateButton />
      </div>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : books.length > 0 ? (
        <BooksTable books={books} />
      ) : (
        <p>No books found.</p>
      )}
      <div className="flex justify-center align-middle m-auto my-1">
        {books.length > 0 ? (
          <PaginationControl
            currentPage={currentPage}
            options={paginationOptions}
          />
        ) : null}
      </div>
    </main>
  );
};

export default Books;
