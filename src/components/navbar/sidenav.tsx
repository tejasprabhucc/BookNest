import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "next-auth";
import { INavOption } from "@/src/lib/definitions";
import { Button } from "@/src/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils";
import * as Icons from "lucide-react";
import HamburgerMenu from "./hamburger";
import SignOutButton from "./signOutButton";
import { useTranslations } from "next-intl";
import SidenavLinks from "./navLinks";
import DropDownOptions from "./dropDownMenu";

interface CollapsibleSidenavProps {
  user: User;
  navOptions: (INavOption & { iconName: string })[];
}

const Sidenav: React.FC<CollapsibleSidenavProps> = ({ user, navOptions }) => {
  const simplifiedNavOptions = navOptions.map(({ label, url }) => ({
    label,
    url,
  }));

  const t = useTranslations("Sidenav");

  return (
    <>
      <div className=" z-10 lg:hidden">
        <div className="w-full flex h-16 items-center justify-between border-b px-4">
          <Link
            href="#"
            className="flex items-center gap-2 font-extrabold "
            prefetch={false}
          >
            <Icons.MountainIcon className="h-6 w-6" />
            <h1>BookNest</h1>
          </Link>
          <HamburgerMenu navOptions={simplifiedNavOptions} user={user}>
            <SignOutButton />
          </HamburgerMenu>
        </div>
      </div>

      <SidenavLinks navOptions={navOptions} user={user}>
        <DropDownOptions user={user} />
      </SidenavLinks>
    </>
  );
};

export default Sidenav;
