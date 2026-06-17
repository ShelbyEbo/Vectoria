import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main()
{
    const eletromag = await prisma.area.upsert({
        where: { slug: 'eletromagnetismo' },
        update: {},
        create: {
            slug: 'eletromagnetismo',
            name: 'eletromag.name',
            description: 'eletromag.desc',
            order: 1
        }
    })
    const mecanica = await prisma.area.upsert({
        where: { slug: 'mecanica' },
        update: {},
        create: {
            slug: 'mecanica',
            name: 'mecanica.name',
            description: 'mecanica.desc',
            order: 1
        }
    })
    const ondas = await prisma.area.upsert({
        where: { slug: 'ondas' },
        update: {},
        create: {
            slug: 'ondas',
            name: 'ondas.name',
            description: 'ondas.desc',
            order: 1
        }
    })
    const optica = await prisma.area.upsert({
        where: { slug: 'optica' },
        update: {},
        create: {
            slug: 'optica',
            name: 'optica.name',
            description: 'optica.desc',
            order: 1
        }
    })
    const termodinamica = await prisma.area.upsert({
        where: { slug: 'termodinamica' },
        update: {},
        create: {
            slug: 'termodinamica',
            name: 'termodinamica.name',
            description: 'termodinamica.desc',
            order: 1
        }
    })
}

main().catch(console.error).finally(() => prisma.$disconnect())