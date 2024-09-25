import React from "react";
import Image from "next/image";
import { IBook } from "@/src/lib/definitions";
import bookCover from "@/public/bookCover.jpg";

const BooksMarque = ({ books }: { books: IBook[] }) => {
  const bookCovers = books.map((book) => book.coverImage);

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="relative w-full">
        <div className="flex animate-marquee">
          {[...bookCovers, ...bookCovers].map((cover, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[200px] height-[300px] mx-4"
            >
              <Image
                src={cover || bookCover}
                alt={`Book cover ${index + 1}`}
                width={200}
                height={300}
                className="rounded-md shadow-lg object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BooksMarque;
