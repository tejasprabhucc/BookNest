import React from "react";
import { fetchProfessors, refreshCalendlyLink } from "@/src/lib/actions";
import { IPagedResponse, IProfessor } from "@/src/lib/definitions";
import Search from "@/src/components/navbar/search";
import { CreateButton } from "@/src/components/ui/customButtons";
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
      ) : professors ? (
        <ProfessorsTable
          professors={professors}
          refreshCalendlyLink={refreshCalendlyLink}
        />
      ) : (
        <p>No professors found.</p>
      )}
    </div>
  );
};

export default Professors;
