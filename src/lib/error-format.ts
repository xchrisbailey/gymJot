import { LibsqlError } from '@libsql/client';

export function errorToReponseMessage(e: unknown): string {
  if (e instanceof LibsqlError) {
    switch (e.message) {
      case 'SQLITE_CONSTRAINT_UNIQUE: UNIQUE constraint failed: logExercise.exerciseId, logExercise.date, logExercise.userId':
        return "You've already logged this exercise for today";
      default:
        return 'unknown database error';
    }
  }

  if (e instanceof Error) {
    return e.message;
  }

  return 'An unknown error occurred';
}
