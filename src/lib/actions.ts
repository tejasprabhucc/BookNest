"use server";
import { db } from "@/src/orm/index";
import {
  IBookBase,
  IMember,
  IMemberBase,
  IPageRequest,
  ITransaction,
  ITransactionBase,
  Role,
} from "@/src/lib/definitions";
import { auth, signIn } from "@/src/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { BookRepository } from "@/src/repositories/book.repository";
import { MemberRepository } from "@/src/repositories/member.repository";
import { z } from "zod";
import { TransactionRepository } from "@/src/repositories/transaction.repository";

// const db = initializeDatabase();
const bookRepo = new BookRepository(db!);
const memberRepo = new MemberRepository(db!);
const transactionRepo = new TransactionRepository(db!);

export type State = {
  message?: string | null;
  loading: boolean;
};

export async function getUserDetails() {
  const session = await auth();
  const user = session?.user;
  const email = user?.email;

  console.log(session?.user.image);
  try {
    const userDetails = await memberRepo.getByEmail(email as string);
    if (!userDetails) {
      throw new Error("User details not be found");
    }
    return { ...user, ...userDetails };
  } catch (error) {
    console.error("Error finding details of user", error);
  }
}

export async function createUser(data: IMemberBase) {
  try {
    return await memberRepo.create(data);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { message: err.errors[0].message || "Invalid input" };
    }
    return { message: (err as Error).message };
  }
}

export async function getUserByEmail(email: string) {
  try {
    return await memberRepo.getByEmail(email);
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function getUserById(id: number) {
  try {
    return await memberRepo.getById(id);
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function fetchMembers(params: IPageRequest) {
  try {
    return await memberRepo.list(params);
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function createMember(prevState: any, formData: FormData) {
  try {
    const data: IMember = {
      name: formData.get("name") as string,
      age: Number(formData.get("age")),
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      role: formData.get("role") as Role,
      id: 0,
    };

    const createdMember = await memberRepo.create(data);
    if (!createdMember) {
      return { message: "Failed to create member." };
    }

    return { message: "Member created successfully!" };
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err.flatten());
      return { message: err.errors[0].message || "Invalid input" };
    }
    return { message: (err as Error).message };
  }
}

export async function deleteMember(id: number) {
  try {
    const deleted = await memberRepo.delete(id);
    if (!deleted) {
      return { message: "Failed to delete the member." };
    }
    return { message: "Member deleted successfully!" };
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function createBook(prevState: any, formData: FormData) {
  try {
    const data: IBookBase = {
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      publisher: formData.get("publisher") as string,
      genre: formData.get("genre") as string,
      isbnNo: formData.get("isbnNo") as string,
      numOfPages: Number(formData.get("numOfPages")),
      totalNumOfCopies: Number(formData.get("totalNumOfCopies")),
    };

    const createdBook = await bookRepo.create(data);
    if (!createdBook) {
      return { message: "Failed to create book." };
    }

    return { message: "Book created successfully!" };
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err.flatten());
      return { message: err.errors[0].message || "Invalid input" };
    }
    return { message: (err as Error).message };
  }
}

export async function fetchBooks(params: IPageRequest) {
  try {
    return await bookRepo.list(params);
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function getBookById(id: string) {
  try {
    const bookId = Number(id);
    return await bookRepo.getById(bookId);
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function deleteBook(id: number) {
  try {
    const deleted = await bookRepo.delete(id);
    if (!deleted) {
      return { message: "Failed to delete the book." };
    }
    return { message: "Book deleted successfully!" };
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function editBook(prevState: any, formData: FormData) {
  try {
    const data: IBookBase = {
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      publisher: formData.get("publisher") as string,
      genre: formData.get("genre") as string,
      isbnNo: formData.get("isbn") as string,
      numOfPages: Number(formData.get("numOfPages")),
      totalNumOfCopies: Number(formData.get("totalNumOfCopies")),
    };

    const id = Number(formData.get("id"));
    const availableNumOfCopies = Number(formData.get("availableNumOfCopies"));

    const response = await bookRepo.update(id, data, availableNumOfCopies);
    if (!response) {
      return { message: "Failed to update the book." };
    }

    return { message: "Book updated successfully!" };
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err.flatten());
      return { message: err.errors[0].message || "Invalid input" };
    }
    return { message: (err as Error).message };
  }
}

export async function fetchTransactions(params: IPageRequest) {
  try {
    return await transactionRepo.listTransactionDetails(params);
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function requestBook(data: ITransactionBase) {
  try {
    const result = await transactionRepo.create(data);
    if (!result) {
      return { message: "Failed to request book." };
    }

    return { message: "Book requested successfully!" };
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function returnBook(id: number) {
  try {
    const result = await transactionRepo.returnBook(id);
    if (!result) {
      return { message: "Failed to return the book." };
    }

    return { message: "Book returned successfully!" };
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function rejectBookRequest(id: number) {
  try {
    const transaction = await transactionRepo.getById(id);
    const updatedData: ITransaction = {
      ...transaction,
      bookStatus: "rejected",
    };
    const result = await transactionRepo.update(id, updatedData);

    if (!result) {
      return { message: "Failed to reject the book request." };
    }

    return { message: "Book request rejected!" };
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function acceptBookRequest(id: number) {
  try {
    const result = await transactionRepo.issueBook(id);
    console.log(result);

    if (!result) {
      return { message: "Failed to accept book request." };
    }

    return { message: "Book request accepted." };
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function deleteTransaction(id: number) {
  try {
    const deleted = await transactionRepo.delete(id);
    if (!deleted) {
      return { message: "Failed to delete the transaction." };
    }
    return { message: "transaction deleted successfully!" };
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function fetchRequestsByMember(
  params: IPageRequest,
  memberId: bigint
) {
  try {
    return await transactionRepo.listTransactionDetailsByMember(
      params,
      memberId
    );
  } catch (err) {
    return { message: (err as Error).message };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const session = await auth();
    const userRole = session?.user.role;
    const result = await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
    });
    if (userRole === "admin") {
      redirect("/admin/books");
    }
    redirect("/dashboard");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
