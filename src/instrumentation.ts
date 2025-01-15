import { exerciseData } from './data/seed';
import { db } from './lib/database';
import { exercise } from './lib/database/schema';

export async function register() {
  exerciseData.map(async (e) => await db.insert(exercise).values(e));
}
