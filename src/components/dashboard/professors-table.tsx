"use client";
import React from "react";
import { IMember, IProfessor } from "@/src/lib/definitions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { EditButton, DeleteButton } from "@/src/components/ui/customButtons";

interface ProfessorsTableProps {
  professors: IProfessor[];
  onEdit: (professor: IProfessor) => void;
  onDelete: (professorId: number) => void;
}

const ProfessorsTable = ({ professors }: { professors: IProfessor[] }) => {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Department</TableHead>
          <TableHead className="hidden md:table-cell">Short Bio</TableHead>
          <TableHead className="hidden sm:table-cell">Calendly Link</TableHead>
          <TableHead className="text-right" colSpan={1}>
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {professors.map((professor) => (
          <TableRow key={professor.id}>
            <TableCell className="font-medium">{professor.name}</TableCell>
            <TableCell>{professor.email}</TableCell>
            <TableCell>{professor.department}</TableCell>
            <TableCell className="hidden md:table-cell max-w-[200px] truncate">
              {professor.shortBio}
            </TableCell>
            <TableCell className="hidden sm:table-cell max-w-[150px] truncate">
              <a
                href={professor.calendlyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {professor.calendlyLink}
              </a>
            </TableCell>
            <TableCell>
              <EditButton url={`/admin/professors/${professor.id}/edit`} />
            </TableCell>
            <TableCell>
              <DeleteButton data={professor} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProfessorsTable;
