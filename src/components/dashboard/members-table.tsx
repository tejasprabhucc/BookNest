"use client";
import React, { useState } from "react";
import { IMember, Role } from "@/src/lib/definitions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { books } from "@/src/drizzle/schema";
import { EditButton, DeleteButton } from "@/src/components/ui/customButtons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const MembersTable = ({
  members,
  updateRole,
}: {
  members: IMember[];
  updateRole: (id: number, role: Role)=>void}) => {
  const handleRoleChange = async (id: number, role: string) => {
    try {
      const response = await updateRole(id, role as Role);
    } catch (error) {
      console.log((error as Error).message);
    }
  };
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
          <TableHead className="hidden sm:table-cell">Change Role</TableHead>
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
            <TableCell className="sm:table-cell">
              <Select
                defaultValue={member.role}
                onValueChange={(value) =>handleRoleChange(member.id, value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
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
