import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient();

export async function GET(_req: Request)
{
    try 
    {
        const areas = await prisma.area.findMany()
        if (areas.lenght === 0)
            return NextResponse.json({ error: 'No areas found'}, { status: 404 })
        return NextResponse.json(areas);
    }
    catch (error)
    {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}