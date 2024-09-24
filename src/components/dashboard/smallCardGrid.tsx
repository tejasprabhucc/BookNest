"use client";

import { IBook } from "@/src/lib/definitions";
import React, { useState } from "react";
import Image from "next/image";
import bookCover from "@/public/bookCover.jpg";
import SideSheet from "./bookDetailSheet";
import { motion } from "framer-motion";
import { BorrowButton } from "../ui/customButtons";

const BooksGrid = ({
  books,
  userId,
  action,
}: {
  books: IBook[];
  userId: number;
  action: boolean;
}) => {
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {books ? (
        books.map((book, index) => (
          <motion.div
            key={book.isbnNo}
            whileHover={{ scale: 1.015 }}
            className="flex flex-col justify-between bg-background shadow-lg rounded-lg overflow-hidden p-0 cursor-pointer transition-shadow hover:shadow-xl"
            onClick={() => setSelectedBook(book)}
          >
            <div className="relative h-80">
              <Image
                src={book.coverImage || bookCover}
                height={400}
                width={300}
                alt="Book Cover"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium pe-2">{book.title}</h3>
              <p className="text-sm text-gray-500">• {book.author}</p>
              <div className="flex justify-between items-center py-2">
                <p className="font-extrabold text-xl text-nowrap">
                  {"₹ "}
                  {book.price}
                </p>
                <BorrowButton
                  data={{ bookId: BigInt(book.id), memberId: BigInt(userId) }}
                />
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <p>No Books found.</p>
      )}
      {selectedBook && (
        <SideSheet
          book={selectedBook}
          isOpen={!!selectedBook}
          onClose={() => setSelectedBook(null)}
          userId={userId}
          action={action}
        />
      )}
    </div>
  );
};

export default BooksGrid;
