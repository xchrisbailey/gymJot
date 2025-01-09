import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";

export const user = sqliteTable("user", {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: integer({ mode: "boolean" }).notNull(),
  image: text(),
  createdAt: integer({ mode: "timestamp" }).notNull(),
  updatedAt: integer({ mode: "timestamp" }).notNull(),
});

export const userRelations = relations(user, ({ one }) => ({
  plan: one(workoutPlan),
}));

export const session = sqliteTable("session", {
  id: text().primaryKey(),
  expiresAt: integer({ mode: "timestamp" }).notNull(),
  token: text().notNull().unique(),
  createdAt: integer({ mode: "timestamp" }).notNull(),
  updatedAt: integer({ mode: "timestamp" }).notNull(),
  ipAddress: text(),
  userAgent: text(),
  userId: text()
    .notNull()
    .references(() => user.id),
});

export const account = sqliteTable("account", {
  id: text().primaryKey(),
  accountId: text().notNull(),
  providerId: text().notNull(),
  userId: text()
    .notNull()
    .references(() => user.id),
  accessToken: text(),
  refreshToken: text(),
  idToken: text(),
  accessTokenExpiresAt: integer({
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer({
    mode: "timestamp",
  }),
  scope: text(),
  password: text(),
  createdAt: integer({ mode: "timestamp" }).notNull(),
  updatedAt: integer({ mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text().primaryKey(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: integer({ mode: "timestamp" }).notNull(),
  createdAt: integer({ mode: "timestamp" }),
  updatedAt: integer({ mode: "timestamp" }),
});

export const workoutPlan = sqliteTable("workoutPlan", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text()
    .notNull()
    .unique()
    .references(() => user.id),
});

export const workoutPlanRelations = relations(workoutPlan, ({ many, one }) => ({
  days: many(day),
  user: one(user, {
    fields: [workoutPlan.userId],
    references: [user.id],
  }),
}));

export type WorkoutPlan = typeof workoutPlan.$inferSelect;
export type NewWorkoutPlan = typeof workoutPlan.$inferInsert;

export const day = sqliteTable("day", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text({
    enum: [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ],
  }).notNull(),
  workoutPlanId: text()
    .notNull()
    .references(() => workoutPlan.id),
});

export const dayRelations = relations(day, ({ one, many }) => ({
  workoutPlan: one(workoutPlan, {
    fields: [day.workoutPlanId],
    references: [workoutPlan.id],
  }),
  dayExercises: many(dayExercise),
}));

export type Day = typeof day.$inferSelect;
export type NewDay = typeof day.$inferInsert;

export const dayExercise = sqliteTable("dayExercise", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  sets: integer().notNull(),
  reps: integer().notNull(),
  exerciseId: text()
    .notNull()
    .references(() => exercise.id),
  dayId: text()
    .notNull()
    .references(() => day.id),
});

export const dayExerciseRelations = relations(dayExercise, ({ one }) => ({
  day: one(day, {
    fields: [dayExercise.dayId],
    references: [day.id],
  }),
  exercise: one(exercise, {
    fields: [dayExercise.exerciseId],
    references: [exercise.id],
  }),
}));

export const exercise = sqliteTable("exercise", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text().notNull(),
  description: text(),
  url: text(),
  category: text(),
  primaryMuscle: text(),
  equipment: text(),
});

export const exerciseRelations = relations(exercise, ({ many }) => ({
  days: many(dayExercise),
}));

export type Exercise = typeof exercise.$inferSelect;
export type NewExercise = typeof exercise.$inferInsert;
