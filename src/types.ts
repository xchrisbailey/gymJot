export type ActionState = {
  error?: string;
  success?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // This allows for additional properties
};

export type ExerciseCategory =
  | "Strength Training"
  | "Cardiovascular"
  | "Flexibility & Mobility"
  | "Balance & Stability"
  | "Functional Training"
  | "Recovery & Regeneration";

export type MuscleGroup =
  // Upper Body - Front
  | "Chest"
  | "Anterior Deltoids"
  | "Biceps"
  | "Forearms"
  // Upper Body - Back
  | "Upper Back (Trapezius)"
  | "Middle Back (Rhomboids)"
  | "Lower Back (Erector Spinae)"
  | "Lats (Latissimus Dorsi)"
  | "Posterior Deltoids"
  | "Triceps"
  // Core
  | "Rectus Abdominis"
  | "Obliques"
  | "Transverse Abdominis"
  | "Serratus Anterior"
  // Lower Body - Front
  | "Quadriceps"
  | "Hip Flexors"
  | "Tibialis Anterior"
  // Lower Body - Back
  | "Hamstrings"
  | "Glutes"
  | "Calves (Gastrocnemius)"
  | "Soleus"
  // Stabilizers/Other
  | "Rotator Cuff"
  | "Hip Abductors"
  | "Hip Adductors"
  | "Pelvic Floor"
  | "Spinal Erectors";
