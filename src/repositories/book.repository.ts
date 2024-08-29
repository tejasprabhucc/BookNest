import { IBook } from "../models/book.model";
import { BookSchemaBase, IBookBase } from "../models/book.schema";
import { IPagedResponse, IPageRequest } from "@/src/lib/definitions";
import { MySql2Database } from "drizzle-orm/mysql2";
import { count, eq, like, or, sql } from "drizzle-orm";
import { books } from "../orm/schema";

export class BookRepository {
  constructor(private readonly db: MySql2Database<Record<string, never>>) {}

  async create(data: IBookBase): Promise<IBook> {
    const validatedData = BookSchemaBase.parse(data);

    const newBook = {
      ...validatedData,
      availableNumOfCopies: validatedData.totalNumOfCopies,
    };

    try {
      const [insertId] = await this.db
        .insert(books)
        .values(newBook)
        .$returningId();

      return await this.getById(insertId.id);
    } catch (error) {
      throw new Error(`Error creating book: ${(error as Error).message}`);
    }
  }

  async update(
    id: number,
    data: IBookBase,
    availableNumOfCopies?: number
  ): Promise<IBook> {
    const bookToUpdate = await this.getById(id);
    if (!bookToUpdate) {
      throw new Error("Book not found");
    }

    const validatedData = BookSchemaBase.parse(data);
    const updatedBook: IBook = {
      ...bookToUpdate,
      ...validatedData,
      availableNumOfCopies:
        availableNumOfCopies !== undefined
          ? availableNumOfCopies
          : validatedData.totalNumOfCopies -
            (bookToUpdate.totalNumOfCopies - bookToUpdate.availableNumOfCopies),
    };

    try {
      const [result] = await this.db
        .update(books)
        .set(updatedBook)
        .where(eq(books.id, id))
        .execute();
      if (result.affectedRows > 0) {
        return await this.getById(id);
      } else {
        throw new Error("Could not update book");
      }
    } catch (error) {
      throw new Error("Could not update book");
    }
  }

  async delete(id: number): Promise<IBook> {
    try {
      const bookToDelete = await this.getById(id);

      const [result] = await this.db
        .delete(books)
        .where(eq(books.id, id))
        .execute();
      if (result.affectedRows > 0) {
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

  async list(params: IPageRequest): Promise<IPagedResponse<IBook> | undefined> {
    let searchWhereClause;

    if (params.search) {
      const search = `%${params.search.toLowerCase()}%`;
      searchWhereClause = sql`${books.title} LIKE ${search} OR ${books.isbnNo} LIKE ${search}`;
    }
    try {
      const matchedBooks = (await this.db
        .select()
        .from(books)
        .where(searchWhereClause)
        .offset(params.offset)
        .limit(params.limit)) as IBook[];

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
