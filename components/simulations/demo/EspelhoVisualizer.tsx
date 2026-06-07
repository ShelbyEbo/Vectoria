import { useEffect, useRef } from "react"

interface Props {
  params: {
    tipo: "concavo" | "convexo"
    f: number
    ho: number
    do: number
  }
  playing: boolean
  elapsedTime: number
}

export default function EspelhoVisualizer({
  params
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

    //---------------------------------
    // Configurações
    //---------------------------------

    const eixoY = height / 2
    const mirrorX = width * 0.72

    const escala = 50

    //---------------------------------
    // Equação dos espelhos
    //---------------------------------

    const f =
      params.tipo === "convexo"
        ? -params.f
        : params.f

    const doObj = params.do

    const di =
      1 /
      (
        (1 / f)
        -
        (1 / doObj)
      )

    const hi =
      -(
        di / doObj
      ) *
      params.ho

    //---------------------------------
    // Eixo principal
    //---------------------------------

    ctx.strokeStyle = "#888"

    ctx.beginPath()
    ctx.moveTo(0, eixoY)
    ctx.lineTo(width, eixoY)
    ctx.stroke()

    //---------------------------------
    // Espelho
    //---------------------------------

    ctx.strokeStyle = "#2563eb"
    ctx.lineWidth = 5

    ctx.beginPath()

    if (params.tipo === "concavo") {

      ctx.arc(
        mirrorX + 80,
        eixoY,
        160,
        Math.PI * 0.75,
        Math.PI * 1.25
      )

    } else {

      ctx.arc(
        mirrorX - 80,
        eixoY,
        160,
        -Math.PI * 0.25,
        Math.PI * 0.25
      )

    }

    ctx.stroke()

    //---------------------------------
    // Foco e centro
    //---------------------------------

    const focoX =
      mirrorX -
      f * escala

    const centroX =
      mirrorX -
      2 * f * escala

    drawPoint(
      ctx,
      focoX,
      eixoY,
      "F"
    )

    drawPoint(
      ctx,
      centroX,
      eixoY,
      "C"
    )

    //---------------------------------
    // Objeto
    //---------------------------------

    const objX =
      mirrorX -
      doObj * escala

    const objTop =
      eixoY -
      params.ho * escala

    drawArrow(
      ctx,
      objX,
      eixoY,
      objX,
      objTop,
      "#16a34a"
    )

    //---------------------------------
    // Imagem
    //---------------------------------

    const imgX =
      mirrorX -
      di * escala

    const imgTop =
      eixoY -
      hi * escala

    const real =
      di > 0

    drawArrow(
      ctx,
      imgX,
      eixoY,
      imgX,
      imgTop,
      real
        ? "#dc2626"
        : "#a855f7"
    )

    //---------------------------------
    // Raios principais
    //---------------------------------

    ctx.lineWidth = 2

    //---------------------------------
    // raio paralelo
    //---------------------------------

    ctx.strokeStyle = "#f59e0b"

    ctx.beginPath()

    ctx.moveTo(
      objX,
      objTop
    )

    ctx.lineTo(
      mirrorX,
      objTop
    )

    ctx.lineTo(
      focoX,
      eixoY
    )

    ctx.stroke()

    //---------------------------------
    // raio passando pelo foco
    //---------------------------------

    ctx.beginPath()

    ctx.moveTo(
      objX,
      objTop
    )

    ctx.lineTo(
      focoX,
      eixoY
    )

    ctx.lineTo(
      mirrorX,
      objTop
    )

    ctx.stroke()

    //---------------------------------
    // raio passando pelo centro
    //---------------------------------

    ctx.strokeStyle = "#06b6d4"

    ctx.beginPath()

    ctx.moveTo(
      objX,
      objTop
    )

    ctx.lineTo(
      centroX,
      eixoY
    )

    ctx.stroke()

    //---------------------------------
    // Informações
    //---------------------------------

    ctx.fillStyle = "#333"

    ctx.font = "16px Arial"

    ctx.fillText(
      `do = ${doObj.toFixed(2)} m`,
      20,
      30
    )

    ctx.fillText(
      `di = ${di.toFixed(2)} m`,
      20,
      55
    )

    ctx.fillText(
      `ho = ${params.ho.toFixed(2)} m`,
      20,
      80
    )

    ctx.fillText(
      `hi = ${hi.toFixed(2)} m`,
      20,
      105
    )

    ctx.fillText(
      real
        ? "Imagem Real"
        : "Imagem Virtual",
      20,
      130
    )

    ctx.fillText(
      hi < 0
        ? "Invertida"
        : "Direita",
      20,
      155
    )

  }, [params])

  return (
    <canvas
      ref={canvasRef}
      width={1200}
      height={600}
      className="w-full h-full"
    />
  )
}

function drawPoint(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  label: string
) {

  ctx.fillStyle = "#111"

  ctx.beginPath()
  ctx.arc(x, y, 4, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillText(
    label,
    x + 8,
    y - 8
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