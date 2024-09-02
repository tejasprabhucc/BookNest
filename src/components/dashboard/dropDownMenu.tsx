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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="overflow-hidden rounded-full bg-slate-200"
          >
            <span>T</span>
            {/* <Image
              src="/placeholder-user.jpg"
              width={36}
              height={36}
              alt="Avatar"
              className="rounded-full"
              style={{ aspectRatio: "36/36", objectFit: "cover" }}
            /> */}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Borrowed Books</DropdownMenuItem>
          <DropdownMenuItem>Wishlist</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button>
                <div className="hidden md:block">Sign Out</div>
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default DropDownOptions;
