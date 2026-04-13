// src/simulations/dinamica/plano-inclinado.ts

const G = 9.8

export interface PlanoInclinadoParams {
  massa: number       // kg  — range: 1–50
  angulo: number      // °   — range: 1–89
  muEstatico: number  // s/d — range: 0–1
  muCinetico: number  // s/d — range: 0–1
}

export interface Vetor2D {
  x: number
  y: number
}

export interface PlanoInclinadoResult {
  // forças (N)
  peso: Vetor2D
  normal: number
  atritoEstatico: number
  atritoCinetico: number
  forcaResultante: number

  // movimento
  emRepouso: boolean
  aceleracao: number   // m/s²

  // para o canvas — posição do bloco ao longo do tempo
  trajetoria: Array<{ t: number; s: number; v: number }>
}

// ─── funções internas ────────────────────────────────────

function toRad(graus: number): number {
  return graus * Math.PI / 180
}

function peso(massa: number, angulo: number): Vetor2D {
  const rad = toRad(angulo)
  return {
    x: massa * G * Math.sin(rad),  // componente paralela — move o bloco
    y: massa * G * Math.cos(rad),  // componente perpendicular — gera normal
  }
}

function normal(massa: number, angulo: number): number {
  return peso(massa, angulo).y
}

function forcaResultante(
  massa: number,
  angulo: number,
  muEstatico: number,
  muCinetico: number
): { forca: number; emRepouso: boolean } {
  const p = peso(massa, angulo)
  const N = normal(massa, angulo)
  const maxEstatico = muEstatico * N

  if (Math.abs(p.x) <= maxEstatico) {
    return { forca: 0, emRepouso: true }
  }

  const fc = muCinetico * N
  return { forca: p.x - fc, emRepouso: false }
}

function gerarTrajetoria(
  aceleracao: number,
  duracaoSegundos = 3,
  passos = 60
): Array<{ t: number; s: number; v: number }> {
  const dt = duracaoSegundos / passos
  return Array.from({ length: passos + 1 }, (_, i) => {
    const t = parseFloat((i * dt).toFixed(3))
    const s = parseFloat((0.5 * aceleracao * t * t).toFixed(3))
    const v = parseFloat((aceleracao * t).toFixed(3))
    return { t, s, v }
  })
}

// ─── ponto de entrada ────────────────────────────────────

export function calcular(params: PlanoInclinadoParams): PlanoInclinadoResult {
  const { massa, angulo, muEstatico, muCinetico } = params

  const p = peso(massa, angulo)
  const N = normal(massa, angulo)
  const { forca, emRepouso } = forcaResultante(massa, angulo, muEstatico, muCinetico)
  const aceleracao = emRepouso ? 0 : forca / massa

  return {
    peso: {
      x: parseFloat(p.x.toFixed(2)),
      y: parseFloat(p.y.toFixed(2)),
    },
    normal:         parseFloat(N.toFixed(2)),
    atritoEstatico: parseFloat((muEstatico * N).toFixed(2)),
    atritoCinetico: parseFloat((muCinetico * N).toFixed(2)),
    forcaResultante: parseFloat(forca.toFixed(2)),
    emRepouso,
    aceleracao:     parseFloat(aceleracao.toFixed(3)),
    trajetoria:     gerarTrajetoria(aceleracao),
  }
}