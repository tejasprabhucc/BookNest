"use client";

import React, { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react"; // XIcon is for closing the menu
import { INavOption } from "@/src/lib/definitions";

const HamburgerMenu = ({
  navOptions,
}: {
  navOptions: { label: string; url: string }[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleMenu} aria-label="Toggle menu" className="p-2">
        {isOpen ? (
          <XIcon className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </button>
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-background shadow-lg lg:hidden">
          <nav className="flex flex-col space-y-1 px-2 py-4">
            {navOptions.map((option) => (
              <a
                key={option.url}
                href={option.url}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium hover:bg-muted hover:text-foreground"
              >
                {option.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
