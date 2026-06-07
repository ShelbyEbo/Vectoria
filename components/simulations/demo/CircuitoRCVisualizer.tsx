import { useMemo } from "react"

interface Props {
  params: {
    v0: number
    r: number
    c: number
    modo: "carga" | "descarga"
    duracao: number
  }
  playing: boolean
  elapsedTime: number
}

export default function CircuitoRCVisualizer({
  params,
  elapsedTime,
}: Props) {

  const {
    v0,
    r,
    c,
    modo,
  } = params

  const tau = r * c

  const tempo = Math.max(0, elapsedTime)

  const vc =
    modo === "carga"
      ? v0 * (1 - Math.exp(-tempo / tau))
      : v0 * Math.exp(-tempo / tau)

  const corrente =
    modo === "carga"
      ? (v0 / r) * Math.exp(-tempo / tau)
      : -(v0 / r) * Math.exp(-tempo / tau)

  const percentagem =
    Math.max(
      0,
      Math.min(
        100,
        (vc / v0) * 100
      )
    )

  const pontosGrafico = useMemo(() => {

    const pontos = []

    for (let i = 0; i <= 80; i++) {

      const t = (i / 80) * 5 * tau

      const valor =
        modo === "carga"
          ? v0 * (1 - Math.exp(-t / tau))
          : v0 * Math.exp(-t / tau)

      pontos.push({
        x: i,
        y: valor,
      })
    }

    return pontos

  }, [modo, tau, v0])

  const path = pontosGrafico
    .map((p, i) => {

      const x = (p.x / 80) * 300

      const y = 120 - (p.y / v0) * 100

      return `${i === 0 ? "M" : "L"} ${x} ${y}`

    })
    .join(" ")

  const pontoAtualX =
    Math.min(tempo / (5 * tau), 1) * 300

  const pontoAtualY =
    120 - (vc / v0) * 100

  const fluxo =
    (elapsedTime * 80) % 24

  return (
    <div className="w-full h-full flex flex-col gap-6">

      {/* CIRCUITO */}

      <div className="flex justify-center">

        <svg
          width="700"
          height="240"
          viewBox="0 0 700 240"
        >

          {/* bateria */}

          <line x1="60" y1="60" x2="60" y2="180" stroke="white" strokeWidth="3"/>

          <line x1="85" y1="80" x2="85" y2="160" stroke="white" strokeWidth="7"/>

          <text
            x="50"
            y="35"
            fill="white"
            fontSize="14"
          >
            {v0}V
          </text>

          {/* fio superior */}

          <line
            x1="85"
            y1="80"
            x2="220"
            y2="80"
            stroke="white"
            strokeWidth="3"
          />

          {/* resistor */}

          <polyline
            points="
              220,80
              240,60
              260,100
              280,60
              300,100
              320,60
              340,100
              360,80
            "
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3"
          />

          <text
            x="270"
            y="40"
            fill="#f59e0b"
          >
            {r} Ω
          </text>

          {/* capacitor */}

          <line
            x1="430"
            y1="50"
            x2="430"
            y2="110"
            stroke="#60a5fa"
            strokeWidth="4"
          />

          <line
            x1="460"
            y1="50"
            x2="460"
            y2="110"
            stroke="#60a5fa"
            strokeWidth="4"
          />

          <text
            x="420"
            y="35"
            fill="#60a5fa"
          >
            {c} F
          </text>

          {/* preenchimento visual */}

          <rect
            x="432"
            y={110 - percentagem * 0.6}
            width="26"
            height={percentagem * 0.6}
            fill="#3b82f6"
            opacity="0.7"
          />

          {/* fios */}

          <line
            x1="360"
            y1="80"
            x2="430"
            y2="80"
            stroke="white"
            strokeWidth="3"
          />

          <line
            x1="460"
            y1="80"
            x2="620"
            y2="80"
            stroke="white"
            strokeWidth="3"
          />

          <line
            x1="620"
            y1="80"
            x2="620"
            y2="180"
            stroke="white"
            strokeWidth="3"
          />

          <line
            x1="620"
            y1="180"
            x2="60"
            y2="180"
            stroke="white"
            strokeWidth="3"
          />

          {/* corrente animada */}

          {Array.from({ length: 16 }).map((_, i) => {

            const x =
              90 +
              ((i * 35 + fluxo) % 530)

            return (
              <circle
                key={i}
                cx={x}
                cy={80}
                r="3"
                fill="#22c55e"
              />
            )
          })}
        </svg>

      </div>

      {/* INFO */}

      <div className="grid grid-cols-3 gap-4 text-center">

        <div className="bg-card p-3 rounded-lg">
          <div className="text-xs opacity-70">
            Constante τ
          </div>

          <div className="font-bold">
            {tau.toFixed(2)} s
          </div>
        </div>

        <div className="bg-card p-3 rounded-lg">
          <div className="text-xs opacity-70">
            Tensão no capacitor
          </div>

          <div className="font-bold">
            {vc.toFixed(2)} V
          </div>
        </div>

        <div className="bg-card p-3 rounded-lg">
          <div className="text-xs opacity-70">
            Corrente
          </div>

          <div className="font-bold">
            {corrente.toExponential(2)} A
          </div>
        </div>

      </div>

      {/* GRÁFICO */}

      <div className="flex justify-center">

        <svg
          width="360"
          height="150"
          viewBox="0 0 360 150"
        >

          <line
            x1="30"
            y1="120"
            x2="340"
            y2="120"
            stroke="white"
          />

          <line
            x1="30"
            y1="10"
            x2="30"
            y2="120"
            stroke="white"
          />

          <path
            d={path}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            transform="translate(30,0)"
          />

          <circle
            cx={30 + pontoAtualX}
            cy={pontoAtualY}
            r="5"
            fill="#ef4444"
          />

          <text
            x="320"
            y="140"
            fill="white"
            fontSize="12"
          >
            t
          </text>

          <text
            x="8"
            y="15"
            fill="white"
            fontSize="12"
          >
            V
          </text>

        </svg>

      </div>

    </div>
  )
}