import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(_req: Request, { params }: { params: {slug: string} })
{
    try
    {
        const topics = await prisma.topic.findMany({ where: { area: { slug: params.slug }}})
        if (topics.length === 0)
        {
            return NextResponse.json({ error: "Topics not found"}, { status: 404 })
        }
        return NextResponse.json(topics);
    }
    catch (error)
    {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}