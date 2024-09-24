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

// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { Card, CardContent } from "@/src/components/ui/card";
// import { Button } from "@/src/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetDescription,
// } from "@/src/components/ui/sheet";
// import bookCover from "@/public/bookCover.jpg";

// interface IBook {
//   id: number;
//   isbnNo: string;
//   title: string;
//   author: string;
//   price: number;
//   coverImage?: string;
// }

// interface BooksGridProps {
//   books: IBook[];
//   userId: number;
//   action: boolean;
// }

// const BooksGrid: React.FC<BooksGridProps> = ({ books, userId, action }) => {
//   const [selectedBook, setSelectedBook] = useState<IBook | null>(null);

//   return (
//     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//       {books && books.length > 0 ? (
//         books.map((book) => (
//           <motion.div
//             key={book.isbnNo}
//             whileHover={{ scale: 1.05 }}
//             className="cursor-pointer"
//             onClick={() => setSelectedBook(book)}
//           >
//             <Card className="overflow-hidden transition-shadow hover:shadow-xl">
//               <div className="relative h-80">
//                 <Image
//                   src={book.coverImage || bookCover}
//                   height={400}
//                   width={300}
//                   alt="Book Cover"
//                   className="w-full h-full object-contain"
//                 />
//               </div>
//               <CardContent className="p-4 bg-background">
//                 <h3 className="text-[#1C160C] text-base font-medium leading-normal">
//                   {book.title}
//                 </h3>
//                 <p className="text-[#A18249] text-sm font-normal leading-normal">
//                   • {book.author}
//                 </p>
//                 <div className="flex justify-between items-center mt-2">
//                   <p className="text-[#1C160C] text-lg font-semibold">
//                     ₹ {book.price}
//                   </p>
//                   <Button
//                     variant="outline"
//                     className="text-[#019863] border-[#019863] hover:bg-[#019863] hover:text-white"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       // Handle borrow action
//                     }}
//                   >
//                     Borrow
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         ))
//       ) : (
//         <p className="text-[#A18249] col-span-full text-center">
//           No books found.
//         </p>
//       )}

//       <Sheet open={!!selectedBook} onOpenChange={() => setSelectedBook(null)}>
//         <SheetContent>
//           <SheetHeader>
//             <SheetTitle>{selectedBook?.title}</SheetTitle>
//             <SheetDescription>{selectedBook?.author}</SheetDescription>
//           </SheetHeader>
//           <div className="mt-4">
//             <Image
//               src={selectedBook?.coverImage || "/placeholder.svg"}
//               alt={`Cover of ${selectedBook?.title}`}
//               width={200}
//               height={300}
//               className="rounded-lg mx-auto"
//             />
//             <p className="mt-4 text-[#1C160C]">ISBN: {selectedBook?.isbnNo}</p>
//             <p className="text-[#1C160C] text-lg font-semibold mt-2">
//               Price: ₹ {selectedBook?.price}
//             </p>
//             <Button
//               className="w-full mt-4 bg-[#019863] text-white hover:bg-[#019863]/90"
//               onClick={() => {
//                 // Handle borrow action
//               }}
//             >
//               Borrow Book
//             </Button>
//           </div>
//         </SheetContent>
//       </Sheet>
//     </div>
//   );
// };

// export default BooksGrid;
