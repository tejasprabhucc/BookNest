import React from "react";
import Link from "next/link";
import { MountainIcon, HomeIcon, BookmarkIcon, HeartIcon } from "lucide-react";
import HamburgerMenu from "@/src/components/navbar/hamburger";
import DropDownOptions from "./dropDownMenu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { IMember, INavOption } from "@/src/lib/definitions";
import { User } from "next-auth";
import SignOutButton from "@/src/components/navbar/signOutButton";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Sidenav = ({
  navOptions,
  user,
}: {
  navOptions: INavOption[];
  user: User;
}) => {
  const simplifiedNavOptions = navOptions.map(({ label, url }) => ({
    label,
    url,
  }));

  const image = user.image;

  return (
    <>
      <div className=" z-10 lg:hidden">
        <div className="w-full flex h-16 items-center justify-between border-b px-4">
          <Link
            href="#"
            className="flex items-center gap-2 font-bold"
            prefetch={false}
          >
            <MountainIcon className="h-6 w-6" />
            <h1>BookNest</h1>
          </Link>
          <HamburgerMenu navOptions={simplifiedNavOptions} user={user}>
            <SignOutButton />
          </HamburgerMenu>
        </div>
      </div>
      <aside className="w-60 max-h-screen sticky top-0 py-3 inset-y-0 left-0 flex-col border-2 bg-background hidden shadow-lg rounded-lg m-3 lg:flex">
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link href="#" className="flex items-center gap-2 " prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="text-2xl">BookNest</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navOptions.map((option: INavOption) => {
            const IconComponent = option.icon;
            return (
              <Link
                key={option.url}
                href={option.url}
                className="flex items-center gap-2 rounded-md px-3 py-3 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground "
              >
                <IconComponent /> {option.label}
              </Link>
            );
          })}
        </nav>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex  m-3 p-2 gap-2 items-center bg-slate-100 rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                className="overflow-hidden rounded-full bg-slate-200"
              >
                {image ? (
                  <Image
                    src={image}
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="rounded-full"
                    style={{ aspectRatio: "36/36", objectFit: "cover" }}
                  />
                ) : (
                  <span>{user.name?.charAt(0)}</span>
                )}
              </Button>
              <p className="text-center">{user.name}</p>
            </div>
          </DropdownMenuTrigger>
          <DropDownOptions user={user} />
        </DropdownMenu>
      </aside>
    </>
  );
};

export default Sidenav;
