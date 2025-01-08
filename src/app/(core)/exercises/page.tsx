import { Suspense, use } from "react";
import { ExerciseList } from "./exercise-list";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllExercises } from "@/lib/database/queries";

export default function ExercisesPage() {
  const exercises = use(getAllExercises());

  return (
    <div className="container py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Exercise List</h1>
      <Suspense fallback={<Skeleton className="w-full h-[400px]" />}>
        <ExerciseList exercises={exercises} />
      </Suspense>
    </div>
  );
}
