import React from "react";
import DropDownMenu from "./dropDownMenu";
import HamburgerMenu from "./hamburger";
import Search from "@/src/components/ui/search";

const Navbar = () => {
  return (
    <header className=" sticky top-0 z-20 flex h-16 items-center gap-4 bg-background px-4 sm:px-6 lg:px-8">
      <nav className="w-full flex items-center justify-between">
        <div className="lg:hidden">
          <HamburgerMenu />
        </div>
        <div className="hidden lg:block lg:flex-1">
          <Search placeholder="Enter a keyword..." />
        </div>
        <DropDownMenu />
      </nav>
    </header>
  );
};

export default Navbar;
