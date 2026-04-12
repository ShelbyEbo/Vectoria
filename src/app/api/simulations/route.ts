import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const areaId = searchParams.get('areaId')

  const simulations = await prisma.simulation.findMany({
    where: {
      published: true,
      ...(areaId ? { areaId } : {}),
    },
    orderBy: { order: 'asc' },
  })
  return NextResponse.json(simulations)
}