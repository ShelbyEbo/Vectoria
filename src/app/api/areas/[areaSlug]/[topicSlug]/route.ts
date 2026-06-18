import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ topicSlug: string }> }
) {
  try {
    const { topicSlug } = await params
    const topics = await prisma.topic.findUnique({
      where: { slug: topicSlug },
      include: {
        simulations: { orderBy: { order: 'asc' } }
      }
    })

    if (!topics)
      return NextResponse.json({ error: 'Area not found' }, { status: 404 })

    return NextResponse.json(topics.simulations)

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}