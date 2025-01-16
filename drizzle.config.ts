import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/lib/database/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DB_URL!,
  },
  verbose: true,
});
