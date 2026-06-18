// src/app/api/simulations/[...slug]/route.ts

import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const { slug } = await params
    const fullSlug = slug.join('/')  // ["cinematica", "mru-mruv"] → "cinematica/mru-mruv"

    const simulation = await prisma.simulation.findUnique({
      where: { slug: fullSlug },
      include: {
        topic: {
          include: { area: true }
        }
      }
    })

    if (!simulation)
      return NextResponse.json({ error: 'Simulation not found' }, { status: 404 })

    return NextResponse.json(simulation)

  } catch (error) {
    console.error('ERRO:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}