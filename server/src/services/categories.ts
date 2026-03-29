import { ConflictError } from "@/lib/errors";
import { prisma } from "@/lib/prisma";

export class CategoryService {
    async createCategory(name: string) {
        try {
            const category = await prisma.category.findFirst({
                where: {
                    name
                }
            })
    
            if (category) throw new ConflictError('Category already exists')
    
            const result = await prisma.category.create({
                data: {
                    name
                }
            })
    
            return result
            
        } catch (error) {
            throw error
        }
    }
}