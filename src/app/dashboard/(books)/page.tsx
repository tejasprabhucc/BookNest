import React, { Suspense } from "react";
import { fetchBooks } from "@/src/lib/actions";
import {
  IBook,
  IPagedResponse,
  IPaginationOptions,
} from "@/src/lib/definitions";
import BooksGrid from "@/src/components/dashboard/booksGrid";
import PaginationControl from "@/src/components/dashboard/pagination";
import Search from "@/src/components/ui/search";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

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
    console.error("Failed to fetch books:", error);
    throw new Error("Something went wrong while fetching books.");
  }

  return (
    <main className=" flex flex-1 flex-col gap-2 overflow-y-auto p-4 px-8 ">
      <h1 className="text-3xl mb-3 font-serif lg:text-5xl">Books</h1>
      <div className=" flex items-center justify-between">
        <Search placeholder="Enter a keyword..." />
      </div>
      {books.length > 0 ? <BooksGrid books={books} /> : <p>No books found.</p>}
      <div className="flex justify-center align-middle m-auto my-1">
        {books.length > 0 ? (
          <PaginationControl
            currentPage={currentPage}
            options={paginationOptions}
          />
        ) : (
          ""
        )}
      </div>
    </main>
  );
};

export default Books;
