"use client";

import React, { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react"; // XIcon is for closing the menu

const HamburgerMenu = () => {
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
            <a
              href="#"
              className="px-3 py-2 text-sm font-medium hover:bg-muted hover:text-foreground"
            >
              Home
            </a>
            <a
              href="#"
              className="px-3 py-2 text-sm font-medium hover:bg-muted hover:text-foreground"
            >
              Borrowed
            </a>
            <a
              href="#"
              className="px-3 py-2 text-sm font-medium hover:bg-muted hover:text-foreground"
            >
              Wishlist
            </a>
          </nav>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
