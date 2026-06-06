// src/simulations/eletromagnetismo/eletrostatica/campo-eletrico.ts

const K = 8.99e9  // constante de Coulomb (N·m²/C²)

export interface CampoEletricoParams {
  q1:  number   // C   — carga 1, range: -10e-6 a 10e-6
  q2:  number   // C   — carga 2, range: -10e-6 a 10e-6
  r:   number   // m   — distância entre cargas, range: 0.1–10
}

export interface Vetor2D {
  x: number
  y: number
  magnitude: number
}

export interface CampoEletricoResult {
  forcaCoulomb:     number    // N   — força entre as cargas
  campoCarga1:      number    // N/C — campo gerado pela carga 1 no ponto médio
  campoCarga2:      number    // N/C — campo gerado pela carga 2 no ponto médio
  campoResultante:  number    // N/C — campo resultante no ponto médio
  tipoInteracao:    'atracao' | 'repulsao'
  linhasDeCampo:    Array<{ x: number; y: number; ex: number; ey: number }>
}

// ─── funções internas ────────────────────────────────────

function forcaCoulomb(q1: number, q2: number, r: number): number {
  if (r === 0) return Infinity
  return parseFloat((K * Math.abs(q1 * q2) / (r * r)).toFixed(6))
}

function campoPontual(q: number, r: number): number {
  if (r === 0) return Infinity
  return parseFloat((K * Math.abs(q) / (r * r)).toFixed(6))
}

function gerarLinhasDeCampo(
  q1: number,
  q2: number,
  r: number,
  resolucao = 20
): Array<{ x: number; y: number; ex: number; ey: number }> {
  const pontos: Array<{ x: number; y: number; ex: number; ey: number }> = []

  // posição das cargas no eixo x
  const x1 = -r / 2
  const x2 =  r / 2

  const passo = r / resolucao

  for (let xi = x1 - r * 0.5; xi <= x2 + r * 0.5; xi += passo) {
    for (let yi = -r * 0.5; yi <= r * 0.5; yi += passo) {
      const dx1 = xi - x1
      const dy1 = yi
      const dx2 = xi - x2
      const dy2 = yi

      const r1 = Math.sqrt(dx1 * dx1 + dy1 * dy1)
      const r2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)

      if (r1 < 0.05 || r2 < 0.05) continue

      // campo de q1 no ponto
      const e1 = K * q1 / (r1 * r1)
      const ex1 = e1 * (dx1 / r1)
      const ey1 = e1 * (dy1 / r1)

      // campo de q2 no ponto
      const e2 = K * q2 / (r2 * r2)
      const ex2 = e2 * (dx2 / r2)
      const ey2 = e2 * (dy2 / r2)

      const ex = parseFloat((ex1 + ex2).toFixed(4))
      const ey = parseFloat((ey1 + ey2).toFixed(4))

      pontos.push({
        x:  parseFloat(xi.toFixed(4)),
        y:  parseFloat(yi.toFixed(4)),
        ex,
        ey,
      })
    }
  }

  return pontos
}

// ─── ponto de entrada ────────────────────────────────────

export function calcular(params: CampoEletricoParams): CampoEletricoResult {
  const { q1, q2, r } = params

  const rMeio = r / 2  // ponto médio entre as cargas

  return {
    forcaCoulomb:    forcaCoulomb(q1, q2, r),
    campoCarga1:     campoPontual(q1, rMeio),
    campoCarga2:     campoPontual(q2, rMeio),
    campoResultante: parseFloat(
      Math.abs(campoPontual(q1, rMeio) - campoPontual(q2, rMeio)).toFixed(6)
    ),
    tipoInteracao:   q1 * q2 < 0 ? 'atracao' : 'repulsao',
    linhasDeCampo:   gerarLinhasDeCampo(q1, q2, r),
  }
}