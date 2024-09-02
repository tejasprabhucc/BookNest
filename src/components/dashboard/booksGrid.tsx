import { IBook } from "@/src/lib/definitions";
import { HeartIcon } from "lucide-react";
import React from "react";
import BookCover from "@/src/components/ui/bookCover";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";

const BooksGrid = ({ books }: { books: IBook[] }) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {books ? (
        books.map((book, index) => (
          <Card
            key={index}
            className="h-full flex flex-col bg-background shadow-lg rounded-lg overflow-hidden"
          >
            {/* <BookCover
              title={book.title}
              author={book.author}
              publisher="Scribner"
            /> */}
            {/* <Image
                  src="/placeholder.svg"
                  width={160}
                  height={240}
                  alt="Book Cover"
                  className="w-full h-64 object-cover"
                /> */}
            <CardContent className="flex flex-col items-center justify-between gap-4 p-4 flex-grow">
              <div className="text-center flex-grow">
                <h3 className="font-medium line-clamp-2">{book.title}</h3>
                <p className="text-sm text-muted-foreground">{book.author}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="shadow-sm">
                  Borrow
                </Button>
                <Button size="sm" variant="outline" className="shadow-sm">
                  <HeartIcon className="h-4 w-4" />
                  <span className="sr-only">Add to Wishlist</span>
                </Button>
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
