import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
    console.log("SLUG:", params.slug)
  try {
    const area = await prisma.area.findUnique({
      where: { slug: params.slug }
    })

    if (!area) {
      return NextResponse.json(
        { error: "Area not found" },
        { status: 404 }
      )
    }

    const topics = await prisma.topic.findMany({
      where: {
        areaId: area.id
      }
    })

    if (topics.length === 0) {
      return NextResponse.json(
        { error: "Topics not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(topics)
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}