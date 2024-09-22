import React from "react";
import Image from "next/image";
import { IBook } from "@/src/lib/definitions";
import bookCover from "@/public/bookCover.jpg";

const BooksMarque = ({ books }: { books: IBook[] }) => {
  // const bookCovers = [
  //   "https://images.pexels.com/photos/3518091/pexels-photo-3518091.jpeg",
  //   "https://images.pexels.com/photos/3196043/pexels-photo-3196043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   "https://images.pexels.com/photos/3576955/pexels-photo-3576955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   "https://images.pexels.com/photos/3786208/pexels-photo-3786208.jpeg?auto=compress&cs=tinysrgb&w=600",
  //   "https://images.pexels.com/photos/3409498/pexels-photo-3409498.jpeg?auto=compress&cs=tinysrgb&w=600",
  //   "https://images.pexels.com/photos/2090104/pexels-photo-2090104.jpeg?auto=compress&cs=tinysrgb&w=600",
  //   "https://images.pexels.com/photos/3309949/pexels-photo-3309949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   "https://images.pexels.com/photos/3309963/pexels-photo-3309963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  // ];

  const bookCovers = books.map((book) => book.coverImage);

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="relative w-full">
        <div className="flex animate-marquee">
          {[...bookCovers, ...bookCovers].map((cover, index) => (
            <div key={index} className="flex-shrink-0 w-[200px] mx-4">
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
