import { BookStatus, IBook, IMember, IRepository } from "@/src/lib/definitions";
import { ITransaction, ITransactionBase } from "@/src/lib/definitions";
import {
  TransactionBaseSchema,
  TransactionSchema,
} from "@/src/models/transaction.schema";
import { BookRepository } from "@/src/repositories/book.repository";
import { MemberRepository } from "@/src/repositories/member.repository";
import { MySql2Database } from "drizzle-orm/mysql2";
import { books, members, transactions } from "@/src/orm/schema";
import { and, count, desc, eq, or, param, sql } from "drizzle-orm";
import { IPagedResponse, IPageRequest } from "@/src/lib/definitions";

export interface ITransactionDetails {
  id: number;
  memberId: bigint;
  bookId: bigint;
  bookStatus: BookStatus;
  dateOfIssue: string | null;
  book: IBook;
  member?: IMember;
}
export class TransactionRepository
  implements IRepository<ITransactionBase, ITransaction>
{
  private bookRepo: BookRepository;
  private memberRepo: MemberRepository;

  constructor(private readonly db: MySql2Database<Record<string, never>>) {
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
      const newTransaction: ITransaction = {
        ...validatedData,
        bookStatus: "pending",
        dateOfIssue: null,
        id: 0,
      };

      const [insertId] = await this.db
        .insert(transactions)
        .values(newTransaction);

      return await this.getById(insertId.insertId);
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
          dateOfIssue: new Date().toDateString(),
          id: transaction.id,
        };

        await tx
          .update(transactions)
          .set(updatedTransaction)
          .where(eq(transactions.id, id))
          .execute();

        const [bookUpdated] = await tx
          .update(books)
          .set({
            ...book,
            availableNumOfCopies: book.availableNumOfCopies - 1, // Decrement the copies
          })
          .where(eq(books.id, book.id))
          .execute();

        if (bookUpdated.affectedRows === 0) {
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

        const [result] = await tx
          .update(books)
          .set({ availableNumOfCopies: book.availableNumOfCopies + 1 })
          .where(eq(books.id, book.id))
          .execute();
        console.log("Returning book 2");

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
      sortBy?: keyof ITransactionDetails;
      sortOrder?: "asc" | "desc";
    }
  ): Promise<IPagedResponse<ITransactionDetails> | undefined> {
    let searchWhereClause = sql`1 = 1`;

    if (params.search) {
      const search = `%${params.search.toLowerCase()}%`;

      searchWhereClause = sql`
      (${transactions.bookId} LIKE ${search} 
       OR ${transactions.memberId} LIKE ${search})
    `;
    }

    if (memberId) {
      searchWhereClause = sql`${searchWhereClause} AND ${transactions.memberId} = ${memberId}`;
    }

    const sortBy = sortOptions?.sortBy ? sortOptions.sortBy : "id";
    const sortOrder = sortOptions?.sortOrder === "asc" ? sql`asc` : sql`desc`;

    try {
      const matchedTransactions = await this.db
        .select()
        .from(transactions)
        .leftJoin(books, eq(transactions.bookId, books.id))
        .leftJoin(members, eq(transactions.memberId, members.id))
        .where(searchWhereClause)
        .offset(params.offset)
        .limit(params.limit)
        .orderBy(sql`${sortBy} ${sortOrder}`)
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

  async update(id: number, data: ITransaction): Promise<ITransaction> {
    try {
      const validatedData = TransactionSchema.parse(data);

      const [result] = await this.db
        .update(transactions)
        .set(validatedData)
        .where(eq(transactions.id, id))
        .execute();

      if (result.affectedRows > 0) {
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

      const [result] = await this.db
        .delete(transactions)
        .where(eq(transactions.id, id))
        .execute();
      if (result.affectedRows > 0) {
        return transactionToDelete;
      } else {
        throw new Error(`Book deletion failed`);
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
