// src/simulations/ondas/oscilacoes/mhs.ts

export interface MhsParams {
  a:       number   // m   — amplitude, range: 0.1–10
  t:       number   // s   — período, range: 0.1–10
  phi:     number   // °   — fase inicial, range: 0–360
  duracao: number   // s   — duração, range: 1–30
}

export interface MhsResult {
  amplitude:      number   // m
  periodo:        number   // s
  frequencia:     number   // Hz
  frequenciaAng:  number   // rad/s — ω
  posicaoFinal:   number   // m
  velocidadeMax:  number   // m/s
  aceleracaoMax:  number   // m/s²
  energiaTotalJ:  number   // J — energia total (massa = 1kg por convenção)
  trajetoria: Array<{
    t:   number   // s
    x:   number   // m   — posição
    v:   number   // m/s — velocidade
    ac:  number   // m/s² — aceleração
    ec:  number   // J   — energia cinética
    ep:  number   // J   — energia potencial
  }>
}

// ─── funções internas ────────────────────────────────────

function toRad(graus: number): number {
  return graus * Math.PI / 180
}

function frequenciaAngular(periodo: number): number {
  // ω = 2π / T
  return parseFloat(((2 * Math.PI) / periodo).toFixed(6))
}

function posicaoMHS(a: number, omega: number, t: number, phi: number): number {
  // x(t) = A * cos(ωt + φ)
  return parseFloat((a * Math.cos(omega * t + phi)).toFixed(6))
}

function velocidadeMHS(a: number, omega: number, t: number, phi: number): number {
  // v(t) = -A * ω * sin(ωt + φ)
  return parseFloat((-a * omega * Math.sin(omega * t + phi)).toFixed(6))
}

function aceleracaoMHS(a: number, omega: number, t: number, phi: number): number {
  // ac(t) = -A * ω² * cos(ωt + φ)
  return parseFloat((-a * omega * omega * Math.cos(omega * t + phi)).toFixed(6))
}

function energiaCinetica(v: number, massa = 1): number {
  // Ec = 0.5 * m * v²
  return parseFloat((0.5 * massa * v * v).toFixed(6))
}

function energiaPotencial(omega: number, x: number, massa = 1): number {
  // Ep = 0.5 * m * ω² * x²
  return parseFloat((0.5 * massa * omega * omega * x * x).toFixed(6))
}

function gerarTrajetoria(
  a: number,
  omega: number,
  phi: number,
  duracao: number,
  passos = 60
): MhsResult['trajetoria'] {
  const dt = duracao / passos

  return Array.from({ length: passos + 1 }, (_, i) => {
    const t  = parseFloat((i * dt).toFixed(3))
    const x  = posicaoMHS(a, omega, t, phi)
    const v  = velocidadeMHS(a, omega, t, phi)
    const ac = aceleracaoMHS(a, omega, t, phi)
    const ec = energiaCinetica(v)
    const ep = energiaPotencial(omega, x)

    return { t, x, v, ac, ec, ep }
  })
}

// ─── ponto de entrada ────────────────────────────────────

export function calcular(params: MhsParams): MhsResult {
  const { a, t: periodo, phi, duracao } = params

  const phiRad    = toRad(phi)
  const omega     = frequenciaAngular(periodo)
  const trajetoria = gerarTrajetoria(a, omega, phiRad, duracao)
  const ultimo    = trajetoria[trajetoria.length - 1]

  return {
    amplitude:     a,
    periodo,
    frequencia:    parseFloat((1 / periodo).toFixed(6)),
    frequenciaAng: omega,
    posicaoFinal:  ultimo.x,
    velocidadeMax: parseFloat((a * omega).toFixed(6)),
    aceleracaoMax: parseFloat((a * omega * omega).toFixed(6)),
    energiaTotalJ: parseFloat((0.5 * omega * omega * a * a).toFixed(6)),
    trajetoria,
  }
}