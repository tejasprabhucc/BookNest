export interface IBookBase {
  title: string;
  author: string;
  publisher: string;
  genre: string;
  isbnNo: string;
  numOfPages: number;
  totalNumOfCopies: number;
}
export interface IBook extends IBookBase {
  id: number;
  availableNumOfCopies: number;
}

export interface IMemberBase {
  name: string;
  age: number;
  email: string;
  password: string;
  role: "user" | "admin";
}
export interface IMember extends IMemberBase {
  id: number;
}

export interface MemberTokensBase {
  memberId: number;
  refreshToken: string;
}

export interface MemberTokens extends MemberTokensBase {
  id: number;
}

export interface ITransactionBase {
  memberId: number;
  bookId: number;
}

export type BookStatus = "issued" | "returned";

export interface ITransaction extends ITransactionBase {
  id: number;
  bookStatus: BookStatus;
  dateOfIssue: string;
  dueDate: string;
}

export type Models = IBook | IMember | ITransaction;
export type BaseModels = IBookBase | IMemberBase | ITransactionBase;

export interface IPagedResponse<T> {
  items: T[];
  pagination: {
    offset: number;
    limit: number;
    total: number;
  };
}

export interface IPageRequest {
  search?: string;
  offset: number;
  limit: number;
}
