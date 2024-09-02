import React from "react";
import DropDownMenu from "./dropDownMenu";
import HamburgerMenu from "./hamburger";
import Search from "@/src/components/ui/search";

const Navbar = () => {
  return (
    <header className=" sticky top-0 z-20 flex h-16 items-center gap-4 bg-background px-4 sm:px-6 lg:px-8">
      <div className="w-full flex items-center justify-between">
        <div className="lg:hidden">
          <HamburgerMenu />
        </div>
        <div className="hidden lg:block lg:flex-1">
          {/* <div className="relative max-w-xs sm:max-w-md">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search books..."
              className="w-full rounded-lg bg-muted pl-8 pr-4 focus:bg-background"
            />
          </div> */}
          <Search placeholder="Enter a keyword..." />
        </div>
        <DropDownMenu />
      </div>
    </header>
  );
};

export default Navbar;
