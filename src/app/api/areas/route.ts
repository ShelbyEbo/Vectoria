import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const areas = await prisma.area.findMany({
    where: { published: true },
    orderBy: { order: 'asc' },
    include: { _count: { select: { simulations: true } } },
  })
  return NextResponse.json(areas)
}