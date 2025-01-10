import { auth } from "@/lib/auth";
import { getWorkoutPlan } from "@/lib/database/queries";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { WorkoutPlanView } from "./plan-view";

export default async function PlanPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) return redirect("/sign-in");

  const planPromise = getWorkoutPlan(session.user.id);

  return (
    <div className="container py-8 mx-auto">
      <h1 className="mb-5">Your Plan</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <WorkoutPlanView workoutPlanPromise={planPromise} />
      </Suspense>
    </div>
  );
}
