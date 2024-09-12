import { IBook } from "@/src/lib/definitions";
import { BookSchemaBase, IBookBase } from "@/src/models/book.schema";
import { IPagedResponse, IPageRequest } from "@/src/lib/definitions";
import { MySql2Database } from "drizzle-orm/mysql2";
import { count, eq, sql } from "drizzle-orm";
import { books } from "@/src/orm/schema";

export class BookRepository {
  constructor(private readonly db: MySql2Database<Record<string, never>>) {}

  async create(data: IBookBase): Promise<IBook> {
    const validatedData = BookSchemaBase.parse(data);

    const newBook = {
      ...validatedData,
      availableNumOfCopies: validatedData.totalNumOfCopies,
    };

    try {
      const [result] = await this.db.insert(books).values(newBook);

      return await this.getById(result.insertId);
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

      const [result] = await this.db
        .update(books)
        .set(updatedBook)
        .where(eq(books.id, id))
        .execute();

      if (result.affectedRows > 0) {
        console.log(`Book successfully updated.`);
        return await this.getById(id);
      } else {
        throw new Error("Failed to update the book");
      }
    } catch (error) {
      console.error(`Error updating book:`, (error as Error).message);
      throw new Error(`Error updating book: ${(error as Error).message}`);
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

  async list(params: IPageRequest): Promise<IPagedResponse<IBook> | null> {
    if (!this.db) {
      return null;
    }
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
