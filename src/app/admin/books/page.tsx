import React from "react";
import { fetchBooks, getUserSession } from "@/src/lib/actions";
import {
  IBook,
  IBookBase,
  IPagedResponse,
  IPaginationOptions,
  SortOptions,
} from "@/src/lib/definitions";
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
    sort?: keyof IBookBase;
    order?: "asc" | "desc";
  };
}) => {
  const user = await getUserSession();
  const userId = Number(user?.id);

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
    let sortOptions: SortOptions<IBook> = {
      sortBy: searchParams?.sort || "id",
      sortOrder: searchParams?.order || "asc",
    };
    const fetchBooksResult = (await fetchBooks(
      {
        search: searchQuery,
        offset: currentPage * 8 - 8,
        limit: limit,
      },
      undefined,
      sortOptions
    )) as IPagedResponse<IBook>;

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
      <h1 className="text-3xl mb-3 font-serif lg:text-5xl">Books</h1>
      <div className=" flex items-center justify-between">
        <Search placeholder="Enter a keyword..." />
        <CreateButton url="/admin/books/create" label="Add Book" />
      </div>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : books.length > 0 ? (
        <BooksTable books={books} userId={userId} />
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
