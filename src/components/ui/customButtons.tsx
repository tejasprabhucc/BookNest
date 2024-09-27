"use client";
import React, { useActionState, useState } from "react";
import { Button } from "@/src/components/ui/button";
import {
  BookDown,
  CheckIcon,
  FilePenIcon,
  PlusIcon,
  RefreshCw,
  TrashIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import {
  acceptBookRequest,
  deleteBook,
  deleteMember,
  deleteProfessor,
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
  IProfessor,
  ITransaction,
  ITransactionBase,
} from "@/src/lib/definitions";
import { revalidatePath } from "next/cache";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import ConfirmDialog from "./ConfimDialog";
import { cn } from "@/src/lib/utils";

type ItemType = IBook | IMember | ITransaction | IProfessor;

export const CreateButton = ({
  url,
  label,
}: {
  url: string;
  label: string;
}) => {
  return (
    <Link href={url}>
      <Button variant="default">
        <span className="hidden md:block">{label}</span>
        <PlusIcon className="h-5 md:ml-4" />
      </Button>
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

  function isProfessor(data: ItemType): data is IProfessor {
    return (data as IProfessor).calendlyLink !== undefined;
  }

  const itemTitle = isBook(data)
    ? data.title
    : isMember(data)
    ? data.name
    : isProfessor(data)
    ? data.name
    : `Transaction ${data.id}`;

  const handleDelete = async () => {
    try {
      const result = isBook(data)
        ? await deleteBook(data.id)
        : isMember(data)
        ? await deleteMember(data.id)
        : isProfessor(data)
        ? await deleteProfessor(data.id)
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

export const RefreshLink = ({
  email,
  action,
}: {
  email: string;
  action: (email: string) => Promise<{ success: boolean; message: string }>;
}) => {
  const [isLoading, setLoading] = useState(false);
  const handleRefresh = async (email: string) => {
    try {
      setLoading(true);
      const result = await action(email);
      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
          variant: "default",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to refresh Calendly link.",
          variant: "destructive",
        });
      }
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while refreshing the Calendly link.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={() => handleRefresh(email)}>
      <RefreshCw
        className={cn("h-4 w-4 mr-2", isLoading ? "animate-spin" : "")}
      />
      Refresh Link
    </Button>
  );
};
