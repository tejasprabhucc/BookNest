import React from "react";
import { IMember } from "@/src/lib/definitions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { books } from "@/src/orm/schema";
import { EditButton, DeleteButton } from "@/src/components/ui/customButtons";

const MembersTable = ({ members }: { members: IMember[] }) => {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="hidden sm:table-cell">Name</TableHead>
          <TableHead className="hidden sm:table-cell">Age</TableHead>
          <TableHead className="hidden sm:table-cell">Email</TableHead>
          <TableHead className="hidden sm:table-cell">Phone</TableHead>
          <TableHead className="hidden sm:table-cell">Address</TableHead>
          <TableHead className="hidden sm:table-cell">Role</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableCell className="font-medium sm:table-cell">
              {member.name}
            </TableCell>
            <TableCell className="sm:table-cell">{member.age}</TableCell>
            <TableCell className="sm:table-cell">{member.email}</TableCell>
            <TableCell className="sm:table-cell">{member.phone}</TableCell>
            <TableCell className="sm:table-cell">{member.address}</TableCell>
            <TableCell className="sm:table-cell">{member.role}</TableCell>

            <TableCell>
              <DeleteButton data={member} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MembersTable;
