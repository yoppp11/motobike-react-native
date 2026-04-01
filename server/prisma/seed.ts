import { prisma } from '../src/lib/prisma'

const ROLES_NAME = [
    'customer',
    'cs'
] as const

async function upsertRoles() {
    for(const name of ROLES_NAME) {
        await prisma.role.upsert({
            where: { name },
            update: {  },
            create: { name }
        })
    }
}

async function main(): Promise<void> {
    console.log('Starting database seed ...')

    console.log('Clearing existing data ...')

    await prisma.userRole.deleteMany()
    await prisma.role.deleteMany()

    console.log('Creating Role ...')

    upsertRoles()
}

main().catch((error) => {
    console.error('Error when seeding to the database: ', error)
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect
})