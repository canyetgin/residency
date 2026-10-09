import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { admin, anonymous, phoneNumber } from "better-auth/plugins";
import { Pool } from "pg";

const supabasePool = new Pool({
  host: process.env.SUPABASE_POOLING_HOST,
  port: parseInt(process.env.SUPABASE_POOLING_PORT || "6543", 10),
  user: process.env.SUPABASE_POOLING_USER,
  password: process.env.SUPABASE_POOLING_PASSWORD,
  database: "postgres",
  max: 10,
  ssl: { rejectUnauthorized: false }
});

export const auth = betterAuth({
  database: supabasePool,
  plugins: [admin(), anonymous(), phoneNumber(), nextCookies()], //based on the doc, nextCookies() always need to be the last idk :D
  emailAndPassword: {
    enabled: true,
  },
  user: { 
    additionalFields: { 
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: false //for security concerns.user can not edit role no mather he/she will try :D
      },
      userMetadata: { type: 'json', required: false, input: false }, 
      appMetadata: { type: 'json', required: false, input: false }, 
      invitedAt: { type: 'date', required: false, input: false }, 
      lastSignInAt: { type: 'date', required: false, input: false }, 
    }, 
  }, 
});
