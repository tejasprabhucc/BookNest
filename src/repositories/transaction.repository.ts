import { IRepository } from "../core/repository";
import { ITransaction, ITransactionBase } from "../models/transaction.model";
import { ITransactionBaseSchema } from "../models/transaction.schema";
import { BookRepository } from "../repositories/book.repository";
import { MemberRepository } from "../repositories/member.repository";
import { MySql2Database } from "drizzle-orm/mysql2";
import { transactions } from "../orm/schema";
import { count, eq, or } from "drizzle-orm";
import { IPagedResponse, IPageRequest } from "../core/pagination";

export class TransactionRepository
  implements IRepository<ITransactionBase, ITransaction>
{
  private bookRepo: BookRepository;
  private memberRepo: MemberRepository;

  constructor(private readonly db: MySql2Database<Record<string, never>>) {
    this.bookRepo = new BookRepository(this.db);
    this.memberRepo = new MemberRepository(this.db);
  }

  async create(data: ITransactionBase): Promise<ITransaction> {
    const validatedData = ITransactionBaseSchema.parse(data);

    try {
      return await this.db.transaction(async (tx) => {
        const book = await this.bookRepo.getById(validatedData.bookId);

        if (!book || book.availableNumOfCopies <= 0) {
          throw new Error(
            "The book is not available or has no available copies."
          );
        }

        const newTransaction: ITransaction = {
          ...validatedData,
          bookStatus: "issued",
          dateOfIssue: new Date().toDateString(),
          dueDate: new Date(
            new Date().setDate(new Date().getDate() + 14)
          ).toDateString(),
          id: 0,
        };

        const [insertId] = await tx
          .insert(transactions)
          .values(newTransaction)
          .$returningId();

        await this.bookRepo.update(
          book.id,
          book,
          book.availableNumOfCopies - 1
        );

        return await this.getById(insertId.id);
      });
    } catch (error) {
      throw new Error(
        `Error creating transaction: ${(error as Error).message}`
      );
    }
  }

  async returnBook(id: number): Promise<ITransaction> {
    try {
      const transaction = await this.getById(id);

      if (!transaction) {
        throw new Error(
          "Transaction not found. Please enter correct transaction ID."
        );
      }

      if (transaction.bookStatus === "returned") {
        throw new Error("This book has already been returned.");
      }

      return await this.db.transaction(async (tx) => {
        const book = await this.bookRepo.getById(transaction.bookId);

        if (!book) {
          throw new Error("Book not found.");
        }

        const updatedTransaction: ITransaction = {
          ...transaction,
          bookStatus: "returned",
        };

        await tx
          .update(transactions)
          .set(updatedTransaction)
          .where(eq(transactions.id, id))
          .execute();

        await this.bookRepo.update(
          book.id,
          book,
          book.availableNumOfCopies + 1
        );

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
        .execute()) as ITransaction[];
      if (!transaction) {
        throw new Error("Transaction not found");
      }
      return transaction;
    } catch (error) {
      throw new Error(`Transaction not found: ${(error as Error).message}`);
    }
  }

  async list(
    params: IPageRequest
  ): Promise<IPagedResponse<ITransaction> | undefined> {
    let searchWhereClause;

    if (params.search) {
      const search = Number(params.search);
      searchWhereClause = or(
        eq(transactions.bookId, search),
        eq(transactions.memberId, search)
      );
    }

    try {
      const matchedTransactions = (await this.db
        .select()
        .from(transactions)
        .where(searchWhereClause)
        .offset(params.offset)
        .limit(params.limit)) as ITransaction[];

      if (matchedTransactions.length > 0) {
        const [totalMatchedTransactions] = await this.db
          .select({ count: count() })
          .from(transactions)
          .where(searchWhereClause);

        return {
          items: matchedTransactions,
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

  // Not required methods
  update(id: number, data: ITransactionBase): Promise<ITransaction> {
    throw new Error("Method not implemented.");
  }

  delete(id: number): Promise<ITransaction> {
    throw new Error("Method not implemented.");
  }
}
