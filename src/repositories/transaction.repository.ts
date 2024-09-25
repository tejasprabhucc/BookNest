import {
  BookStatus,
  FilterOptions,
  IBook,
  IMember,
  IRepository,
} from "@/src/lib/definitions";
import { ITransaction, ITransactionBase } from "@/src/lib/definitions";
import {
  TransactionBaseSchema,
  TransactionSchema,
} from "@/src/models/transaction.schema";
import { BookRepository } from "@/src/repositories/book.repository";
import { MemberRepository } from "@/src/repositories/member.repository";
import { MySql2Database } from "drizzle-orm/mysql2";
import { books, members, transactions } from "@/src/drizzle/schema";
import { asc, count, desc, eq, ilike, sql } from "drizzle-orm";
import { IPagedResponse, IPageRequest } from "@/src/lib/definitions";
import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";

export interface ITransactionDetails {
  id: number;
  memberId: bigint;
  bookId: bigint;
  bookStatus: BookStatus;
  dateOfIssue: string | null;
  dueDate: string | null;
  book: IBook;
  member?: IMember;
}
export class TransactionRepository
  implements IRepository<ITransactionBase, ITransaction>
{
  private bookRepo: BookRepository;
  private memberRepo: MemberRepository;

  constructor(private readonly db: VercelPgDatabase<Record<string, unknown>>) {
    this.bookRepo = new BookRepository(this.db);
    this.memberRepo = new MemberRepository(this.db);
  }

  async list(
    params: IPageRequest
  ): Promise<IPagedResponse<ITransaction> | undefined> {
    throw new Error("Method not implemented.");
  }

  async create(data: ITransactionBase): Promise<ITransaction> {
    const validatedData = TransactionBaseSchema.parse(data);
    try {
      const [result] = await this.db
        .insert(transactions)
        .values({
          ...validatedData,
          bookStatus: "pending",
          dateOfIssue: null,
          dueDate: null,
        })
        .returning({ id: books.id });

      return await this.getById(result.id);
    } catch (error) {
      throw new Error(
        `Error creating transaction: ${(error as Error).message}`
      );
    }
  }

  async issueBook(id: number): Promise<ITransaction> {
    try {
      const transaction = await this.getById(id);

      if (!transaction) {
        throw new Error("Transaction not found.");
      }

      if (transaction.bookStatus === "issued") {
        throw new Error("This book has already been issued.");
      }

      return await this.db.transaction(async (tx) => {
        const book = await this.bookRepo.getById(Number(transaction.bookId));

        if (!book) {
          throw new Error("Book not found.");
        }

        const updatedTransaction: ITransaction = {
          ...transaction,
          memberId: BigInt(transaction.memberId),
          bookId: BigInt(transaction.bookId),
          bookStatus: "issued",
          dateOfIssue: new Date().toDateString().split("T")[0],
          dueDate: new Date(new Date().setDate(new Date().getDate() + 7))
            .toISOString()
            .split("T")[0],
          id: transaction.id,
        };

        await tx
          .update(transactions)
          .set(updatedTransaction)
          .where(eq(transactions.id, id))
          .execute();

        const bookUpdated = await tx
          .update(books)
          .set({
            ...book,
            availableNumOfCopies: book.availableNumOfCopies - 1, // Decrement the copies
          })
          .where(eq(books.id, book.id))
          .execute();

        if (bookUpdated.rowCount === 0) {
          throw new Error(`Couldn't update book ${book.id} ${book.title}`);
        }

        return updatedTransaction;
      });
    } catch (error) {
      throw new Error(`Error issueing book: ${(error as Error).message}`);
    }
  }

  async returnBook(id: number): Promise<ITransaction> {
    try {
      const transaction = await this.getById(id);

      if (!transaction) {
        throw new Error("Transaction not found.");
      }

      if (transaction.bookStatus === "returned") {
        throw new Error("This book has already been returned.");
      }

      return await this.db.transaction(async (tx) => {
        const book = await this.bookRepo.getById(Number(transaction.bookId));

        if (!book) {
          throw new Error("Book not found.");
        }

        const updatedTransaction: ITransaction = {
          ...transaction,
          memberId: BigInt(transaction.memberId),
          bookId: BigInt(transaction.bookId),
          bookStatus: "returned",
          id: transaction.id,
        };

        await tx
          .update(transactions)
          .set(updatedTransaction)
          .where(eq(transactions.id, id))
          .execute();

        const result = await tx
          .update(books)
          .set({ availableNumOfCopies: book.availableNumOfCopies + 1 })
          .where(eq(books.id, book.id))
          .execute();

        return updatedTransaction;
      });
    } catch (error) {
      throw new Error(`Error returning book: ${(error as Error).message}`);
    }
  }

  async getById(id: number): Promise<ITransaction> {
    try {
      const [transaction] = (await this.db
        .select()
        .from(transactions)
        .where(eq(transactions.id, id))
        .limit(1)
        .execute()) as unknown as ITransaction[];
      if (!transaction) {
        throw new Error("Transaction not found");
      }
      return transaction;
    } catch (error) {
      throw new Error(`Transaction not found: ${(error as Error).message}`);
    }
  }

  async listTransactionDetails(
    params: IPageRequest,
    memberId?: bigint,
    sortOptions?: {
      sortBy: keyof ITransaction;
      sortOrder: "asc" | "desc";
    },
    filterOptions?: FilterOptions<ITransaction>
  ): Promise<IPagedResponse<ITransactionDetails> | undefined> {
    let searchWhereClause = sql`1 = 1`;
    if (params.search) {
      const search = `%${params.search.toLowerCase()}%`;

      searchWhereClause = sql`
      (${transactions.bookId} ILIKE ${search}
       OR ${transactions.memberId} ILIKE ${search})
    `;
    }

    // if (params.search) {
    //   const searchTerm = `%${params.search.toLowerCase()}%`;
    //   const searchFields = [
    //     transactions.bookId,
    //     transactions.memberId,
    //     members.name,
    //     books.title,
    //   ];

    //   searchWhereClause = sql`
    //     (${searchFields
    //       .map((field) => `${field} LIKE ${searchTerm}`)
    //       .join(" OR ")})
    //   `;
    // }

    if (memberId) {
      searchWhereClause = sql`${searchWhereClause} AND ${transactions.memberId} = ${memberId} AND ${transactions.bookStatus} = 'issued'`;
    }

    let sortOrder = sql``;
    if (sortOptions) {
      const sortBy = transactions[sortOptions.sortBy] || transactions.id;
      sortOrder = sortOptions.sortOrder === "asc" ? asc(sortBy) : desc(sortBy);
    }

    try {
      const matchedTransactions = await this.db
        .select()
        .from(transactions)
        .leftJoin(books, eq(transactions.bookId, books.id))
        .leftJoin(members, eq(transactions.memberId, members.id))
        .where(searchWhereClause)
        .offset(params.offset)
        .limit(params.limit)
        .orderBy(sortOrder)
        .execute();

      if (matchedTransactions.length > 0) {
        const [totalMatchedTransactions] = await this.db
          .select({
            count: count(),
          })
          .from(transactions)
          .leftJoin(books, eq(transactions.bookId, books.id))
          .leftJoin(members, eq(transactions.memberId, members.id))
          .where(searchWhereClause)
          .execute();

        return {
          items: matchedTransactions.map((transaction) => ({
            ...transaction.transactions,
            bookStatus: transaction.transactions.bookStatus as BookStatus,
            book: transaction.books as IBook,
            member: transaction.members as IMember,
          })),
          pagination: {
            offset: params.offset,
            limit: params.limit,
            total: totalMatchedTransactions.count,
          },
        };
      } else {
        throw new Error("No transactions found matching the criteria");
      }
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }

  async getDueBooks(params: IPageRequest, memberId?: bigint) {
    // Initialize the searchWhereClause to filter only "issued" books
    let searchWhereClause = sql``;

    // Filter by memberId if provided
    if (memberId) {
      searchWhereClause = sql`${transactions.memberId} = ${memberId}`;
    }
    // let sortOrder = sql`ORDER BY ${transactions.dueDate} DESC`;

    try {
      const matchedTransactions = await this.db
        .select()
        .from(transactions)
        .leftJoin(books, eq(transactions.bookId, books.id))
        .leftJoin(members, eq(transactions.memberId, members.id))
        .where(searchWhereClause)
        .offset(params.offset)
        .limit(params.limit)
        // .orderBy(sortOrder)
        .execute();

      if (matchedTransactions.length > 0) {
        const [totalMatchedTransactions] = await this.db
          .select({
            count: count(),
          })
          .from(transactions)
          .leftJoin(books, eq(transactions.bookId, books.id))
          .leftJoin(members, eq(transactions.memberId, members.id))
          .where(searchWhereClause)
          .execute();

        return {
          items: matchedTransactions.map((transaction) => ({
            ...transaction.transactions,
            bookStatus: transaction.transactions.bookStatus as BookStatus,
            book: transaction.books as IBook,
            member: transaction.members as IMember,
          })),
          pagination: {
            offset: params.offset,
            limit: params.limit,
            total: totalMatchedTransactions.count,
          },
        };
      } else {
        throw new Error("/No transactions found matching the criteria.");
      }
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }

  async update(id: number, data: ITransaction): Promise<ITransaction> {
    try {
      const validatedData = TransactionSchema.parse(data);

      const result = await this.db
        .update(transactions)
        .set(validatedData)
        .where(eq(transactions.id, id))
        .execute();

      if (result.rowCount) {
        return await this.getById(id);
      } else {
        throw new Error("Could not update transaction");
      }
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async delete(id: number): Promise<ITransaction> {
    try {
      const transactionToDelete = this.getById(id);

      if (!transactionToDelete) {
        throw new Error("Transaction not found");
      }

      const result = await this.db
        .delete(transactions)
        .where(eq(transactions.id, id))
        .execute();
      if (result.rowCount) {
        return transactionToDelete;
      } else {
        throw new Error(`Book deletion failed`);
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
