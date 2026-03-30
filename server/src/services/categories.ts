import { RequestCategory } from "@/dto/category.dto";
import { ConflictError, NotFoundError } from "@/lib/errors";
import { prisma } from "@/lib/prisma";

export class CategoryService {
    async getById(id: string) {
        try {
            const category = await prisma.category.findUnique({
                where: { id }
            })
            
            if(!category) throw new NotFoundError('Category not found')

            return category
        } catch (error) {
            throw error
        }
    } 

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

    async updateCategory(id: string, name: string) {
        try {
            const category = await prisma.category.findUnique({
                where: { id }
            })
            
            if(!category) throw new NotFoundError('Category not found')

            const result = await prisma.category.update({
                where: { id },
                data: { name }
            })

            return result
        } catch (error) {
            throw error
        }
    }

    async deleteCategory(id: string) {
        try {
            const category = await prisma.category.findUnique({
                where: { id }
            })
            
            if(!category) throw new NotFoundError('Category not found')

            const result = await prisma.category.delete({
                where: { id }
            })

            return result
        } catch (error) {
            throw error
        }
    }
}