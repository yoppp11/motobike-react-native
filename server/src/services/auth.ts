import { auth } from "@/lib/auth"
import { NotFoundError } from "@/lib/errors"
import { prisma } from "@/lib/prisma"

export class AuthService {
    async createAccountCustomer(name: string, email: string, password: string) {
        try {
            const result = await auth.api.signUpEmail({
                body: { name, email, password },
                
            })

            console.log(result)

            await this.assignRole('customer', result.user.id)

            return result
        } catch (error) {
            throw error
        }
    }

    private async assignRole(name: string, userId: string): Promise<void> {
        try {
            const role = await prisma.role.findFirst({
                where: { name }
            })
    
            if(!role) throw new NotFoundError('Role not found, please make sure the role has been added')
            
            await prisma.userRole.create({
                data: {
                    userId,
                    roleId: role.id
                }
            })

        } catch (error) {
            throw error
        }
    }
}