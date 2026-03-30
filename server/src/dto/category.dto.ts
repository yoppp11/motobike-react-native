import z from "zod";

export const CategorySchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(4)
})

export const RequestCategorySchema = CategorySchema.omit({
    id: true
})

export type Category = z.infer<typeof CategorySchema>
export type RequestCategory = z.infer<typeof RequestCategorySchema>