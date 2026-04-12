import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { simulationId, lastParams } = await req.json()

  const progress = await prisma.userProgress.upsert({
    where: {
      userId_simulationId: {
        userId: session.user.id,
        simulationId,
      },
    },
    update: {
      lastParams,
      timesOpened: { increment: 1 },
    },
    create: {
      userId: session.user.id,
      simulationId,
      lastParams,
    },
  })
  return NextResponse.json(progress)
}