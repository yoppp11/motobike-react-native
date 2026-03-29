import { CreateProduct, CreateProductSchema, Product } from "@/dto/product.dto"
import { logger } from "@/lib/logger"
import express, { Request, Response } from "express"

const productRouter = express.Router({ mergeParams: true })

productRouter.post('/', (req: Request, res: Response, next) => {
    try {
        const body: CreateProduct = req.body

        const productSchema = CreateProductSchema.parse(body)

        logger.info(req.body)

        return res.status(201).send({
            message: "success",
            result: productSchema
        })
    } catch (error) {   
        throw error
    }
})



export default productRouter