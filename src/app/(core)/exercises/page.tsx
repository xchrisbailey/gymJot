import { ExerciseList } from './_components/exercise-list';
import { Skeleton } from '@/components/ui/skeleton';
import { getAllExercises } from '@/lib/database/queries';
import { Suspense } from 'react';

export default async function ExercisesPage() {
  const exercisesPromise = getAllExercises();

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Exercise List</h1>
      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <ExerciseList exercisesPromise={exercisesPromise} />
      </Suspense>
    </div>
  );
}
