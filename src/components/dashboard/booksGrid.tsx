import { IBook } from "@/src/lib/definitions";
import React from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import Image from "next/image";
import bookCover from "@/public/bookCover.jpg";
import { BorrowButton } from "../ui/customButtons";
import { getUserDetails } from "@/src/lib/actions";

const BooksGrid = async ({ books }: { books: IBook[] }) => {
  const session = await getUserDetails();
  const userId = Number(session?.id);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {books ? (
        books.map((book, index) => (
          <Card
            key={index}
            className="flex bg-background shadow-lg rounded-lg overflow-hidden px-3"
          >
            {/* <BookCover
              title={book.title}
              author={book.author}
              publisher="Scribner"
            /> */}
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
                <p className="text-sm text-muted-foreground">{book.author}</p>
                <p className="text-sm text-muted-foreground">{book.genre}</p>
              </div>
              <div className="flex gap-2 p-2">
                <BorrowButton
                  data={{ bookId: BigInt(book.id), memberId: BigInt(userId) }}
                />
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>No Books found.</p>
      )}
    </div>
  );
};

export default BooksGrid;
