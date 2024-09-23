import React from "react";
import { fetchMembers } from "@/src/lib/actions";
import {
  IMember,
  IPagedResponse,
  IPaginationOptions,
} from "@/src/lib/definitions";
import PaginationControl from "@/src/components/controls/pagination";
import Search from "@/src/components/navbar/search";
import { CreateButton } from "@/src/components/ui/customButtons";
import MembersTable from "@/src/components/dashboard/members-table";

const Members = async ({
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
  let members: IMember[] | undefined = [];
  let paginationOptions: IPaginationOptions = {
    offset: 0,
    limit: 8,
    total: 0,
  };
  let errorMessage: string | null = null;

  try {
    const fetchMembersResult = (await fetchMembers({
      search: searchQuery,
      offset: currentPage * 8 - 8,
      limit: limit,
    })) as IPagedResponse<IMember>;

    if (!fetchMembersResult || !fetchMembersResult.items.length) {
      members = [];
      paginationOptions = { ...paginationOptions, total: 0 };
    } else {
      paginationOptions = fetchMembersResult.pagination;
      members = fetchMembersResult.items;
    }
  } catch (error) {
    errorMessage = "No members found matching search.";
  }

  return (
    <main className="flex flex-1 flex-col gap-2 overflow-y-auto p-4 px-8">
      <h1 className="text-3xl mb-3 font-serif lg:text-5xl">Members</h1>
      <div className="flex items-center justify-between">
        <Search placeholder="Enter a keyword..." />
        <CreateButton url="/admin/members/create" label="Add Member" />
      </div>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : members.length > 0 ? (
        <MembersTable members={members} />
      ) : (
        <p>No members found.</p>
      )}
      <div className="flex justify-center align-middle m-auto my-1">
        {members.length > 0 ? (
          <PaginationControl
            currentPage={currentPage}
            options={paginationOptions}
          />
        ) : null}
      </div>
    </main>
  );
};

export default Members;
