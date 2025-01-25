import { auth } from '@/lib/auth';
import { getWorkoutPlan } from '@/lib/database/queries';
import { headers } from 'next/headers';
import { unauthorized } from 'next/navigation';
import { Suspense } from 'react';
import { WorkoutPlanView } from './_components/plan_view';

export default async function PlanPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) unauthorized();

  const planPromise = getWorkoutPlan(session.user.id);

  return (
    <div className="container mx-auto py-8">
      <Suspense fallback={<div>Loading...</div>}>
        <WorkoutPlanView workoutPlanPromise={planPromise} />
      </Suspense>
    </div>
  );
}
