import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getAllExercises } from '@/lib/database/queries';
import AddExerciseToPlanForm from './add-exercise-to-plan-form';

type Props = {
  params: Promise<{
    dayId: string;
  }>;
};

export default async function AddExerciseToPlanPage({ params }: Props) {
  const exercisesPromise = getAllExercises();
  const { dayId } = await params;

  return (
    <div className="container mx-auto py-6">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>Add Exercise</CardTitle>
        </CardHeader>
        <CardContent>
          <AddExerciseToPlanForm exercisesPromise={exercisesPromise} dayId={dayId} />
        </CardContent>
      </Card>
    </div>
  );
}
