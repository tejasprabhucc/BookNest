import React from "react";
import { fetchMembers, fetchProfessors } from "@/src/lib/actions";
import {
  IMember,
  IPagedResponse,
  IPaginationOptions,
  IProfessor,
} from "@/src/lib/definitions";
import PaginationControl from "@/src/components/controls/pagination";
import Search from "@/src/components/navbar/search";
import { CreateButton } from "@/src/components/ui/customButtons";
import MembersTable from "@/src/components/dashboard/members-table";
import ProfessorsTable from "@/src/components/dashboard/professors-table";

const Professors = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  let errorMessage: string | null = null;
  const searchQuery = searchParams?.query || undefined;

  const result = (await fetchProfessors({
    search: searchQuery,
    offset: 0,
    limit: 10,
  })) as IPagedResponse<IProfessor>;
  const professors = result.items;

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Professors</h1>
      <div className="flex items-center justify-between">
        <Search placeholder="Enter a keyword..." />
        <CreateButton url="/admin/professors/create" label="Add Professor" />
      </div>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : professors.length > 0 ? (
        <ProfessorsTable professors={professors} />
      ) : (
        <p>No members found.</p>
      )}
    </div>
  );
};

export default Professors;
