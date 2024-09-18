"use client";

import { IBook } from "@/src/lib/definitions";
import React, { useState } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import Image from "next/image";
import bookCover from "@/public/bookCover.jpg";
import SideSheet from "./bookDetailSheet";

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

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {books ? (
        books.map((book, index) => (
          <Card
            key={book.id}
            className="flex bg-background shadow-lg rounded-lg overflow-hidden px-3 cursor-pointer transition-shadow hover:shadow-xl"
            onClick={() => setSelectedBook(book)}
          >
            <Image
              src={bookCover}
              width={0}
              height={0}
              alt="Book Cover"
              className="w-4/12 object-contain"
            />
            <CardContent className="flex flex-col items-center justify-between p-4 ">
              <div className="text-left ">
                <h3 className="font-medium line-clamp-2">{book.title}</h3>
                <p className="text-sm text-muted-foreground">• {book.author}</p>
                <p className="text-sm text-muted-foreground">• {book.genre}</p>
                <p className="font-extrabold text-xl mt-3">
                  {"₹ "}
                  {book.price}
                </p>
              </div>
            </CardContent>
          </Card>
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
