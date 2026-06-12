import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(_req: Request, { params }: { params: { areaSlug: string; topicSlug: string } })
{
    try
    {
        const simulations = await prisma.simulation.findMany({ where: { topic: { slug: params.topicSlug, area: { slug: params.areaSlug}}}})
        if (simulations.length === 0)
        {
            return NextResponse.json({ error: "Simulations not found"}, { status: 404 })
        }
        return NextResponse.json(simulations);
    }
    catch (error)
    {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}