import { Link, Mountain } from "lucide-react";
import React from "react";
import LocaleSwitcher from "../localeSwitcher";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/theme-change";

const TopNavbar = () => {
  return (
    <nav className=" m-auto fixed top-0 left-0 right-0 z-50  backdrop-blur-sm mt-5 rounded-xl max-w-[1280px]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Mountain className="h-6 w-6" />
            <span className="font-bold text-2xl">BookNest</span>
          </Link>
          <div className="flex items-center space-x-4">
            <LocaleSwitcher />
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
