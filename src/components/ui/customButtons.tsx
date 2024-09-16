"use client";
import React, { useActionState, useState } from "react";
import { Button } from "@/src/components/ui/button";
import {
  BookDown,
  CheckIcon,
  FilePenIcon,
  PlusIcon,
  TrashIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import {
  acceptBookRequest,
  deleteBook,
  deleteMember,
  deleteTransaction,
  rejectBookRequest,
  requestBook,
  returnBook,
} from "@/src/lib/actions";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { toast } from "../hooks/use-toast";
import {
  IBook,
  IMember,
  ITransaction,
  ITransactionBase,
} from "@/src/lib/definitions";
import { revalidatePath } from "next/cache";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import ConfirmDialog from "./ConfimDialog";

type ItemType = IBook | IMember | ITransaction;

export const CreateButton = ({
  url,
  label,
}: {
  url: string;
  label: string;
}) => {
  return (
    <Link
      href={url}
      className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors border hover:border-black hover:bg-white hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <span className="hidden md:block">{label}</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
};

export const BorrowButton = ({ data }: { data: ITransactionBase }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = async () => {
    const result = await requestBook(data);
    toast({
      title: result.message,
    });
    setIsOpen(false);
    router.refresh();
  };
  return (
    <>
      {/* <Button
        onClick={handleClick}
        variant="default"
        className="flex gap-2 bg-primary"
      >
        <BookDown className="h-4 w-4" />
        <span>Borrow</span>
      </Button> */}
      <Button
        variant="default"
        onClick={() => setIsOpen(true)}
        className="flex gap-2"
      >
        <BookDown className="h-4 w-4" />
        <span>Borrow</span>
      </Button>
      <ConfirmDialog
        title={"Borrow book"}
        description={`Send a borrow request?.`}
        onConfirm={handleClick}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        variant={"default"}
      />
    </>
  );
};

export const AcceptButton = ({ transactionId }: { transactionId: number }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = async () => {
    const result = await acceptBookRequest(transactionId);
    toast({
      title: result.message,
    });
    setIsOpen(false);
    router.refresh();
  };

  return (
    <>
      {/* <Button onClick={handleClick} variant="accept" className="flex gap-2">
      <CheckIcon className="h-4 w-4" />
       <span>Accept</span>
    </Button> */}
      <Button
        variant="accept"
        onClick={() => setIsOpen(true)}
        className="flex gap-2"
      >
        <CheckIcon className="h-4 w-4" />
        <span>Accept</span>
      </Button>
      <ConfirmDialog
        title={"Accept book request"}
        description={"Are you sure you want to accept book request."}
        onConfirm={handleClick}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        variant={"default"}
      />
    </>
  );
};

export const RejectButton = ({ transactionId }: { transactionId: number }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = async () => {
    const result = await rejectBookRequest(transactionId);
    toast({
      title: result.message,
    });
    // setIsOpen(false);
    router.refresh();
  };

  return (
    <>
      <Button
        variant="reject"
        onClick={() => setIsOpen(true)}
        className="flex gap-2"
      >
        <XIcon className="h-4 w-4" />
        <span>Reject</span>
      </Button>
      <ConfirmDialog
        title={"Reject book request"}
        description={"Are you sure you want to reject book request."}
        onConfirm={handleClick}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        variant={"destructive"}
      />
    </>
  );
};

export const ReturnButton = ({ transactionId }: { transactionId: number }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = async () => {
    console.log("Returning");
    const result = await returnBook(transactionId);
    toast({
      title: result.message,
    });
    // setIsOpen(false);
    router.refresh();
  };

  return (
    <>
      <Button
        variant="accept"
        onClick={() => setIsOpen(true)}
        className="flex gap-2"
      >
        <ArrowUturnLeftIcon className="h-4 w-4" />
        <p>Return </p>
      </Button>
      <ConfirmDialog
        title={"Returning book"}
        description={"Are you sure you want to return this book."}
        onConfirm={handleClick}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        variant={"default"}
      />
    </>
  );
};

export const EditButton = ({ url, label }: { url: string; label?: string }) => {
  return (
    <>
      <Link href={url}>
        <Button variant="outline">
          <FilePenIcon className="h-4 w-4" />
          {label && <span>{label}</span>}
        </Button>
      </Link>
    </>
  );
};

export const DeleteButton = ({ data }: { data: ItemType }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  function isBook(data: ItemType): data is IBook {
    return (data as IBook).isbnNo !== undefined;
  }

  function isMember(data: ItemType): data is IMember {
    return (data as IMember).name !== undefined;
  }

  const itemTitle = isBook(data)
    ? data.title
    : isMember(data)
    ? data.name
    : `Transaction ${data.id}`;

  const handleDelete = async () => {
    try {
      const result = isBook(data)
        ? await deleteBook(data.id)
        : isMember(data)
        ? await deleteMember(data.id)
        : await deleteTransaction(data.id);
      toast({
        title: result.message,
      });
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the item. Please try again.",
      });
    }
  };

  return (
    <>
      {/* <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive" size="icon" color="red">
            <TrashIcon className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Deleting {isBook(data) ? "book" : "member"}
            </DialogTitle>
            <DialogDescription className="flex flex-col gap-2">
              <span className="text-md">
                Are you sure you want to delete <b>&quot;{itemTitle}&quot;</b>?
              </span>
              <span className="flex items-center gap-1">
                <TriangleAlert className="h-4 w-4" /> This action cannot be
                undone.
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}

      <Button variant="destructive" size="icon" onClick={() => setIsOpen(true)}>
        <TrashIcon className="h-4 w-4" />
      </Button>
      <ConfirmDialog
        title={`Deleting ${isBook(data) ? "book" : "member"}`}
        description={`Are you sure you want to delete "${itemTitle}"?`}
        onConfirm={handleDelete}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        variant={"destructive"}
      />
    </>
  );
};
