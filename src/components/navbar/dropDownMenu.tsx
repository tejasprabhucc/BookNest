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
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`${pathname}/profile`}> Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Language</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </>
  );
};

export default DropDownOptions;
