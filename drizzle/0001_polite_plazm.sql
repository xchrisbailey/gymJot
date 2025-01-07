CREATE TABLE `day` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`workoutPlanId` text NOT NULL,
	FOREIGN KEY (`workoutPlanId`) REFERENCES `workoutPlan`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `dayExercise` (
	`id` text PRIMARY KEY NOT NULL,
	`sets` integer NOT NULL,
	`reps` integer NOT NULL,
	`exerciseId` text NOT NULL,
	`dayId` text NOT NULL,
	FOREIGN KEY (`exerciseId`) REFERENCES `exercise`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`dayId`) REFERENCES `day`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `exercise` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`url` text
);
--> statement-breakpoint
CREATE TABLE `workoutPlan` (
	`id` text PRIMARY KEY NOT NULL
);
