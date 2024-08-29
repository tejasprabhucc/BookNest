"use server";
import { initializeDatabase } from "../orm";
import { books, members } from "../orm/schema";
import {
  IBook,
  IMember,
  IMemberBase,
  IPagedResponse,
  IPageRequest,
} from "./definitions";
import { count, eq, like, or, sql } from "drizzle-orm";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { MemberBaseSchema } from "../models/member.schema";

const db = initializeDatabase();

export async function getUserByEmail(email: string): Promise<IMember | null> {
  try {
    if (!db) {
      return null;
    }
    const [selectedMember] = await db
      .select()
      .from(members)
      .where(eq(members.email, email));
    if (!selectedMember) return null;
    return selectedMember as IMember;
  } catch (error) {
    throw error;
  }
}

export async function getUserById(id: number): Promise<IMember | null> {
  try {
    if (!db) {
      return null;
    }
    const [member] = (await db
      .select()
      .from(members)
      .where(eq(members.id, id))
      .limit(1)
      .execute()) as IMember[];
    if (!member) {
      throw new Error("Member not found");
    }
    return member;
  } catch (error) {
    throw new Error(`Member not found`);
  }
}

export async function createUser(data: IMemberBase): Promise<IMember | null> {
  const validatedData = { ...MemberBaseSchema.parse(data), id: 0 };

  try {
    if (!db) {
      return null;
    }
    const [insertId] = await db.insert(members).values(validatedData);

    return await getUserById(insertId.insertId);
  } catch (error) {
    throw new Error(`Error creating member: ${(error as Error).message}`);
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
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

export async function listBooks(
  params: IPageRequest
): Promise<IPagedResponse<IBook> | null> {
  if (!db) {
    return null;
  }

  let searchWhereClause;
  if (params.search) {
    const search = `%${params.search.toLowerCase()}%`;
    searchWhereClause = sql`${books.title} LIKE ${search} OR ${books.isbnNo} LIKE ${search}`;
  }
  try {
    const matchedBooks = (await db
      .select()
      .from(books)
      .where(searchWhereClause)
      .offset(params.offset)
      .limit(params.limit)) as IBook[];

    if (matchedBooks.length > 0) {
      const [totalMatchedBooks] = await db
        .select({ count: count() })
        .from(books)
        .where(searchWhereClause);

      return {
        items: matchedBooks,
        pagination: {
          offset: params.offset,
          limit: params.limit,
          total: totalMatchedBooks.count,
        },
      };
    } else {
      throw new Error("No books found matching the criteria");
    }
  } catch (e) {
    throw new Error((e as Error).message);
  }
}
