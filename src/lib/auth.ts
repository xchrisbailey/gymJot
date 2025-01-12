import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './database';
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: 'sqlite', // or "pg" or "mysql"
  }),
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
