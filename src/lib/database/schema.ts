import { sqliteTable, text, integer, unique } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';

export const user = sqliteTable('user', {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: integer({ mode: 'boolean' }).notNull(),
  image: text(),
  createdAt: integer({ mode: 'timestamp' }).notNull(),
  updatedAt: integer({ mode: 'timestamp' }).notNull(),
});

export const userRelations = relations(user, ({ one, many }) => ({
  plan: one(workoutPlan),
  logExercises: many(logExercise),
}));

export const session = sqliteTable('session', {
  id: text().primaryKey(),
  expiresAt: integer({ mode: 'timestamp' }).notNull(),
  token: text().notNull().unique(),
  createdAt: integer({ mode: 'timestamp' }).notNull(),
  updatedAt: integer({ mode: 'timestamp' }).notNull(),
  ipAddress: text(),
  userAgent: text(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});

export const account = sqliteTable('account', {
  id: text().primaryKey(),
  accountId: text().notNull(),
  providerId: text().notNull(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text(),
  refreshToken: text(),
  idToken: text(),
  accessTokenExpiresAt: integer({
    mode: 'timestamp',
  }),
  refreshTokenExpiresAt: integer({
    mode: 'timestamp',
  }),
  scope: text(),
  password: text(),
  createdAt: integer({ mode: 'timestamp' }).notNull(),
  updatedAt: integer({ mode: 'timestamp' }).notNull(),
});

export const verification = sqliteTable('verification', {
  id: text().primaryKey(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: integer({ mode: 'timestamp' }).notNull(),
  createdAt: integer({ mode: 'timestamp' }),
  updatedAt: integer({ mode: 'timestamp' }),
});

export const workoutPlan = sqliteTable('workoutPlan', {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text()
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: 'cascade' }),
});

export const workoutPlanRelations = relations(workoutPlan, ({ many, one }) => ({
  days: many(day),
  user: one(user, {
    fields: [workoutPlan.userId],
    references: [user.id],
  }),
}));

export const day = sqliteTable(
  'day',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text({
      enum: [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ],
    }).notNull(),
    workoutPlanId: text()
      .notNull()
      .references(() => workoutPlan.id, { onDelete: 'cascade' }),
    userId: text().references(() => user.id, { onDelete: 'cascade' }),
  },
  (t) => [unique().on(t.name, t.userId)]
);

export const dayRelations = relations(day, ({ one, many }) => ({
  workoutPlan: one(workoutPlan, {
    fields: [day.workoutPlanId],
    references: [workoutPlan.id],
  }),
  user: one(user, {
    fields: [day.userId],
    references: [user.id],
  }),
  dayExercises: many(dayExercise),
}));

export const dayExercise = sqliteTable('dayExercise', {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  sets: integer().notNull(),
  reps: integer().notNull(),
  exerciseId: text()
    .notNull()
    .references(() => exercise.id, { onDelete: 'cascade' }),
  dayId: text()
    .notNull()
    .references(() => day.id, { onDelete: 'cascade' }),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});

export const dayExerciseRelations = relations(dayExercise, ({ one }) => ({
  day: one(day, {
    fields: [dayExercise.dayId],
    references: [day.id],
  }),
  user: one(user, {
    fields: [dayExercise.userId],
    references: [user.id],
  }),
  exercise: one(exercise, {
    fields: [dayExercise.exerciseId],
    references: [exercise.id],
  }),
}));

export const exercise = sqliteTable('exercise', {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text().notNull().unique(),
  description: text(),
  url: text(),
  category: text(),
  primaryMuscle: text(),
  equipment: text(),
});

export const exerciseRelations = relations(exercise, ({ many }) => ({
  days: many(dayExercise),
  logExercises: many(logExercise),
}));

export const logExercise = sqliteTable(
  'logExercise',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId()),
    reps: integer(),
    sets: integer().notNull(),
    weight: integer(),
    exerciseId: text()
      .notNull()
      .references(() => exercise.id),
    date: text().notNull(),
    userId: text()
      .notNull()
      .references(() => user.id),
  },
  (t) => [unique().on(t.exerciseId, t.date, t.userId)]
);

export const logExerciseRelations = relations(logExercise, ({ one }) => ({
  exercise: one(exercise, {
    fields: [logExercise.exerciseId],
    references: [exercise.id],
  }),
  user: one(user, {
    fields: [logExercise.userId],
    references: [user.id],
  }),
}));
