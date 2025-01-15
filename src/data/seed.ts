import { Exercise } from '@/types';

export const exerciseData: Omit<Exercise, 'id'>[] = [
  {
    name: 'Barbell Bench Press',
    description:
      'Lie on a flat bench, grip the barbell with hands slightly wider than shoulder width, lower the bar to your chest, then push it back up to starting position.',
    url: 'https://www.youtube.com/watch?v=rT7DgCr-3pg',
    category: 'Strength',
    primaryMuscle: 'Chest',
    equipment: 'Barbell',
  },
  {
    name: 'Pull-ups',
    description:
      'Hang from a pull-up bar with hands shoulder-width apart, pull yourself up until your chin is over the bar, then lower back down with control.',
    url: 'https://www.youtube.com/watch?v=eGo4IYlbE5g',
    category: 'Bodyweight',
    primaryMuscle: 'Back',
    equipment: 'Pull-up Bar',
  },
  {
    name: 'Squats',
    description:
      'Stand with feet shoulder-width apart, lower your body as if sitting back into a chair, keeping chest up and knees tracking over toes.',
    url: 'https://www.youtube.com/watch?v=u1JSSvzwh3I',
    category: 'Strength',
    primaryMuscle: 'Quadriceps',
    equipment: 'None',
  },
  {
    name: 'Deadlift',
    description:
      'Stand with feet hip-width apart, bend at hips and knees to grip barbell, keep back straight and lift by extending hips and knees.',
    url: 'https://www.youtube.com/watch?v=op9kVnSso6Q',
    category: 'Strength',
    primaryMuscle: 'Back',
    equipment: 'Barbell',
  },
  {
    name: 'Dumbbell Shoulder Press',
    description:
      'Sit or stand with dumbbells at shoulder height, press weights overhead until arms are fully extended, then lower back down.',
    url: 'https://www.youtube.com/watch?v=qEwKCR5JCog',
    category: 'Strength',
    primaryMuscle: 'Shoulders',
    equipment: 'Dumbbells',
  },
  {
    name: 'Push-ups',
    description:
      'Start in plank position, lower body until chest nearly touches ground, then push back up to starting position.',
    url: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
    category: 'Bodyweight',
    primaryMuscle: 'Chest',
    equipment: 'None',
  },
  {
    name: 'Lunges',
    description:
      'Step forward with one leg, lowering your hips until both knees are bent at 90 degrees, then return to starting position.',
    url: 'https://www.youtube.com/watch?v=QOVaHwm-Q6U',
    category: 'Bodyweight',
    primaryMuscle: 'Quadriceps',
    equipment: 'None',
  },
  {
    name: 'Barbell Rows',
    description:
      'Bend at hips with slight knee bend, grip barbell with hands shoulder-width apart, pull bar to lower chest while keeping back straight.',
    url: 'https://www.youtube.com/watch?v=FWJR5Ve8bnQ',
    category: 'Strength',
    primaryMuscle: 'Back',
    equipment: 'Barbell',
  },
  {
    name: 'Tricep Dips',
    description:
      'Support yourself on parallel bars, lower body by bending arms, then push back up to starting position.',
    url: 'https://www.youtube.com/watch?v=wjUmnZH528Y',
    category: 'Bodyweight',
    primaryMuscle: 'Triceps',
    equipment: 'Parallel Bars',
  },
  {
    name: 'Dumbbell Bicep Curls',
    description:
      'Stand with dumbbells at sides, curl weights up toward shoulders while keeping upper arms still, then lower back down.',
    url: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo',
    category: 'Strength',
    primaryMuscle: 'Biceps',
    equipment: 'Dumbbells',
  },
  {
    name: 'Plank',
    description:
      'Hold a push-up position with arms straight or on forearms, maintaining straight body alignment from head to heels.',
    url: 'https://www.youtube.com/watch?v=ASdvN_XEl_c',
    category: 'Core',
    primaryMuscle: 'Abs',
    equipment: 'None',
  },
  {
    name: 'Russian Twists',
    description:
      'Sit with knees bent and feet off ground, lean back slightly, twist torso from side to side while holding weight or hands together.',
    url: 'https://www.youtube.com/watch?v=wkD8rjkodUI',
    category: 'Core',
    primaryMuscle: 'Abs',
    equipment: 'None',
  },
  {
    name: 'Leg Press',
    description:
      'Sit in leg press machine, push weight away by extending knees and hips, then return to starting position with control.',
    url: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ',
    category: 'Machine',
    primaryMuscle: 'Quadriceps',
    equipment: 'Leg Press Machine',
  },
  {
    name: 'Cable Flyes',
    description:
      'Stand between cable machines, grab handles with arms extended, bring hands together in front of chest in an arcing motion.',
    url: 'https://www.youtube.com/watch?v=WEM9FCIPlxQ',
    category: 'Cable',
    primaryMuscle: 'Chest',
    equipment: 'Cable Machine',
  },
  {
    name: 'Lat Pulldown',
    description:
      'Sit at lat pulldown machine, grab bar with wide grip, pull bar down to upper chest while keeping back straight.',
    url: 'https://www.youtube.com/watch?v=CAwf7n6Luuc',
    category: 'Machine',
    primaryMuscle: 'Back',
    equipment: 'Lat Pulldown Machine',
  },
  {
    name: 'Calf Raises',
    description:
      'Stand with balls of feet on edge of step, lower heels below step level, then raise up onto toes as high as possible.',
    url: 'https://www.youtube.com/watch?v=-M4-G8p8fmc',
    category: 'Bodyweight',
    primaryMuscle: 'Calves',
    equipment: 'None',
  },
  {
    name: 'Face Pulls',
    description:
      'Using rope attachment on cable machine, pull rope towards face while keeping upper arms parallel to ground.',
    url: 'https://www.youtube.com/watch?v=eIq5CB9JfKE',
    category: 'Cable',
    primaryMuscle: 'Shoulders',
    equipment: 'Cable Machine',
  },
  {
    name: 'Kettlebell Swings',
    description:
      'Stand with feet shoulder-width apart, hinge at hips to swing kettlebell between legs, then thrust hips forward to swing weight up.',
    url: 'https://www.youtube.com/watch?v=Buz6gaVzVZs',
    category: 'Cardio',
    primaryMuscle: 'Hamstrings',
    equipment: 'Kettlebell',
  },
  {
    name: 'Mountain Climbers',
    description:
      'Start in plank position, alternately drive knees toward chest in running motion while maintaining plank position.',
    url: 'https://www.youtube.com/watch?v=nmwgirgXLYM',
    category: 'Cardio',
    primaryMuscle: 'Core',
    equipment: 'None',
  },
  {
    name: 'Glute Bridge',
    description:
      'Lie on back with knees bent, lift hips off ground by squeezing glutes until body forms straight line from shoulders to knees.',
    url: 'https://www.youtube.com/watch?v=OUgsJ8-Vi0E',
    category: 'Bodyweight',
    primaryMuscle: 'Glutes',
    equipment: 'None',
  },
  {
    name: 'Leg Press',
    description:
      "Sit in leg press machine with feet shoulder-width apart on the platform. Unlock the safety bars and lower the weight by bending your knees until they're at about 90 degrees, then push back up.",
    url: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ',
    category: 'Machine',
    primaryMuscle: 'Quadriceps',
    equipment: 'Leg Press Machine',
  },
  {
    name: 'Hamstring Curls',
    description:
      'Lie face down on the hamstring curl machine, position ankles under the pad. Curl your legs up by contracting your hamstrings, then slowly lower back down.',
    url: 'https://www.youtube.com/watch?v=F488k67BTNo',
    category: 'Machine',
    primaryMuscle: 'Hamstrings',
    equipment: 'Hamstring Curl Machine',
  },
  {
    name: 'Standing Calf Raises',
    description:
      'Stand on a calf raise machine or elevated platform, balls of feet on edge. Push through the balls of your feet to raise your heels as high as possible, then lower with control.',
    url: 'https://www.youtube.com/watch?v=-M4-G8p8fmc',
    category: 'Machine',
    primaryMuscle: 'Calves',
    equipment: 'Calf Raise Machine',
  },
  {
    name: 'Seated Leg Extensions',
    description:
      'Sit on leg extension machine, place shins behind pad. Extend legs fully by contracting quadriceps, then slowly lower back to starting position.',
    url: 'https://www.youtube.com/watch?v=YyvSfVjQeL0',
    category: 'Machine',
    primaryMuscle: 'Quadriceps',
    equipment: 'Leg Extension Machine',
  },
  {
    name: 'Hip Abductor Machine',
    description:
      'Sit in machine with pads against outer thighs. Push legs outward against resistance, then slowly return to starting position.',
    url: 'https://www.youtube.com/watch?v=TAq7PBR-Xic',
    category: 'Machine',
    primaryMuscle: 'Hip Abductors',
    equipment: 'Hip Abductor Machine',
  },
];
