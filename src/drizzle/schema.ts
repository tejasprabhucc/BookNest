import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import {
  pgTable,
  serial,
  varchar,
  integer,
  bigint,
  pgEnum,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// Use drizzle to send queries to your database
export const db = drizzle(sql);
export const roleEnum = pgEnum("role", ["user", "admin"]);

// Books Table
export const books = pgTable(
  "books",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    author: varchar("author", { length: 35 }).notNull(),
    publisher: varchar("publisher", { length: 35 }).notNull(),
    genre: varchar("genre", { length: 35 }).notNull(),
    isbnNo: varchar("isbnNo", { length: 13 }).notNull().unique(),
    numOfPages: integer("numOfPages").notNull(),
    totalNumOfCopies: integer("totalNumOfCopies").notNull(),
    availableNumOfCopies: integer("availableNumOfCopies").notNull(),
    coverImage: varchar("coverImage", { length: 500 }),
    price: integer("price").notNull(),
  },
  (books) => {
    return {
      uniqueIsbnIdx: uniqueIndex("unique_isbn_idx").on(books.isbnNo),
    };
  }
);

// Members Table
export const members = pgTable(
  "members",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 35 }).notNull(),
    age: integer("age"),
    email: varchar("email", { length: 255 }).unique().notNull(),
    phone: varchar("phone", { length: 10 }),
    address: varchar("address", { length: 255 }),
    password: varchar("password", { length: 255 }).unique(),
    image: varchar("image", { length: 500 }),
    role: roleEnum("role").notNull().default("user"),
  },
  (members) => {
    return {
      uniqueEmailIdx: uniqueIndex("unique_email_idx").on(members.email),
    };
  }
);

// Transactions Table
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  memberId: bigint("memberId", { mode: "bigint" })
    .references(() => members.id, { onDelete: "cascade" })
    .notNull(),
  bookId: bigint("bookId", { mode: "bigint" })
    .references(() => books.id, { onDelete: "cascade" })
    .notNull(),
  bookStatus: varchar("book_status", { length: 35 }).notNull(),
  dateOfIssue: varchar("dateOfIssue", { length: 25 }),
  dueDate: varchar("dueDate", { length: 25 }),
});
