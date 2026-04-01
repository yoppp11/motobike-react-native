import z from "zod";

export const AuthRequestSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8)
})

export type AuthRequest = z.infer<typeof AuthRequestSchema>