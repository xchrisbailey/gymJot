PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_account` (
	`id` text PRIMARY KEY NOT NULL,
	`accountId` text NOT NULL,
	`providerId` text NOT NULL,
	`userId` text NOT NULL,
	`accessToken` text,
	`refreshToken` text,
	`idToken` text,
	`accessTokenExpiresAt` integer,
	`refreshTokenExpiresAt` integer,
	`scope` text,
	`password` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_account`("id", "accountId", "providerId", "userId", "accessToken", "refreshToken", "idToken", "accessTokenExpiresAt", "refreshTokenExpiresAt", "scope", "password", "createdAt", "updatedAt") SELECT "id", "accountId", "providerId", "userId", "accessToken", "refreshToken", "idToken", "accessTokenExpiresAt", "refreshTokenExpiresAt", "scope", "password", "createdAt", "updatedAt" FROM `account`;--> statement-breakpoint
DROP TABLE `account`;--> statement-breakpoint
ALTER TABLE `__new_account` RENAME TO `account`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_day` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`workoutPlanId` text NOT NULL,
	`userId` text,
	FOREIGN KEY (`workoutPlanId`) REFERENCES `workoutPlan`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_day`("id", "name", "workoutPlanId", "userId") SELECT "id", "name", "workoutPlanId", "userId" FROM `day`;--> statement-breakpoint
DROP TABLE `day`;--> statement-breakpoint
ALTER TABLE `__new_day` RENAME TO `day`;--> statement-breakpoint
CREATE UNIQUE INDEX `day_name_userId_unique` ON `day` (`name`,`userId`);--> statement-breakpoint
CREATE TABLE `__new_dayExercise` (
	`id` text PRIMARY KEY NOT NULL,
	`sets` integer NOT NULL,
	`reps` integer NOT NULL,
	`exerciseId` text NOT NULL,
	`dayId` text NOT NULL,
	`userId` text NOT NULL,
	FOREIGN KEY (`exerciseId`) REFERENCES `exercise`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`dayId`) REFERENCES `day`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_dayExercise`("id", "sets", "reps", "exerciseId", "dayId", "userId") SELECT "id", "sets", "reps", "exerciseId", "dayId", "userId" FROM `dayExercise`;--> statement-breakpoint
DROP TABLE `dayExercise`;--> statement-breakpoint
ALTER TABLE `__new_dayExercise` RENAME TO `dayExercise`;--> statement-breakpoint
CREATE TABLE `__new_session` (
	`id` text PRIMARY KEY NOT NULL,
	`expiresAt` integer NOT NULL,
	`token` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	`ipAddress` text,
	`userAgent` text,
	`userId` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_session`("id", "expiresAt", "token", "createdAt", "updatedAt", "ipAddress", "userAgent", "userId") SELECT "id", "expiresAt", "token", "createdAt", "updatedAt", "ipAddress", "userAgent", "userId" FROM `session`;--> statement-breakpoint
DROP TABLE `session`;--> statement-breakpoint
ALTER TABLE `__new_session` RENAME TO `session`;--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE TABLE `__new_workoutPlan` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_workoutPlan`("id", "userId") SELECT "id", "userId" FROM `workoutPlan`;--> statement-breakpoint
DROP TABLE `workoutPlan`;--> statement-breakpoint
ALTER TABLE `__new_workoutPlan` RENAME TO `workoutPlan`;--> statement-breakpoint
CREATE UNIQUE INDEX `workoutPlan_userId_unique` ON `workoutPlan` (`userId`);