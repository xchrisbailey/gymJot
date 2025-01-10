import { day, dayExercise, exercise, workoutPlan } from "./lib/database/schema";

export type ActionState = {
  error?: string;
  success?: string;
  issues?: {
    [key: string]: string[];
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // This allows for additional properties
};

export type WorkoutPlan = typeof workoutPlan.$inferSelect;
export type NewWorkoutPlan = typeof workoutPlan.$inferInsert;

export type Day = typeof day.$inferSelect;
export type NewDay = typeof day.$inferInsert;

interface DayWithRelations extends Day {
  dayExercises: DayExerciseWithRelations[];
}

export type DayExercise = typeof dayExercise.$inferSelect;
export type NewDayExercise = typeof dayExercise.$inferInsert;

export interface DayExerciseWithRelations extends DayExercise {
  exercise: Exercise;
}

export type Exercise = typeof exercise.$inferSelect;
export type NewExercise = typeof exercise.$inferInsert;

export interface WorkoutPlanWithRelations extends WorkoutPlan {
  days: DayWithRelations[];
}

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

export type GymEquipment =
  // Free Weights
  | "Dumbbells"
  | "Barbells"
  | "Weight Plates"
  | "Kettlebells"
  | "Medicine Balls"
  | "EZ Curl Bar"
  | "Swiss Bar"
  | "Trap Bar"
  | "Olympic Bars"
  | "Weight Plate Storage Rack"
  | "Dumbbell Rack"

  // Machines
  | "Leg Press"
  | "Smith Machine"
  | "Chest Press Machine"
  | "Shoulder Press Machine"
  | "Lat Pulldown Machine"
  | "Seated Row Machine"
  | "Leg Extension Machine"
  | "Leg Curl Machine"
  | "Pec Deck"
  | "Cable Machine"
  | "Hack Squat Machine"
  | "Abdominal Machine"
  | "Calf Raise Machine"
  | "Hip Abductor/Adductor Machine"
  | "Assisted Pull-up Machine"

  // Cardio Equipment
  | "Treadmill"
  | "Stationary Bike"
  | "Elliptical Machine"
  | "Rowing Machine"
  | "Stair Climber"
  | "Air Bike"
  | "Ski Erg"
  | "Jacob's Ladder"
  | "Spin Bike"
  | "Recumbent Bike"
  | "Arc Trainer"

  // Racks and Cages
  | "Power Rack"
  | "Squat Rack"
  | "Half Rack"
  | "Pull-up Bar"
  | "Dip Station"
  | "Preacher Curl Bench"
  | "Safety Pins/Straps"

  // Benches
  | "Flat Bench"
  | "Adjustable Bench"
  | "Decline Bench"
  | "Olympic Weight Bench"
  | "Ab Bench"
  | "Hyperextension Bench"

  // Functional Training
  | "Resistance Bands"
  | "Suspension Trainers (TRX)"
  | "Foam Rollers"
  | "Balance Balls"
  | "BOSU Ball"
  | "Sliding Discs"
  | "Battle Ropes"
  | "Plyo Boxes"
  | "Agility Ladder"
  | "Stability Ball"
  | "Yoga Mat"
  | "Ab Wheel"
  | "Jump Ropes"
  | "Sand Bags"
  | "Bulgarian Bags"

  // Recovery and Mobility
  | "Massage Sticks"
  | "Compression Bands"
  | "Muscle Scraper Tools"
  | "Massage Balls"
  | "Stretching Straps"
  | "Vibration Massage Devices"

  // Accessories
  | "Weight Lifting Belts"
  | "Wrist Wraps"
  | "Knee Wraps"
  | "Lifting Straps"
  | "Grip Strengtheners"
  | "Olympic Collars"
  | "Weight Clips"
  | "Gym Chalk"
  | "Gym Timer"
  | "Exercise Mat";

export type State = {
  name: string;
  value: string;
};

export type StateCode =
  | "AL"
  | "AK"
  | "AZ"
  | "AR"
  | "CA"
  | "CO"
  | "CT"
  | "DE"
  | "FL"
  | "GA"
  | "HI"
  | "ID"
  | "IL"
  | "IN"
  | "IA"
  | "KS"
  | "KY"
  | "LA"
  | "ME"
  | "MD"
  | "MA"
  | "MI"
  | "MN"
  | "MS"
  | "MO"
  | "MT"
  | "NE"
  | "NV"
  | "NH"
  | "NJ"
  | "NM"
  | "NY"
  | "NC"
  | "ND"
  | "OH"
  | "OK"
  | "OR"
  | "PA"
  | "RI"
  | "SC"
  | "SD"
  | "TN"
  | "TX"
  | "UT"
  | "VT"
  | "VA"
  | "WA"
  | "WV"
  | "WI"
  | "WY";
