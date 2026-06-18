import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ areaSlug: string }> }
) {
  try {
    const { areaSlug } = await params
    const area = await prisma.area.findUnique({
      where: { slug: areaSlug },
      include: {
        topics: { orderBy: { order: 'asc' } }
      }
    })

    if (!area)
      return NextResponse.json({ error: 'Area not found' }, { status: 404 })

    return NextResponse.json(area.topics)

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}