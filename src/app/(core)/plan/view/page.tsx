import { auth } from "@/lib/auth";
import { getAllExercises, getWorkoutPlanDay } from "@/lib/database/queries";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ExerciseArticle } from "../_components/exercise_article";
import ExerciseToPlanForm from "../_components/exercise_to_plan_form";
import { Separator } from "@/components/ui/separator";
import { BackButton } from "../_components/back_button";

type Props = {
  searchParams: Promise<{
    day:
      | "monday"
      | "tuesday"
      | "wednesday"
      | "thursday"
      | "friday"
      | "saturday"
      | "sunday";

    [key: string]: string | string[] | undefined;
  }>;
};

export default async function EditPlanPage(props: Props) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return redirect("/sign-in");

  const exercisesPromise = getAllExercises();

  const day = (await props.searchParams).day;
  const dayPlan = await getWorkoutPlanDay(day, session.user.id);

  if (!dayPlan) return redirect("/plan");

  return (
    <div className="container py-8 mx-auto">
      <div className="flex justify-end items-center mb-5">
        <div>
          <BackButton />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 w-full md:grid-cols-2">
        <div>
          <h2>Current Exercises</h2>
          {dayPlan.dayExercises.map((dayExercise) => (
            <ExerciseArticle dayExercise={dayExercise} key={dayExercise.id} />
          ))}
        </div>
        <Separator className="md:hidden" decorative={true} />
        <div>
          <h2>Add Exercises</h2>
          <ExerciseToPlanForm
            exercisesPromise={exercisesPromise}
            dayId={dayPlan.id}
          />
        </div>
      </div>
    </div>
  );
}
