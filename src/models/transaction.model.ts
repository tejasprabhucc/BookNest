import { BookStatus } from "../core/types.js";
export interface ITransactionBase {
  memberId: number;
  bookId: number;
}

export interface ITransaction extends ITransactionBase {
  id: number;
  bookStatus: BookStatus;
  dateOfIssue: string;
  dueDate: string;
}
