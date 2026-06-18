import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const area  = searchParams.get('area')
    const topic = searchParams.get('topic')
    const q     = searchParams.get('q')

    const simulations = await prisma.simulation.findMany({
      where: {
        published: true,
        ...(q     && { name: { contains: q, mode: 'insensitive' } }),
        ...(topic && { topic: { slug: topic } }),
        ...(area  && { topic: { area: { slug: area } } }),
      },
      include: {
        topic: {
          include: { area: true }
        }
      },
      orderBy: { order: 'asc' }
    })

    return NextResponse.json(simulations)

  } catch (error) {
    console.error('ERRO:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}