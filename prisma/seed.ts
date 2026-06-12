import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main()
{
    const mecanica = await prisma.area.upsert({
        where: { slug: 'mecanica' },
        update: {},
        create: {
            slug: 'mecanica',
            name: 'mecanica',
            description: 'mecanica.desc',
            order: 1
        }
    })

    const cinematica = await prisma.topic.upsert({
        where: { slug: 'cinematica' },
        update: {},
        create: {
            slug: 'cinematica',
            name: 'cinematica',
            order: 1,
            areaId: mecanica.id
        }
    })
    
    await prisma.simulation.upsert({
        where: { slug: 'cinematica/mru-mruv' },
        update: {},
        create: {
            slug: 'cinematica/mru-mruv',
            name: 'mru-mruv',
            description: 'mru-mruv.desc',
            topicId: cinematica.id,
            order: 1,
            published: true,
            parameters: {
                tipo:    { type: 'select', options: ['MRU', 'MRUV'], default: 'MRUV' },
                s0:      { type: 'number', min: 0,   max: 100, default: 0,   unit: 'm'    },
                v0:      { type: 'number', min: -50, max: 50,  default: 20,  unit: 'm/s'  },
                a:       { type: 'number', min: -20, max: 20,  default: -4,  unit: 'm/s²' },
                duracao: { type: 'number', min: 1,   max: 30,  default: 5,   unit: 's'    },
            }
        }
    })
}

main().catch(console.error).finally(() => prisma.$disconnect())