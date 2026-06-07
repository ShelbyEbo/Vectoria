import { useEffect, useRef } from "react"

interface Props {
  params: {
    q1: number
    q2: number
    r: number
  }
  playing: boolean
  elapsedTime: number
}

const K = 8.99e9

export default function CampoEletricoVisualizer({
  params,
  elapsedTime
}: Props) {

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    ctx.clearRect(0, 0, width, height)

    //----------------------------------
    // posições das cargas
    //----------------------------------

    const centerY = height / 2

    const q1x = width / 2 - 150
    const q2x = width / 2 + 150

    const q1y = centerY
    const q2y = centerY

    //----------------------------------
    // grade
    //----------------------------------

    ctx.strokeStyle = "#ececec"
    ctx.lineWidth = 1

    for (let x = 0; x < width; x += 50) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    for (let y = 0; y < height; y += 50) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    //----------------------------------
    // linhas de campo simplificadas
    //----------------------------------

    const lines = 16

    ctx.strokeStyle = "#60a5fa"
    ctx.lineWidth = 1.5

    for (let i = 0; i < lines; i++) {

      const angle =
        (Math.PI * 2 * i) / lines

      const sx =
        q1x + Math.cos(angle) * 30

      const sy =
        q1y + Math.sin(angle) * 30

      const ex =
        q2x + Math.cos(angle) * 30

      const ey =
        q2y + Math.sin(angle) * 30

      ctx.beginPath()

      ctx.moveTo(sx, sy)

      ctx.bezierCurveTo(
        sx + 80,
        sy,
        ex - 80,
        ey,
        ex,
        ey
      )

      ctx.stroke()
    }

    //----------------------------------
    // carga de teste
    //----------------------------------

    const orbitRadius = 120

    const testX =
      width / 2 +
      Math.cos(elapsedTime) *
      orbitRadius

    const testY =
      centerY +
      Math.sin(elapsedTime) *
      orbitRadius

    //----------------------------------
    // campo em qteste
    //----------------------------------

    const dx1 = testX - q1x
    const dy1 = testY - q1y

    const d1 =
      Math.max(
        Math.sqrt(dx1 * dx1 + dy1 * dy1),
        20
      )

    const E1 =
      (K * params.q1) /
      (d1 * d1)

    const dx2 = testX - q2x
    const dy2 = testY - q2y

    const d2 =
      Math.max(
        Math.sqrt(dx2 * dx2 + dy2 * dy2),
        20
      )

    const E2 =
      (K * params.q2) /
      (d2 * d2)

    const Ex =
      E1 * (dx1 / d1)
      +
      E2 * (dx2 / d2)

    const Ey =
      E1 * (dy1 / d1)
      +
      E2 * (dy2 / d2)

    //----------------------------------
    // vetor campo
    //----------------------------------

    const scale = 0.000000002

    drawArrow(
      ctx,
      testX,
      testY,
      testX + Ex * scale,
      testY + Ey * scale,
      "#ef4444"
    )

    //----------------------------------
    // carga de teste
    //----------------------------------

    ctx.fillStyle = "#f59e0b"

    ctx.beginPath()
    ctx.arc(
      testX,
      testY,
      10,
      0,
      Math.PI * 2
    )
    ctx.fill()

    //----------------------------------
    // carga q1
    //----------------------------------

    drawCharge(
      ctx,
      q1x,
      q1y,
      params.q1
    )

    //----------------------------------
    // carga q2
    //----------------------------------

    drawCharge(
      ctx,
      q2x,
      q2y,
      params.q2
    )

    //----------------------------------
    // info
    //----------------------------------

    ctx.fillStyle = "#222"

    ctx.font = "16px Arial"

    ctx.fillText(
      `q1 = ${params.q1.toExponential(2)} C`,
      20,
      30
    )

    ctx.fillText(
      `q2 = ${params.q2.toExponential(2)} C`,
      20,
      55
    )

    ctx.fillText(
      `|E| = ${Math.sqrt(Ex*Ex + Ey*Ey).toExponential(2)} N/C`,
      20,
      80
    )

  }, [params, elapsedTime])

  return (
    <canvas
      ref={canvasRef}
      width={1200}
      height={600}
      className="w-full h-full"
    />
  )
}

function drawCharge(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  q: number
) {

  ctx.fillStyle =
    q > 0
      ? "#22c55e"
      : "#dc2626"

  ctx.beginPath()

  ctx.arc(
    x,
    y,
    25,
    0,
    Math.PI * 2
  )

  ctx.fill()

  ctx.fillStyle = "white"

  ctx.font = "bold 20px Arial"
  ctx.textAlign = "center"

  ctx.fillText(
    q > 0 ? "+" : "−",
    x,
    y + 7
  )
}

function drawArrow(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string
) {

  ctx.strokeStyle = color
  ctx.fillStyle = color

  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()

  const angle =
    Math.atan2(
      y2 - y1,
      x2 - x1
    )

  const head = 12

  ctx.beginPath()

  ctx.moveTo(x2, y2)

  ctx.lineTo(
    x2 - head * Math.cos(angle - Math.PI / 6),
    y2 - head * Math.sin(angle - Math.PI / 6)
  )

  ctx.lineTo(
    x2 - head * Math.cos(angle + Math.PI / 6),
    y2 - head * Math.sin(angle + Math.PI / 6)
  )

  ctx.closePath()
  ctx.fill()
}