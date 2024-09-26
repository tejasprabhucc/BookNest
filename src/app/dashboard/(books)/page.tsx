import React from "react";
import { fetchBooks, getUserByEmail, getUserSession } from "@/src/lib/actions";
import {
  IBook,
  IBookBase,
  IMember,
  IPagedResponse,
  IPaginationOptions,
  SortOptions,
} from "@/src/lib/definitions";
import BooksGrid from "@/src/components/dashboard/booksGrid";
import PaginationControl from "@/src/components/controls/pagination";
import Search from "@/src/components/navbar/search";
import SortControl from "@/src/components/controls/sortControl";
import { User } from "lucide-react";
import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

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
  let currentPage = Number(searchParams?.page) || 1;
  const searchQuery = searchParams?.query || undefined;
  const limit = 8;
  let books: IBook[] | undefined = [];
  let paginationOptions: IPaginationOptions = {
    offset: 0,
    limit: 8,
    total: 0,
  };

  let sortOptions: SortOptions<IBook> = {
    sortBy: searchParams?.sort || "id",
    sortOrder: searchParams?.order || "asc",
  };
  let errorMessage: string | null = null;
  try {
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
    errorMessage = "No requests found.";
  }

  const session = await getUserSession();
  if (!session) {
    redirect("/login");
  }
  const userEmail = session.email;
  const image = session.image;

  const userData = (await getUserByEmail(userEmail)) as IMember;
  const t = await getTranslations("Books");

  return (
    <main className=" flex flex-1 flex-col gap-2 p-4 px-8 ">
      <h1 className="text-3xl font-bold my-6 lg:text-5xl">{t("title")}</h1>
      <div className=" flex items-center justify-between flex-col md:flex-row">
        <Search placeholder="Enter a keyword..." />
        <SortControl sortOptions={sortOptions} />
      </div>
      {books.length > 0 ? (
        <BooksGrid
          books={books}
          userId={userData.id}
          action={true}
          viewOnly={false}
        />
      ) : (
        <p>No books found.</p>
      )}
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
