import { logger } from "@/lib/logger"
import express, { Request, Response } from "express"

const productRouter = express.Router({ mergeParams: true })

productRouter.post('/', (req: Request, res: Response, next) => {
    try {
        const body = req.body

        logger.info(req.body)

        res.status(201).send({
            message: "success",
            result: body
        })
    } catch (error) {   
        throw error
    }
})



export default productRouter