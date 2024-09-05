"use server";
import { initializeDatabase } from "../orm";
import { books, members } from "../orm/schema";
import {
  IBook,
  IBookBase,
  IMember,
  IMemberBase,
  IPagedResponse,
  IPageRequest,
} from "./definitions";
import { signIn } from "@/src/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { BookRepository } from "../repositories/book.repository";
import { MemberRepository } from "../repositories/member.repository";
import { z } from "zod";

const db = initializeDatabase();
const bookRepo = new BookRepository(db!);
const memberRepo = new MemberRepository(db!);

export type State = {
  message?: string | null;
  loading: boolean;
};

export async function createuser(data: IMemberBase) {
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

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const result = await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
    });
    if (result) {
      redirect("/dashboard");
    }
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
