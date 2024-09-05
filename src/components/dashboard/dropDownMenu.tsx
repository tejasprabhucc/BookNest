import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { signOut } from "@/src/auth";

const DropDownOptions = () => {
  return (
    <>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Wishlist</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button type="submit">Sign Out</button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </>
  );
};

export default DropDownOptions;
