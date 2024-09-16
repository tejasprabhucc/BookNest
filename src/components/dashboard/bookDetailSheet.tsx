import { IBook } from "@/src/lib/definitions";
import {
  User,
  Building,
  Tag,
  FileText,
  BookCopy,
  DollarSign,
  IndianRupeeIcon,
  Currency,
  CurrencyIcon,
  Banknote,
} from "lucide-react";
import { BorrowButton } from "../ui/customButtons";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import Image from "next/image";
import bookCover from "@/public/bookCover.jpg";

const SideSheet = ({
  book,
  isOpen,
  onClose,
  userId,
  action,
}: {
  book: IBook;
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  action: boolean;
}) => (
  <Sheet open={isOpen} onOpenChange={onClose}>
    <SheetContent className="w-full sm:max-w-[540px] overflow-y-auto">
      <SheetHeader className="mb-6">
        <SheetTitle className="text-xl font-bold">{book.title}</SheetTitle>
        {/* <Button
          onClick={onClose}
          variant="ghost"
          className="absolute right-4 top-4 p-2"
        >
          <X className="h-6 w-6" />
        </Button> */}
      </SheetHeader>
      <div className="flex flex-col gap-6">
        <div className="relative w-full h-[250px]  rounded-lg overflow-hidden">
          <Image
            src={bookCover}
            layout="fill"
            objectFit="contain"
            alt={`Cover of ${book.title}`}
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>
        <SheetDescription className="text-lg space-y-4">
          <DetailItem icon={<User />} label="Author" value={book.author} />
          <DetailItem
            icon={<Building />}
            label="Publisher"
            value={book.publisher || "Not available"}
          />
          <DetailItem icon={<Tag />} label="Genre" value={book.genre} />
          <DetailItem
            icon={<FileText />}
            label="Pages"
            value={book.numOfPages?.toString() || "Not available"}
          />
          <DetailItem
            icon={<BookCopy />}
            label="Available Copies"
            value={book.availableNumOfCopies?.toString() || "Not available"}
          />
          <DetailItem
            icon={<Banknote />}
            label="Price"
            value={book.price ? `₹ ${book.price.toFixed(2)}` : "Not available"}
          />
        </SheetDescription>
        {action && (
          <BorrowButton
            data={{ bookId: BigInt(book.id), memberId: BigInt(userId) }}
          />
        )}
      </div>
    </SheetContent>
  </Sheet>
);

const DetailItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-3">
    {icon}
    <span className="font-semibold">{label}:</span>
    <span>{value}</span>
  </div>
);

export default SideSheet;
