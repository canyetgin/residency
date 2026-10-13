import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { admin, anonymous, phoneNumber, twoFactor } from "better-auth/plugins";
import { Pool } from "pg";

const supabasePool = new Pool({
  host: process.env.SUPABASE_POOLING_HOST,
  port: parseInt(process.env.SUPABASE_POOLING_PORT || "6543", 10),
  user: process.env.SUPABASE_POOLING_USER,
  password: process.env.SUPABASE_POOLING_PASSWORD,
  database: "postgres",
  max: 10,
  ssl: { rejectUnauthorized: false },
});

export const auth = betterAuth({
  database: supabasePool,
  plugins: [admin(), anonymous(), phoneNumber(), twoFactor(), nextCookies()], //based on the doc, nextCookies() always need to be the last idk :D
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    requireEmailVerification: true,
    resetPasswordTokenExpiresIn: 60 * 60,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: { enabled: true, maxAge: 5 * 60 }, // 5 min like our default (Nextjs Config)
  },
  rateLimit: {
    enabled: true,
    window: 60,
    max: 100,
    storage: "database",
  },
  advanced: {
    useSecureCookies: true,
  },
  emailVerification: {
    sendOnSignUp: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "admin", //default is admin, so people can invite their tenants.
        input: false, //for security concerns.user can not edit role no mather he/she will try :D
      },
      userMetadata: { type: "json", required: false, input: false },
      appMetadata: { type: "json", required: false, input: false },
      invitedAt: { type: "date", required: false, input: false },
      lastSignInAt: { type: "date", required: false, input: false },
    },
  },
});
