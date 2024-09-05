"use client";
import React from "react";
import { Button } from "@/src/components/ui/button";
import { FilePenIcon, PlusIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { deleteBook } from "@/src/lib/actions";
import { toast } from "@/src/components/hooks/use-toast";
import { useRouter } from "next/navigation";

export const BorrowButton = () => {
  return (
    <>
      <Button size="sm" className="shadow-sm">
        Borrow
      </Button>
    </>
  );
};

export const CreateButton = () => {
  return (
    <Link
      href="/admin/books/create"
      className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors border hover:border-black hover:bg-white hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <span className="hidden md:block">Add Book</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
};

export const EditButton = ({ url }: { url: string }) => {
  return (
    <>
      <Link href={url}>
        <Button variant="ghost" size="icon">
          <FilePenIcon className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
      </Link>
    </>
  );
};

export const DeleteButton = ({
  bookId,
  bookTitle,
}: {
  bookId: number;
  bookTitle: string;
}) => {
  const router = useRouter();
  const handleDelete = async () => {
    const result = await deleteBook(bookId);
    toast({
      title: result.message,
      description: `Book id: ${bookTitle}`,
    });
    router.refresh();
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await handleDelete();
      }}
    >
      <Button type="submit" variant="ghost" size="icon">
        <TrashIcon className="h-4 w-4" />
        <span className="sr-only">Delete</span>
      </Button>
    </form>
  );
};
