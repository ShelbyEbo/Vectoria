import { useEffect, useRef } from "react"

interface Props {
  params: {
    massa: number
    angulo: number
    muEstatico: number
    muCinetico: number
  }
  playing: boolean
  elapsedTime: number
}

export default function PlanoInclinadoVisualizer({
  params,
  elapsedTime,
}: Props) {

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {

    const canvas = canvasRef.current
    if (!canvas) return
    const style = getComputedStyle(document.documentElement)
    const colorCard        = style.getPropertyValue('--color-card').trim()
    const colorMainText    = style.getPropertyValue('--color-main-text').trim()
    const colorButton      = style.getPropertyValue('--color-button').trim()
    const colorAccent      = style.getPropertyValue('--color-accent').trim()
    const colorSuccess     = style.getPropertyValue('--color-success').trim()
    const colorError       = style.getPropertyValue('--color-error').trim()
    const colorWarning     = style.getPropertyValue('--color-warning').trim()
    const colorSecondary   = style.getPropertyValue('--color-secondary').trim()
    const colorBackground  = style.getPropertyValue('--color-background').trim()

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    ctx.clearRect(0, 0, width, height)

    const angle = params.angulo * Math.PI / 180

    const startX = 120
    const startY = height - 80

    const rampLength = 450

    const endX = startX + rampLength
    const endY = startY - Math.tan(angle) * rampLength

    //--------------------------------------------------
    // plano
    //--------------------------------------------------

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, startY);
    ctx.lineTo(endX, endY);
    ctx.closePath();

    ctx.fillStyle = colorCard;
    ctx.fill();

    ctx.strokeStyle = colorSecondary;
    ctx.stroke();

    //--------------------------------------------------
    // física
    //--------------------------------------------------

    const g = 9.8

    const a =
      g *
      (
        Math.sin(angle)
        -
        params.muCinetico * Math.cos(angle)
      )

    const s = Math.max(
      0,
      0.5 * a * elapsedTime * elapsedTime
    )

    const maxDist = rampLength - 40

    const dist = Math.min(s * 25, maxDist)

    //--------------------------------------------------
    // posição do bloco
    //--------------------------------------------------

    //--------------------------------------------------
    // bloco
    //--------------------------------------------------

    const size = 40
    const surfaceX =
      startX +
      Math.cos(angle) * dist

    const surfaceY =
      startY -
      Math.sin(angle) * dist

    const blockX =
      surfaceX -
      Math.sin(angle) * (size / 2)

    const blockY =
      surfaceY -
      Math.cos(angle) * (size / 2)

    ctx.save()

    ctx.translate(blockX, blockY)
    ctx.rotate(-angle)

    ctx.fillRect(
      -size / 2,
      -size / 2,
      size,
      size
    )

    ctx.restore()

    //--------------------------------------------------
    // peso
    //--------------------------------------------------

    ctx.strokeStyle = "red"
    ctx.fillStyle = "red"

    drawArrow(
      ctx,
      blockX,
      blockY,
      blockX,
      blockY + 80
    )

    ctx.fillText(
      "P",
      blockX + 10,
      blockY + 60
    )

    ctx.strokeStyle = colorWarning
    ctx.fillStyle = colorWarning

    drawArrow(
    ctx,
    blockX,
    blockY,
    blockX + Math.cos(angle) * 90,
    blockY - Math.sin(angle) * 90,
    );

    ctx.fillText(
      "Px",
      blockX + Math.cos(angle) * 90 - 10,
      blockY - Math.sin(angle) * 90 - 10
    )

    ctx.strokeStyle = colorButton
    ctx.fillStyle = colorButton
    drawArrow(
    ctx,
    blockX,
    blockY,
    blockX + Math.sin(angle) * 90,
    blockY + Math.cos(angle) * 90,
    );

    ctx.fillText(
      "Py",
      blockX + Math.cos(angle) * 90 - 30,
      blockY + Math.sin(angle) * 90 + 30
    )
    //--------------------------------------------------
    // normal
    //--------------------------------------------------

    const nx =
      blockX -
      Math.sin(angle) * 70

    const ny =
      blockY -
      Math.cos(angle) * 70

    ctx.strokeStyle = "blue"
    ctx.fillStyle = "blue"

    drawArrow(
      ctx,
      blockX,
      blockY,
      nx,
      ny
    )

    ctx.fillText(
      "N",
      nx - 10,
      ny
    )

    //--------------------------------------------------
    // atrito
    //--------------------------------------------------

    const fx =
      blockX -
      Math.cos(angle) * 70

    const fy =
      blockY +
      Math.sin(angle) * 70

    ctx.strokeStyle = "green"
    ctx.fillStyle = "green"

    drawArrow(
      ctx,
      blockX,
      blockY,
      fx,
      fy
    )

    ctx.fillText(
      "Fat",
      fx - 20,
      fy
    )

    //--------------------------------------------------
    // ângulo
    //--------------------------------------------------

    ctx.strokeStyle = "#888"

    ctx.beginPath();
    ctx.arc(
        blockX,
        blockY,
        4,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = colorMainText;
    ctx.fill();
    ctx.stroke()

    ctx.fillStyle = "#888"

    ctx.fillText(
      `${params.angulo}°`,
      startX + 45,
      startY - 10
    )

    drawArrow(
    ctx,
    blockX,
    blockY,
    blockX + Math.cos(angle) * a * 20,
    blockY - Math.sin(angle) * a * 20,
    );
    ctx.strokeStyle = colorSuccess;

    ctx.beginPath();

    ctx.moveTo(startX, startY);

    ctx.lineTo(blockX, blockY);

    ctx.stroke();

    //--------------------------------------------------
    // informações
    //--------------------------------------------------

    ctx.fillStyle = "#444"

    ctx.fillText(
      `a = ${a.toFixed(2)} m/s²`,
      20,
      30
    )

    ctx.fillText(
      `s = ${(dist / 25).toFixed(2)} m`,
      20,
      50
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
  fromX: number,
  fromY: number,
  toX: number,
  toY: number
) {

  const head = 10

  const dx = toX - fromX
  const dy = toY - fromY

  const angle = Math.atan2(dy, dx)

  ctx.beginPath()

  ctx.moveTo(fromX, fromY)
  ctx.lineTo(toX, toY)

  ctx.lineTo(
    toX - head * Math.cos(angle - Math.PI / 6),
    toY - head * Math.sin(angle - Math.PI / 6)
  )

  ctx.moveTo(toX, toY)

  ctx.lineTo(
    toX - head * Math.cos(angle + Math.PI / 6),
    toY - head * Math.sin(angle + Math.PI / 6)
  )

  ctx.stroke()
}