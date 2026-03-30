import { RequestCategory, RequestCategorySchema } from "@/dto/category.dto"
import { ValidationError } from "@/lib/errors"
import { prisma } from "@/lib/prisma"
import { requireAuth } from "@/middlewares/auth-middleware"
import { CategoryService } from "@/services/categories"
import { NextFunction, Request, Response, Router } from "express"

const categoryRouter = Router({ mergeParams: true })
const service = new CategoryService()

categoryRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body: RequestCategory = req.body
        console.log(req)

        const createCategory = RequestCategorySchema.parse(body)

        const result = await service.createCategory(createCategory.name)

        return res.status(201).send({ message: "Success create a new category", result })
        
    } catch (error) {
        next(error)
    }
})

categoryRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const datas = await prisma.category.findMany()
        
        return res.status(200).send({
            message: 'Success get all data categories',
            result: datas
        })
    } catch (error) {
        next(error)
    }
})

categoryRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        if(!id) throw new ValidationError('Id is required')
        
        const result = await service.getById(id as string)

        return res.status(200).send({
            message: "Success get data categoory",
            result
        })
    } catch (error) {
        next(error)
    }
})

categoryRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        if(!id) throw new ValidationError('Id is required')
        
        const body: RequestCategory = req.body

        const requestBodyParse = RequestCategorySchema.parse(body)
        
        const result = await service.updateCategory(id as string, requestBodyParse.name)

        return res.status(200).send({
            message: "Succes to update category",
            result
        })
    } catch (error) {
        next(error)
    }
})

categoryRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        if(!id) throw new ValidationError('Id is required')

        const result = await service.deleteCategory(id as string)
        
        return res.status(200).send({
            message: "Success to delete category",
            result
        })
    } catch (error) {
        next(error)
    }
})


export default categoryRouter