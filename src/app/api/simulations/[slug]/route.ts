import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET(_req : Request, {params} : {params: { slug: string[] }})
{
    const fullSlug = params.slug.join('/')
    const simulation = await prisma.simulation.findUnique({ 
        where:  { slug : fullSlug },
        include: { topic: { include: { area: true } } }
    })
    if (!simulation)
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(simulation);
}