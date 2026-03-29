import path from "path";
import { config } from "dotenv";

config({ path: path.resolve(__dirname, "../../.env") });

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { fromNodeHeaders } from "better-auth/node";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,

  emailAndPassword: {
    enabled: true,
  },

  session: {
    expiresIn: 30 * 24 * 60 * 60,
    updateAge: 7 * 24 * 60 * 60,
    cookieCache: {
      enabled: false,
      maxAge: 5 * 60,
    },
  },
});

export function getSession(header: any) {
  return auth.api.getSession({
    headers: fromNodeHeaders(header),
  });
}

export interface Session {
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
    token: string;
    ipAddress?: string | null;
    userAgent?: string | null;
  };
  user: User;
}

export interface User {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
