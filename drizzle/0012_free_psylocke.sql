CREATE TABLE `logExercise` (
	`id` text PRIMARY KEY NOT NULL,
	`reps` integer,
	`sets` integer NOT NULL,
	`weight` integer,
	`exerciseId` text NOT NULL,
	`date` text NOT NULL,
	`userId` text NOT NULL,
	FOREIGN KEY (`exerciseId`) REFERENCES `exercise`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
