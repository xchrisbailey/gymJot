import { getWorkoutPlan } from "@/lib/database/queries";
import { Suspense } from "react";
import Form from "next/form";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { newWorkoutPlanAction } from "./_actions";

export default async function PlanPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) return redirect("/sign-in");

  const plan = await getWorkoutPlan(session.user.id);

  return (
    <div className="container py-8 mx-auto">
      <h1 className="mb-5">Your Plan</h1>
      <Suspense fallback={<div>Loading...</div>}>
        {!plan ? (
          <>
            <p className="text-orange-600">No Plan Found.</p>
            <Form action={newWorkoutPlanAction}>
              <Button>Create A Plan</Button>
            </Form>
          </>
        ) : (
          <p>plan stuff</p>
        )}
      </Suspense>
    </div>
  );
}
