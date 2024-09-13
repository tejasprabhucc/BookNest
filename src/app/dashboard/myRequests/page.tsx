import React from "react";
import { fetchRequestsByMember, getUserSession } from "@/src/lib/actions";
import {
  ITransaction,
  IPagedResponse,
  IPaginationOptions,
} from "@/src/lib/definitions";
import PaginationControl from "@/src/components/dashboard/pagination";
import Search from "@/src/components/ui/search";
import { ITransactionDetails } from "@/src/repositories/transaction.repository";
import TransactionsTable from "@/src/components/transactions-table";

const MyRequests = async ({
  searchParams,
}: {
  memberId: bigint;
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  let currentPage = Number(searchParams?.page) || 1;
  const searchQuery = searchParams?.query || undefined;
  const limit = 8;
  let requests: ITransactionDetails[] | undefined = [];
  let paginationOptions: IPaginationOptions = {
    offset: 0,
    limit: 8,
    total: 0,
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
      BigInt(memberId)
    )) as IPagedResponse<ITransactionDetails>;

    if (!fetchRequestsResult || !fetchRequestsResult.items.length) {
      requests = [];
      paginationOptions = { ...paginationOptions, total: 0 };
    } else {
      paginationOptions = fetchRequestsResult.pagination;
      requests = fetchRequestsResult.items;
    }
  } catch (error) {
    errorMessage = "No requests found.";
  }

  return (
    <main className="flex flex-1 flex-col gap-2 overflow-y-auto p-4 px-8">
      <h1 className="text-3xl mb-3 font-serif lg:text-5xl">My Requests</h1>
      <div className="flex items-center justify-between">
        <Search placeholder="Search requests..." />
      </div>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : requests.length > 0 ? (
        <TransactionsTable transactions={requests} actions={false} />
      ) : (
        <p>No requests found.</p>
      )}
      <div className="flex justify-center align-middle m-auto my-1">
        {requests.length > 0 ? (
          <PaginationControl
            currentPage={currentPage}
            options={paginationOptions}
          />
        ) : null}
      </div>
    </main>
  );
};

export default MyRequests;
