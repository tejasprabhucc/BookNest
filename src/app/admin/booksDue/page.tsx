import React from "react";
import { fetchDueTransactions, fetchTransactions } from "@/src/lib/actions";
import {
  FilterOptions,
  IPagedResponse,
  IPaginationOptions,
  ITransaction,
  SortOptions,
} from "@/src/lib/definitions";
import PaginationControl from "@/src/components/controls/pagination";
import Search from "@/src/components/navbar/search";
import TransactionsTable from "@/src/components/dashboard/transactions-table"; // Ensure you have this component
import { ITransactionDetails } from "@/src/repositories/transaction.repository";
import DueFilterControl from "@/src/components/controls/dueFilterControl";

const BooksDue = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    filter?: string; // 'today', 'tomorrow', 'overdue', 'all'
  };
}) => {
  let currentPage = Number(searchParams?.page) || 1;
  const searchQuery = searchParams?.query || undefined;
  const filterOption = searchParams?.filter || "all";
  const limit = 8;
  let transactions: ITransactionDetails[] | undefined = [];
  let paginationOptions: IPaginationOptions = {
    offset: 0,
    limit: 8,
    total: 0,
  };

  const today = new Date();
  let errorMessage: string | null = null;

  try {
    const fetchTransactionsResult = (await fetchDueTransactions({
      search: searchQuery,
      offset: currentPage * 8 - 8,
      limit: limit,
    })) as IPagedResponse<ITransactionDetails>;

    console.log(fetchTransactionsResult);
    const today = new Date().toDateString();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowFormatted = tomorrow.toDateString();
    const filteredDueRequest = fetchTransactionsResult.items.filter((trxn) => {
      if (filterOption === "today") {
        return trxn.dueDate === today;
      } else if (filterOption === "tomorrow") {
        return trxn.dueDate === tomorrowFormatted;
      } else if (filterOption === "overdue") {
        return new Date(trxn.dueDate!).getTime() < new Date(today).getTime();
      } else if (filterOption === "all") {
        return true;
      }
      return false; // Default case if no filterOption matches
    });

    console.log("Today: ", today);
    console.log("Tomorrow: ", tomorrowFormatted);
    console.log("Filtered: ", filteredDueRequest);

    if (!filteredDueRequest) {
      transactions = [];
    } else {
      transactions = filteredDueRequest;
    }
  } catch (error) {
    errorMessage = "No transactions found.";
  }

  return (
    <main className="flex flex-1 flex-col gap-2 overflow-y-auto p-4 px-8">
      <h1 className="text-3xl mb-3 font-serif lg:text-5xl">Books Due</h1>
      <div className="flex items-center justify-between">
        <Search placeholder="Enter a keyword..." />
        <DueFilterControl />
      </div>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : transactions.length > 0 ? (
        <TransactionsTable transactions={transactions} actions={true} />
      ) : (
        <p>No transactions found.</p>
      )}
      {/* <div className="flex justify-center align-middle m-auto my-1">
        {transactions.length > 0 ? (
          <PaginationControl
            currentPage={currentPage}
            options={paginationOptions}
          />
        ) : null}
      </div> */}
    </main>
  );
};

export default BooksDue;
