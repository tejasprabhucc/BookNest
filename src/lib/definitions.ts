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

export type Role = "user" | "admin";
export interface IMemberBase {
  name: string;
  age: number | null;
  email: string;
  password: string;
  role: Role;
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
  memberId: bigint;
  bookId: bigint;
}

export type BookStatus = "pending" | "rejected" | "issued" | "returned";

export interface ITransaction extends ITransactionBase {
  id: number;
  bookStatus: BookStatus;
  dateOfIssue: string | null;
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

export interface IPaginationOptions {
  offset: number;
  limit: number;
  total: number;
}

export interface IPageRequest {
  column?: string;
  search?: string;
  offset: number;
  limit: number;
}

export interface IRepository<
  MutationModel,
  CompleteModel extends MutationModel
> {
  create(data: MutationModel): Promise<CompleteModel | undefined>;
  update(id: number, data: MutationModel): Promise<CompleteModel | undefined>;
  delete(id: number): Promise<CompleteModel | undefined>;
  getById(id: number): Promise<CompleteModel | undefined>;
  list(
    params: IPageRequest
  ): Promise<IPagedResponse<CompleteModel> | undefined>;
}

export interface INavOption {
  label: string;
  url: string;
  icon: React.ComponentType;
}
