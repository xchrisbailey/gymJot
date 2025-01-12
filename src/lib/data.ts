import { Day, ExerciseCategory, GymEquipment, MuscleGroup, StateCode } from '@/types';

export const exerciseCategories: ExerciseCategory[] = [
  'Strength Training',
  'Cardiovascular',
  'Flexibility & Mobility',
  'Balance & Stability',
  'Functional Training',
  'Recovery & Regeneration',
];

export const muscleGroups: MuscleGroup[] = [
  // Upper Body - Front
  'Chest',
  'Anterior Deltoids',
  'Biceps',
  'Forearms',

  // Upper Body - Back
  'Upper Back (Trapezius)',
  'Middle Back (Rhomboids)',
  'Lower Back (Erector Spinae)',
  'Lats (Latissimus Dorsi)',
  'Posterior Deltoids',
  'Triceps',

  // Core
  'Rectus Abdominis',
  'Obliques',
  'Transverse Abdominis',
  'Serratus Anterior',

  // Lower Body - Front
  'Quadriceps',
  'Hip Flexors',
  'Tibialis Anterior',

  // Lower Body - Back
  'Hamstrings',
  'Glutes',
  'Calves (Gastrocnemius)',
  'Soleus',

  // Stabilizers/Other
  'Rotator Cuff',
  'Hip Abductors',
  'Hip Adductors',
  'Pelvic Floor',
  'Spinal Erectors',
] as const;

export const gymEquipment: GymEquipment[] = [
  // Free Weights
  'Dumbbells',
  'Barbells',
  'Weight Plates',
  'Kettlebells',
  'Medicine Balls',
  'EZ Curl Bar',
  'Swiss Bar',
  'Trap Bar',
  'Olympic Bars',
  'Weight Plate Storage Rack',
  'Dumbbell Rack',

  // Machines
  'Leg Press',
  'Smith Machine',
  'Chest Press Machine',
  'Shoulder Press Machine',
  'Lat Pulldown Machine',
  'Seated Row Machine',
  'Leg Extension Machine',
  'Leg Curl Machine',
  'Pec Deck',
  'Cable Machine',
  'Hack Squat Machine',
  'Abdominal Machine',
  'Calf Raise Machine',
  'Hip Abductor/Adductor Machine',
  'Assisted Pull-up Machine',

  // Cardio Equipment
  'Treadmill',
  'Stationary Bike',
  'Elliptical Machine',
  'Rowing Machine',
  'Stair Climber',
  'Air Bike',
  'Ski Erg',
  "Jacob's Ladder",
  'Spin Bike',
  'Recumbent Bike',
  'Arc Trainer',

  // Racks and Cages
  'Power Rack',
  'Squat Rack',
  'Half Rack',
  'Pull-up Bar',
  'Dip Station',
  'Preacher Curl Bench',
  'Safety Pins/Straps',

  // Benches
  'Flat Bench',
  'Adjustable Bench',
  'Decline Bench',
  'Olympic Weight Bench',
  'Ab Bench',
  'Hyperextension Bench',

  // Functional Training
  'Resistance Bands',
  'Suspension Trainers (TRX)',
  'Foam Rollers',
  'Balance Balls',
  'BOSU Ball',
  'Sliding Discs',
  'Battle Ropes',
  'Plyo Boxes',
  'Agility Ladder',
  'Stability Ball',
  'Yoga Mat',
  'Ab Wheel',
  'Jump Ropes',
  'Sand Bags',
  'Bulgarian Bags',

  // Recovery and Mobility
  'Foam Rollers',
  'Massage Sticks',
  'Compression Bands',
  'Muscle Scraper Tools',
  'Massage Balls',
  'Stretching Straps',
  'Vibration Massage Devices',

  // Accessories
  'Weight Lifting Belts',
  'Wrist Wraps',
  'Knee Wraps',
  'Lifting Straps',
  'Grip Strengtheners',
  'Olympic Collars',
  'Weight Clips',
  'Gym Chalk',
  'Gym Timer',
  'Exercise Mat',
] as const;

export const usStates: readonly { name: string; value: StateCode }[] = [
  { name: 'Alabama', value: 'AL' },
  { name: 'Alaska', value: 'AK' },
  { name: 'Arizona', value: 'AZ' },
  { name: 'Arkansas', value: 'AR' },
  { name: 'California', value: 'CA' },
  { name: 'Colorado', value: 'CO' },
  { name: 'Connecticut', value: 'CT' },
  { name: 'Delaware', value: 'DE' },
  { name: 'Florida', value: 'FL' },
  { name: 'Georgia', value: 'GA' },
  { name: 'Hawaii', value: 'HI' },
  { name: 'Idaho', value: 'ID' },
  { name: 'Illinois', value: 'IL' },
  { name: 'Indiana', value: 'IN' },
  { name: 'Iowa', value: 'IA' },
  { name: 'Kansas', value: 'KS' },
  { name: 'Kentucky', value: 'KY' },
  { name: 'Louisiana', value: 'LA' },
  { name: 'Maine', value: 'ME' },
  { name: 'Maryland', value: 'MD' },
  { name: 'Massachusetts', value: 'MA' },
  { name: 'Michigan', value: 'MI' },
  { name: 'Minnesota', value: 'MN' },
  { name: 'Mississippi', value: 'MS' },
  { name: 'Missouri', value: 'MO' },
  { name: 'Montana', value: 'MT' },
  { name: 'Nebraska', value: 'NE' },
  { name: 'Nevada', value: 'NV' },
  { name: 'New Hampshire', value: 'NH' },
  { name: 'New Jersey', value: 'NJ' },
  { name: 'New Mexico', value: 'NM' },
  { name: 'New York', value: 'NY' },
  { name: 'North Carolina', value: 'NC' },
  { name: 'North Dakota', value: 'ND' },
  { name: 'Ohio', value: 'OH' },
  { name: 'Oklahoma', value: 'OK' },
  { name: 'Oregon', value: 'OR' },
  { name: 'Pennsylvania', value: 'PA' },
  { name: 'Rhode Island', value: 'RI' },
  { name: 'South Carolina', value: 'SC' },
  { name: 'South Dakota', value: 'SD' },
  { name: 'Tennessee', value: 'TN' },
  { name: 'Texas', value: 'TX' },
  { name: 'Utah', value: 'UT' },
  { name: 'Vermont', value: 'VT' },
  { name: 'Virginia', value: 'VA' },
  { name: 'Washington', value: 'WA' },
  { name: 'West Virginia', value: 'WV' },
  { name: 'Wisconsin', value: 'WI' },
  { name: 'Wyoming', value: 'WY' },
] as const;

export const daysOfWeek: Day['name'][] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
