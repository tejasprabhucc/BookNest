import {
  IBook,
  IRepository,
  IBookBase,
  FilterOptions,
  SortOptions,
} from "@/src/lib/definitions";
import { BookSchemaBase } from "@/src/models/book.schema";
import { IPagedResponse, IPageRequest } from "@/src/lib/definitions";
import { MySql2Database } from "drizzle-orm/mysql2";
import { count, eq, desc, asc, sql } from "drizzle-orm";
import { books } from "@/src/drizzle/schema";
import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { z } from "zod";

export class BookRepository implements IRepository<IBookBase, IBook> {
  constructor(private readonly db: VercelPgDatabase<Record<string, unknown>>) {}

  async create(data: IBookBase): Promise<IBook> {
    const validatedData = BookSchemaBase.parse(data);

    const newBook = {
      ...validatedData,
      coverimage: validatedData.coverImage || null,
      availableNumOfCopies: validatedData.totalNumOfCopies,
    };

    try {
      const [result] = await this.db
        .insert(books)
        .values(newBook)
        .returning({ id: books.id });

      return await this.getById(result.id);
    } catch (error) {
      throw new Error(`Error creating book: ${(error as Error).message}`);
    }
  }

  async update(
    id: number,
    data: IBookBase,
    availableNumOfCopies?: number
  ): Promise<IBook | undefined> {
    try {
      const bookToUpdate = await this.getById(id);
      if (!bookToUpdate) {
        throw new Error("Book not found");
      }

      const validatedData = BookSchemaBase.parse(data);

      const updatedAvailableCopies =
        availableNumOfCopies ??
        validatedData.totalNumOfCopies -
          (bookToUpdate.totalNumOfCopies - bookToUpdate.availableNumOfCopies);

      const updatedBook: IBook = {
        ...bookToUpdate,
        ...validatedData,
        availableNumOfCopies: updatedAvailableCopies,
      };

      console.log("Updating book:", updatedBook);

      const result = await this.db
        .update(books)
        .set(updatedBook)
        .where(eq(books.id, id))
        .execute();

      if (result.rowCount) {
        console.log(`Book successfully updated.`);
        return await this.getById(id);
      } else {
        throw new Error("Failed to update the book");
      }
    } catch (error) {
      console.error(`Error updating book:`, (error as Error).message);
      if (error instanceof z.ZodError) {
        console.log(error.flatten());
        throw new Error(error.errors[0].message || "Invalid input");
      }
      throw new Error(`Error updating book: ${(error as Error).message}`);
    }
  }

  async delete(id: number): Promise<IBook> {
    try {
      const bookToDelete = await this.getById(id);

      const result = await this.db
        .delete(books)
        .where(eq(books.id, id))
        .execute();
      if (result.rowCount) {
        return bookToDelete;
      } else {
        throw new Error(`Book deletion failed`);
      }
    } catch (error) {
      throw new Error(`Book deletion failed`);
    }
  }

  async getById(id: number): Promise<IBook> {
    try {
      const [book] = (await this.db
        .select()
        .from(books)
        .where(eq(books.id, id))
        .limit(1)
        .execute()) as IBook[];
      if (!book) {
        throw new Error("Book not found");
      }
      return book;
    } catch (error) {
      throw new Error(`Book not found`);
    }
  }

  async list(
    params: IPageRequest,
    sortOptions?: SortOptions<IBook>,
    filterOptions?: FilterOptions<IBook>
  ): Promise<IPagedResponse<IBook> | undefined> {
    if (!this.db) {
      return;
    }
    let searchWhereClause = sql`1 = 1`;
    let sortOrder = sql``;

    if (params.search) {
      const search = `%${params.search.toLowerCase()}%`;
      searchWhereClause = sql`${books.title} ILIKE ${search} OR ${books.isbnNo} ILIKE ${search}`;
    }

    if (sortOptions) {
      const sortBy = books[sortOptions.sortBy] || books.author;
      sortOrder =
        sortOptions?.sortOrder === "desc" ? desc(sortBy) : asc(sortBy);
    }
    try {
      const matchedBooks = (await this.db
        .select()
        .from(books)
        .where(searchWhereClause)
        .offset(params.offset)
        .limit(params.limit)
        .orderBy(sortOrder)) as IBook[];

      if (matchedBooks.length > 0) {
        const [totalMatchedBooks] = await this.db
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
}
