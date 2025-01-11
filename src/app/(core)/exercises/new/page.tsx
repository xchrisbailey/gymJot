import NewExerciseForm from "./new_exercise_form";

export default async function NewExercisePage() {
  return (
    <div className="mx-auto mt-2 w-full md:max-w-lg">
      <h1>Add Exercise</h1>
      <NewExerciseForm />
    </div>
  );
}
