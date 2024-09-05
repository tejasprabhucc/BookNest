CREATE TABLE `books` (
	`id` serial AUTO_INCREMENT,
	`title` varchar(255) NOT NULL,
	`author` varchar(35) NOT NULL,
	`publisher` varchar(35) NOT NULL,
	`genre` varchar(35) NOT NULL,
	`isbnNo` varchar(13) NOT NULL,
	`numOfPages` int NOT NULL,
	`totalNumOfCopies` int NOT NULL,
	`availableNumOfCopies` int NOT NULL,
	CONSTRAINT `books_isbnNo_unique` UNIQUE(`isbnNo`)
);
--> statement-breakpoint
CREATE TABLE `memberTokens` (
	`id` serial AUTO_INCREMENT,
	`memberId` bigint unsigned NOT NULL,
	`refreshToken` varchar(255),
	CONSTRAINT `memberTokens_refreshToken_unique` UNIQUE(`refreshToken`)
);
--> statement-breakpoint
CREATE TABLE `members` (
	`id` serial AUTO_INCREMENT,
	`name` varchar(35) NOT NULL,
	`age` int,
	`email` varchar(255) NOT NULL,
	`password` varchar(255),
	`phoneNumber` varchar(10),
	`address` varchar(255),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`joinDate` date DEFAULT CURRENT_DATE,
	`borrowedBooksCount` int DEFAULT 0,
	CONSTRAINT `members_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` serial AUTO_INCREMENT,
	`memberId` bigint unsigned NOT NULL,
	`bookId` bigint unsigned NOT NULL,
	`bookStatus` varchar(35) NOT NULL,
	`dateOfIssue` varchar(15) NOT NULL,
	`dueDate` varchar(15) NOT NULL
);
--> statement-breakpoint
ALTER TABLE `memberTokens` ADD CONSTRAINT `memberTokens_memberId_members_id_fk` FOREIGN KEY (`memberId`) REFERENCES `members`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_memberId_members_id_fk` FOREIGN KEY (`memberId`) REFERENCES `members`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_bookId_books_id_fk` FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON DELETE cascade ON UPDATE no action;