import React from "react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/src/components/ui/dropdown-menu";
import Link from "next/link";
import SignOutButton from "@/src/components/navbar/signOutButton";
import { User } from "next-auth";

const DropDownOptions = ({ user }: { user: User }) => {
  const pathname = user?.role === "admin" ? "/admin" : "/dashboard";
  return (
    <>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="mx-1 " />
        <Link href={`${pathname}/profile`} className="mb-2">
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator className="mx-1 opacity-25" />
        <DropdownMenuItem className="m-0 p-0">
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </>
  );
};

export default DropDownOptions;
