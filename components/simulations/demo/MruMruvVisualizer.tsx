import { useEffect, useRef } from "react"

interface Props {
  params: {
    tipo: "MRU" | "MRUV"
    s0: number
    duracao: number
    v: number
    v0: number
    a: number
  }
  playing: boolean
  elapsedTime: number
}

export default function MruMruvVisualizer({
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

    //----------------------------------
    // física
    //----------------------------------

    let posicao = 0
    let velocidade = 0

    const t = Math.min(elapsedTime, params.duracao)

    if (params.tipo === "MRU") {
      posicao =
        params.s0 +
        params.v * t

      velocidade =
        params.v
    } else {
      posicao =
        params.s0 +
        params.v0 * t +
        0.5 * params.a * t * t

      velocidade =
        params.v0 +
        params.a * t
    }

    //----------------------------------
    // posição final
    //----------------------------------

    const maxPosicao =
      params.tipo === "MRU"
        ? params.s0 +
          params.v * params.duracao
        : params.s0 +
          params.v0 * params.duracao +
          0.5 *
            params.a *
            params.duracao *
            params.duracao

    const progress =
      maxPosicao === 0
        ? 0
        : Math.max(
            0,
            Math.min(posicao / maxPosicao, 1)
          )

    //----------------------------------
    // limpar
    //----------------------------------

    ctx.clearRect(
      0,
      0,
      width,
      height
    )

    //----------------------------------
    // fundo
    //----------------------------------

    ctx.fillStyle = "#0f172a"
    ctx.fillRect(
      0,
      0,
      width,
      height
    )

    //----------------------------------
    // grid
    //----------------------------------

    ctx.strokeStyle =
      "rgba(255,255,255,0.05)"

    for (
      let x = 0;
      x < width;
      x += 40
    ) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    for (
      let y = 0;
      y < height;
      y += 40
    ) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    //----------------------------------
    // pista
    //----------------------------------

    const trackY =
      height * 0.65

    ctx.strokeStyle =
      "#64748b"

    ctx.lineWidth = 6

    ctx.beginPath()
    ctx.moveTo(50, trackY)
    ctx.lineTo(
      width - 50,
      trackY
    )
    ctx.stroke()

    //----------------------------------
    // marcas
    //----------------------------------

    for (
      let i = 0;
      i <= 10;
      i++
    ) {
      const x =
        50 +
        ((width - 100) / 10) * i

      ctx.strokeStyle =
        "#94a3b8"

      ctx.lineWidth = 2

      ctx.beginPath()
      ctx.moveTo(
        x,
        trackY - 10
      )
      ctx.lineTo(
        x,
        trackY + 10
      )
      ctx.stroke()
    }

    //----------------------------------
    // bloco
    //----------------------------------

    const blockX =
      50 +
      progress *
        (width - 100)

    const blockY =
      trackY - 45

    ctx.fillStyle =
      "#3b82f6"

    ctx.shadowColor =
      "#3b82f6"

    ctx.shadowBlur = 20

    ctx.fillRect(
      blockX - 25,
      blockY,
      50,
      30
    )

    ctx.shadowBlur = 0

    //----------------------------------
    // vetor velocidade
    //----------------------------------

    const arrowSize =
      Math.min(
        Math.abs(velocidade) * 4,
        120
      )

    ctx.strokeStyle =
      "#22c55e"

    ctx.lineWidth = 4

    ctx.beginPath()
    ctx.moveTo(
      blockX,
      blockY - 20
    )
    ctx.lineTo(
      blockX + arrowSize,
      blockY - 20
    )
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(
      blockX + arrowSize,
      blockY - 20
    )
    ctx.lineTo(
      blockX + arrowSize - 10,
      blockY - 30
    )
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(
      blockX + arrowSize,
      blockY - 20
    )
    ctx.lineTo(
      blockX + arrowSize - 10,
      blockY - 10
    )
    ctx.stroke()

    //----------------------------------
    // textos
    //----------------------------------

    ctx.fillStyle =
      "#ffffff"

    ctx.font =
      "16px sans-serif"

    ctx.fillText(
      `t = ${t.toFixed(2)} s`,
      20,
      30
    )

    ctx.fillText(
      `s = ${posicao.toFixed(2)} m`,
      20,
      55
    )

    ctx.fillText(
      `v = ${velocidade.toFixed(2)} m/s`,
      20,
      80
    )

    if (params.tipo === "MRUV") {
      ctx.fillText(
        `a = ${params.a.toFixed(2)} m/s²`,
        20,
        105
      )
    }
  }, [elapsedTime, params])

  return (
    <canvas
      ref={canvasRef}
      width={1200}
      height={600}
      className="w-full h-full rounded-lg"
    />
  )
}