import { useEffect, useRef } from "react"

interface Props {
  params: {
    a: number
    phi: number
    t: number
    duracao: number
  }
  playing: boolean
  elapsedTime: number
}

export default function MHSVisualizer({
  params,
  elapsedTime,
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
    // Física
    //----------------------------------

    const A = params.a
    const T = params.t

    const omega = (2 * Math.PI) / T

    const x =
      A *
      Math.cos(
        omega * elapsedTime + params.phi
      )

    const v =
      -A *
      omega *
      Math.sin(
        omega * elapsedTime + params.phi
      )

    const accel =
      -omega *
      omega *
      x

    //----------------------------------
    // Escala visual
    //----------------------------------

    const scale = 80

    const centerX = width / 2
    const centerY = height / 2

    const blockX =
      centerX +
      x * scale

    //----------------------------------
    // Linha de equilíbrio
    //----------------------------------

    ctx.strokeStyle = "#999"

    ctx.beginPath()
    ctx.moveTo(80, centerY)
    ctx.lineTo(width - 80, centerY)
    ctx.stroke()

    //----------------------------------
    // Parede
    //----------------------------------

    ctx.fillStyle = "#555"

    ctx.fillRect(
      60,
      centerY - 100,
      20,
      200
    )

    //----------------------------------
    // Mola
    //----------------------------------

    const springStart = 80
    const springEnd = blockX - 25

    const coils = 18

    ctx.strokeStyle = "#222"
    ctx.lineWidth = 2

    ctx.beginPath()

    ctx.moveTo(
      springStart,
      centerY
    )

    for (let i = 0; i <= coils; i++) {

      const p =
        springStart +
        ((springEnd - springStart) / coils) * i

      const y =
        centerY +
        (i % 2 === 0 ? -15 : 15)

      ctx.lineTo(p, y)
    }

    ctx.lineTo(
      springEnd,
      centerY
    )

    ctx.stroke()

    //----------------------------------
    // Bloco
    //----------------------------------

    ctx.fillStyle = "#4f46e5"

    ctx.fillRect(
      blockX - 25,
      centerY - 25,
      50,
      50
    )

    //----------------------------------
    // Amplitude
    //----------------------------------

    ctx.strokeStyle = "#bbb"

    ctx.setLineDash([5, 5])

    ctx.beginPath()
    ctx.moveTo(centerX - A * scale, centerY - 60)
    ctx.lineTo(centerX - A * scale, centerY + 60)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(centerX + A * scale, centerY - 60)
    ctx.lineTo(centerX + A * scale, centerY + 60)
    ctx.stroke()

    ctx.setLineDash([])

    //----------------------------------
    // Posição atual
    //----------------------------------

    ctx.strokeStyle = "#22c55e"

    ctx.beginPath()
    ctx.moveTo(blockX, centerY - 80)
    ctx.lineTo(blockX, centerY + 80)
    ctx.stroke()

    //----------------------------------
    // Vetor velocidade
    //----------------------------------

    const velScale = 10

    drawArrow(
      ctx,
      blockX,
      centerY - 50,
      blockX + v * velScale,
      centerY - 50,
      "#2563eb"
    )

    //----------------------------------
    // Vetor aceleração
    //----------------------------------

    drawArrow(
      ctx,
      blockX,
      centerY + 50,
      blockX + accel * 4,
      centerY + 50,
      "#ef4444"
    )

    //----------------------------------
    // Informações
    //----------------------------------

    ctx.fillStyle = "#333"

    ctx.font = "16px Arial"

    ctx.fillText(
      `x = ${x.toFixed(2)} m`,
      20,
      30
    )

    ctx.fillText(
      `v = ${v.toFixed(2)} m/s`,
      20,
      55
    )

    ctx.fillText(
      `a = ${accel.toFixed(2)} m/s²`,
      20,
      80
    )

    ctx.fillText(
      `ω = ${omega.toFixed(2)} rad/s`,
      20,
      105
    )

  }, [params, elapsedTime])

  return (
    <canvas
      ref={canvasRef}
      width={900}
      height={500}
      className="w-full h-full"
    />
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

  const head = 10

  ctx.strokeStyle = color
  ctx.fillStyle = color

  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()

  const angle =
    Math.atan2(y2 - y1, x2 - x1)

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