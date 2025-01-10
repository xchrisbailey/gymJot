import { Badge } from "@/components/ui/badge";
import { DayExerciseWithRelations } from "@/types";

type Props = {
  dayExercise: DayExerciseWithRelations;
};

export function ExerciseArticle({ dayExercise }: Props) {
  return (
    <article>
      <div className="py-2">
        <h3 className="font-semibold">{dayExercise.exercise.name}</h3>
        <p className="text-sm text-muted-foreground">
          {dayExercise.sets} sets of {dayExercise.reps} reps
        </p>
        {dayExercise.exercise.description && (
          <p className="mt-1 text-sm text-muted-foreground">
            {dayExercise.exercise.description}
          </p>
        )}
        <div className="flex flex-wrap gap-2 mt-2">
          {dayExercise.exercise.category && (
            <Badge variant="secondary">{dayExercise.exercise.category}</Badge>
          )}
          {dayExercise.exercise.primaryMuscle && (
            <Badge variant="outline">
              {dayExercise.exercise.primaryMuscle}
            </Badge>
          )}
          {dayExercise.exercise.equipment && (
            <Badge>{dayExercise.exercise.equipment}</Badge>
          )}
        </div>
        {dayExercise.exercise.url && (
          <a
            href={dayExercise.exercise.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 text-sm text-blue-500 hover:underline"
          >
            Learn more
          </a>
        )}
      </div>
    </article>
  );
}
