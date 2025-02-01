import { Badge } from '@/components/ui/badge';
import { DayExerciseWithRelations } from '@/types';
import { RemoveExerciseFromDayPlanButton } from './remove_exercise_from_plan_button';

type Props = {
  dayExercise: DayExerciseWithRelations;
};

export function ExerciseArticle({ dayExercise }: Props) {
  return (
    <div className="group relative overflow-hidden rounded-md">
      <article className="py-4 transition-all duration-300 ease-in-out group-hover:pr-16">
        <div className="py-2">
          <h3 className="font-semibold">{dayExercise.exercise.name}</h3>
          <p className="text-muted-foreground text-sm">
            {dayExercise.sets} sets of {dayExercise.reps} reps
          </p>
          {dayExercise.exercise.description && (
            <p className="text-muted-foreground mt-1 text-sm">
              {dayExercise.exercise.description}
            </p>
          )}
          <div className="mt-2 flex flex-wrap gap-2">
            {dayExercise.exercise.category && (
              <Badge variant="secondary">{dayExercise.exercise.category}</Badge>
            )}
            {dayExercise.exercise.primaryMuscle && (
              <Badge variant="outline">{dayExercise.exercise.primaryMuscle}</Badge>
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
              className="mt-2 block text-sm text-blue-500 hover:underline"
            >
              Learn more
            </a>
          )}
        </div>
      </article>
      <div className="absolute top-5 right-0 h-full w-12 translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-0">
        <RemoveExerciseFromDayPlanButton dayExerciseId={dayExercise.id} />
      </div>
    </div>
  );
}
