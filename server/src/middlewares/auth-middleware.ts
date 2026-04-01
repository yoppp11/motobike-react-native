import { getSession, Session, User } from "@/lib/auth";
import { UnauthorizedError } from "@/lib/errors";
import { NextFunction, Request, Response } from "express";


export interface AuthRequest extends Request {
    user?: User
    session?: Session
}

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
        const session = await getSession(req.headers)
        
        if(!session) throw new UnauthorizedError('Authentication required')

        req.session = session
        req.user = session.user

        next()
    } catch (error) {
        next(error)
    }
}

// export async function requireRole(...roles: string[]) {
//     return (req: AuthRequest, res: Response, next: NextFunction) => {
//         try {
//             if(!req.user) throw new UnauthorizedError('Authentication required')
            
//             if(!roles.includes(req.user.role))
//         } catch (error) {
//             next(error)
//         }
//     }
// }