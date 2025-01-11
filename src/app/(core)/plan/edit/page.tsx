import { auth } from "@/lib/auth";
import { getAllExercises, getWorkoutPlanDay } from "@/lib/database/queries";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ExerciseArticle } from "../_components/exercise_article";
import ExerciseToPlanForm from "../_components/exercise_to_plan_form";

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
      <h1 className="mb-5">
        <span style={{ textTransform: "capitalize" }}>{day}</span> Plan
      </h1>
      <div className="grid grid-cols-2 gap-5 w-full">
        <div>
          <h2>Current Exercises</h2>
          {dayPlan.dayExercises.map((dayExercise) => (
            <ExerciseArticle dayExercise={dayExercise} key={dayExercise.id} />
          ))}
        </div>
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
