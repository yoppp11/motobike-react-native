import path from "path"
import { config } from "dotenv"

config({ path: path.resolve(__dirname, "../../.env") })

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql"
    }),

    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,


    emailAndPassword: {
        enabled: true
    },

    session: {
        expiresIn: 30 * 24 * 60 * 60,
        updateAge: 7 * 24 * 60 * 60,
        cookieCache: {
            enabled: false,
            maxAge: 5 * 60
        }
    }
})