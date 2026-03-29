import { CreateCategory, CreateCategorySchema } from "@/dto/category.dto"
import { requireAuth } from "@/middlewares/auth-middleware"
import { CategoryService } from "@/services/categories"
import { Request, Response, Router } from "express"

const categoryRouter = Router({ mergeParams: true })
const service = new CategoryService()

categoryRouter.post('/', async (req: Request, res: Response, next) => {
    try {
        const body: CreateCategory = req.body
        console.log(req)

        const createCategory = CreateCategorySchema.parse(body)

        const result = await service.createCategory(createCategory.name)

        return res.status(201).send({ message: "Success create a new category", result })
        
    } catch (error) {
        next(error)
    }
})


export default categoryRouter