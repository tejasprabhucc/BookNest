import React from "react";
import Link from "next/link";
import {
  MountainIcon,
  MenuIcon,
  HomeIcon,
  BookmarkIcon,
  HeartIcon,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";

const Sidenav = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
      <div className="flex h-20 items-center justify-between border-b px-4">
        <Link
          href="#"
          className="flex items-center gap-2 font-bold"
          prefetch={false}
        >
          <MountainIcon className="h-6 w-6" />
          <span>BookNest</span>
        </Link>
        <Button variant="ghost" size="icon">
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        <Link
          href="#"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
          prefetch={false}
        >
          <HomeIcon className="h-5 w-5" />
          Home
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
          prefetch={false}
        >
          <BookmarkIcon className="h-5 w-5" />
          Borrowed
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
          prefetch={false}
        >
          <HeartIcon className="h-5 w-5" />
          Wishlist
        </Link>
      </nav>
    </aside>
  );
};

export default Sidenav;
