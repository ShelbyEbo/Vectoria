import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const simulation = await prisma.simulation.findUnique({
    where: { id: params.id },
    include: { area: true },
  })
  if (!simulation)
    return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json(simulation)
}