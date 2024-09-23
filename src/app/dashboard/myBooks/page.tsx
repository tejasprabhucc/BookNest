import React from "react";
import {
  fetchBooks,
  fetchRequestsByMember,
  getUserSession,
} from "@/src/lib/actions";
import {
  IBook,
  IBookBase,
  IPagedResponse,
  IPaginationOptions,
  ITransaction,
  SortOptions,
} from "@/src/lib/definitions";
import BooksGrid from "@/src/components/dashboard/booksGrid";
import PaginationControl from "@/src/components/controls/pagination";
import Search from "@/src/components/navbar/search";
import SortControl from "@/src/components/controls/sortControl";
import { ITransactionDetails } from "@/src/repositories/transaction.repository";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

const MyBooks = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    sort?: keyof ITransaction;
    order?: "asc" | "desc";
  };
}) => {
  let currentPage = Number(searchParams?.page) || 1;
  const searchQuery = searchParams?.query || undefined;
  const limit = 8;
  let books: IBook[] = [];

  let paginationOptions: IPaginationOptions = {
    offset: 0,
    limit: 8,
    total: 0,
  };

  let sortOptions: SortOptions<ITransaction> = {
    sortBy: searchParams?.sort || "id",
    sortOrder: searchParams?.order || "asc",
  };
  let errorMessage: string | null = null;
  const user = await getUserSession();
  const memberId = Number(user?.id);
  try {
    const fetchRequestsResult = (await fetchRequestsByMember(
      {
        search: searchQuery,
        offset: currentPage * 8 - 8,
        limit: limit,
      },
      BigInt(memberId),
      sortOptions
    )) as IPagedResponse<ITransactionDetails>;

    if (!fetchRequestsResult || !fetchRequestsResult.items.length) {
      books = [];
      paginationOptions = { ...paginationOptions, total: 0 };
    } else {
      books = fetchRequestsResult.items
        .filter((item) => item.bookStatus === "issued")
        .map((item) => item.book);
      paginationOptions = {
        ...paginationOptions,
        total: books.length,
      };
    }
  } catch (error) {
    // console.error("Failed to fetch books:", error);
    // throw new Error("Something went wrong while fetching books.");
    errorMessage = "No Books found.";
  }
  const t = await getTranslations("MyBooks");

  return (
    <main className=" flex flex-1 flex-col gap-2 overflow-y-auto p-4 px-8 ">
      <h1 className="text-3xl mb-3 font-serif lg:text-5xl">{t("title")}</h1>
      <div className=" flex items-center justify-between">
        <Search placeholder="Enter a keyword..." />
      </div>
      {books.length > 0 ? (
        <BooksGrid
          books={books}
          userId={Number(user?.id)}
          action={false}
          viewOnly={true}
        />
      ) : (
        <p>No books found.</p>
      )}
      {/* <div className="flex justify-center align-middle m-auto my-1">
        {books.length > 0 ? (
          <PaginationControl
            currentPage={currentPage}
            options={paginationOptions}
          />
        ) : (
          ""
        )}
      </div> */}
    </main>
  );
};

export default MyBooks;
