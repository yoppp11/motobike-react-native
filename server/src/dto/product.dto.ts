import z from "zod";

export const ProductsSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string(),
    price: z.int().positive(),
    categoryId: z.string().uuid(),
    ratingId: z.string().uuid(),
    imageId: z.string().uuid(),
})

export type Products = z.infer<typeof ProductsSchema>