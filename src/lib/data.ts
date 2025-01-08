import { ExerciseCategory, MuscleGroup } from "@/types";

export const exerciseCategories: ExerciseCategory[] = [
  "Strength Training",
  "Cardiovascular",
  "Flexibility & Mobility",
  "Balance & Stability",
  "Functional Training",
  "Recovery & Regeneration",
];

export const muscleGroups: MuscleGroup[] = [
  // Upper Body - Front
  "Chest",
  "Anterior Deltoids",
  "Biceps",
  "Forearms",

  // Upper Body - Back
  "Upper Back (Trapezius)",
  "Middle Back (Rhomboids)",
  "Lower Back (Erector Spinae)",
  "Lats (Latissimus Dorsi)",
  "Posterior Deltoids",
  "Triceps",

  // Core
  "Rectus Abdominis",
  "Obliques",
  "Transverse Abdominis",
  "Serratus Anterior",

  // Lower Body - Front
  "Quadriceps",
  "Hip Flexors",
  "Tibialis Anterior",

  // Lower Body - Back
  "Hamstrings",
  "Glutes",
  "Calves (Gastrocnemius)",
  "Soleus",

  // Stabilizers/Other
  "Rotator Cuff",
  "Hip Abductors",
  "Hip Adductors",
  "Pelvic Floor",
  "Spinal Erectors",
];
