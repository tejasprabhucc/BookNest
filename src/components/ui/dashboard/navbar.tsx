import React from "react";
import { Input } from "@/src/components/ui/input";
import { Button, buttonVariants } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import LoginDialog from "@/src/components/ui/dashboard/loginDialog";

const Navbar = () => {
  const isLoggedIn = false;
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center gap-4  bg-background px-4 sm:px-6 ml-64">
      <div className="flex items-center gap-2 flex-1 justify-between">
        <div className="relative align-middle flex-1 max-w-md focus-within:outline-none">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search books..."
            className="w-full rounded-lg bg-muted pl-8 pr-4 focus:bg-background"
          />
        </div>

        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="/placeholder-user.jpg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="rounded-full"
                  style={{ aspectRatio: "36/36", objectFit: "cover" }}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Borrowed Books</DropdownMenuItem>
              <DropdownMenuItem>Wishlist</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex gap-5">
            <LoginDialog />
            <Button className="">Signup</Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
