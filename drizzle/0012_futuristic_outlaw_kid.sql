CREATE TABLE `log` (
	`id` text PRIMARY KEY NOT NULL,
	`date` integer NOT NULL,
	`userId` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `logExercise` (
	`id` text PRIMARY KEY NOT NULL,
	`reps` integer,
	`sets` integer NOT NULL,
	`weight` integer,
	`exerciseId` text NOT NULL,
	`logId` text NOT NULL,
	FOREIGN KEY (`exerciseId`) REFERENCES `exercise`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`logId`) REFERENCES `log`(`id`) ON UPDATE no action ON DELETE cascade
);
