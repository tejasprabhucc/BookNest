DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('user', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"author" varchar(35) NOT NULL,
	"publisher" varchar(35) NOT NULL,
	"genre" varchar(35) NOT NULL,
	"isbnNo" varchar(13) NOT NULL,
	"numOfPages" integer NOT NULL,
	"totalNumOfCopies" integer NOT NULL,
	"availableNumOfCopies" integer NOT NULL,
	"coverImage" varchar(500),
	"price" integer NOT NULL,
	CONSTRAINT "books_isbnNo_unique" UNIQUE("isbnNo")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "members" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(35) NOT NULL,
	"age" integer,
	"email" varchar(255) NOT NULL,
	"phone" varchar(10),
	"address" varchar(255),
	"password" varchar(255),
	"image" varchar(500),
	"role" "role" DEFAULT 'user' NOT NULL,
	CONSTRAINT "members_email_unique" UNIQUE("email"),
	CONSTRAINT "members_password_unique" UNIQUE("password")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"memberId" bigint NOT NULL,
	"bookId" bigint NOT NULL,
	"book_status" varchar(35) NOT NULL,
	"dateOfIssue" varchar(25),
	"dueDate" varchar(25)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_memberId_members_id_fk" FOREIGN KEY ("memberId") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_bookId_books_id_fk" FOREIGN KEY ("bookId") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_isbn_idx" ON "books" USING btree ("isbnNo");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_email_idx" ON "members" USING btree ("email");