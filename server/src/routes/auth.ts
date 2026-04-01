import { AuthRequest, AuthRequestSchema } from '@/dto/auth.dto'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { AuthService } from '@/services/auth'
import { NextFunction, Request, Response, Router } from 'express'

const authRouter = Router()
const service = new AuthService()

authRouter.post('/auth/sign-up/customer', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bodyParse = AuthRequestSchema.parse(req.body)

        const result = await service.createAccountCustomer(bodyParse.name, bodyParse.email, bodyParse.password)

        return res.status(200).send(result)
    } catch (error) {
        next(error)
    }
})


export default authRouter