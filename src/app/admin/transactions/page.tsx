import React from "react";
import { fetchTransactions } from "@/src/lib/actions";
import { IPagedResponse, IPaginationOptions } from "@/src/lib/definitions";
import PaginationControl from "@/src/components/dashboard/pagination";
import Search from "@/src/components/ui/search";
import TransactionsTable from "@/src/components/transactions-table"; // Ensure you have this component
import { ITransactionDetails } from "@/src/repositories/transaction.repository";

const Transactions = async ({
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
  let transactions: ITransactionDetails[] | undefined = [];
  let paginationOptions: IPaginationOptions = {
    offset: 0,
    limit: 8,
    total: 0,
  };
  let errorMessage: string | null = null;

  try {
    const fetchTransactionsResult = (await fetchTransactions({
      search: searchQuery,
      offset: currentPage * 8 - 8,
      limit: limit,
    })) as IPagedResponse<ITransactionDetails>;

    if (!fetchTransactionsResult || !fetchTransactionsResult.items.length) {
      transactions = [];
      paginationOptions = { ...paginationOptions, total: 0 };
    } else {
      paginationOptions = fetchTransactionsResult.pagination;
      transactions = fetchTransactionsResult.items;
    }
  } catch (error) {
    errorMessage = "No transactions found.";
  }

  return (
    <main className="flex flex-1 flex-col gap-2 overflow-y-auto p-4 px-8">
      <h1 className="text-3xl mb-3 font-serif lg:text-5xl">Transactions</h1>
      <div className="flex items-center justify-between">
        <Search placeholder="Enter a keyword..." />
      </div>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : transactions.length > 0 ? (
        <TransactionsTable transactions={transactions} actions={true} />
      ) : (
        <p>No transactions found.</p>
      )}
      <div className="flex justify-center align-middle m-auto my-1">
        {transactions.length > 0 ? (
          <PaginationControl
            currentPage={currentPage}
            options={paginationOptions}
          />
        ) : null}
      </div>
    </main>
  );
};

export default Transactions;
