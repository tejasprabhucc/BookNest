import {
  mysqlTable,
  int,
  varchar,
  serial,
  bigint,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

// Books Table
export const books = mysqlTable("books", {
  id: serial("id"),
  title: varchar("title", { length: 255 }).notNull(),
  author: varchar("author", { length: 35 }).notNull(),
  publisher: varchar("publisher", { length: 35 }).notNull(),
  genre: varchar("genre", { length: 35 }).notNull(),
  isbnNo: varchar("isbnNo", { length: 13 }).notNull().unique(),
  numOfPages: int("numOfPages").notNull(),
  totalNumOfCopies: int("totalNumOfCopies").notNull(),
  availableNumOfCopies: int("availableNumOfCopies").notNull(),
  coverImage: varchar("coverImage", { length: 500 }),
  price: int("price").notNull(),
});

// Members Table
export const members = mysqlTable("members", {
  id: serial("id"),
  name: varchar("name", { length: 35 }).notNull(),
  age: int("age"),
  email: varchar("email", { length: 255 }).unique().notNull(),
  phone: varchar("phone", { length: 10 }),
  address: varchar("address", { length: 255 }),
  password: varchar("password", { length: 255 }).unique(),
  image: varchar("coverImage", { length: 500 }),
  role: mysqlEnum("role", ["user", "admin"]).notNull().default("user"),
});

// Transactions Table
export const transactions = mysqlTable("transactions", {
  id: serial("id"),
  memberId: bigint("memberId", { mode: "bigint", unsigned: true })
    .references(() => members.id, { onDelete: "cascade" })
    .notNull(),
  bookId: bigint("bookId", { mode: "bigint", unsigned: true })
    .references(() => books.id, { onDelete: "cascade" })
    .notNull(),
  bookStatus: varchar("bookStatus", {
    length: 35,
    enum: ["pending", "rejected", "issued", "returned"],
  }).notNull(),
  dateOfIssue: varchar("dateOfIssue", { length: 25 }),
  dueDate: varchar("dueDate", { length: 25 }),
});

export const memberTokens = mysqlTable("memberTokens", {
  id: serial("id"),
  memberId: bigint("memberId", { mode: "bigint", unsigned: true })
    .references(() => members.id, { onDelete: "cascade" })
    .notNull(),
  refreshToken: varchar("refreshToken", { length: 255 }).unique(),
});
