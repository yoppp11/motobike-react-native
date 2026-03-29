import z from "zod";

export const ProductsSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string(),
    price: z.int().positive(),
    categoryId: z.string().uuid(),
    ratingCount: z.int(),
    ratingAvg: z.int(),
    imageId: z.string().uuid(),
    createdAt: z.date()
})

export const CreateProductSchema = ProductsSchema.omit({
    id: true,
    ratingCount: true,
    ratingAvg: true,
    createdAt: true
})

export type Product = z.infer<typeof ProductsSchema>
export type CreateProduct = z.infer<typeof CreateProductSchema>