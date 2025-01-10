PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_dayExercise` (
	`id` text PRIMARY KEY NOT NULL,
	`sets` integer NOT NULL,
	`reps` integer NOT NULL,
	`exerciseId` text NOT NULL,
	`dayId` text NOT NULL,
	`userId` text NOT NULL,
	FOREIGN KEY (`exerciseId`) REFERENCES `exercise`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`dayId`) REFERENCES `day`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_dayExercise`("id", "sets", "reps", "exerciseId", "dayId", "userId") SELECT "id", "sets", "reps", "exerciseId", "dayId", "userId" FROM `dayExercise`;--> statement-breakpoint
DROP TABLE `dayExercise`;--> statement-breakpoint
ALTER TABLE `__new_dayExercise` RENAME TO `dayExercise`;--> statement-breakpoint
PRAGMA foreign_keys=ON;