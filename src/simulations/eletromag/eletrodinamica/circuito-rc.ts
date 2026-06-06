// src/simulations/eletromagnetismo/eletrodinamica/circuito-rc.ts

export interface CircuitoRCParams {
  v0:  number   // V   — tensão inicial, range: 1–24
  r:   number   // Ω   — resistência, range: 100–100000
  c:   number   // F   — capacitância, range: 1e-6 a 1e-2
  modo: 'carga' | 'descarga'
  duracao: number  // s — duração da simulação, range: 0.1–60
}

export interface CircuitoRCResult {
  tauRC:          number   // s   — constante de tempo τ = R·C
  tempoPleno:     number   // s   — tempo para 99% de carga/descarga (~5τ)
  tensaoFinal:    number   // V   — tensão no fim da simulação
  correnteFinal:  number   // A   — corrente no fim da simulação
  energiaFinal:   number   // J   — energia armazenada no condensador
  trajetoria: Array<{
    t:  number   // s
    vc: number   // V — tensão no condensador
    i:  number   // A — corrente no circuito
    e:  number   // J — energia no condensador
  }>
}

// ─── funções internas ────────────────────────────────────

function tauRC(r: number, c: number): number {
  return parseFloat((r * c).toFixed(6))
}

function tensaoCarga(v0: number, tau: number, t: number): number {
  // Vc(t) = V0 * (1 - e^(-t/τ))
  return parseFloat((v0 * (1 - Math.exp(-t / tau))).toFixed(6))
}

function tensaoDescarga(v0: number, tau: number, t: number): number {
  // Vc(t) = V0 * e^(-t/τ)
  return parseFloat((v0 * Math.exp(-t / tau)).toFixed(6))
}

function corrente(v0: number, r: number, tau: number, t: number, modo: 'carga' | 'descarga'): number {
  // I(t) = (V0/R) * e^(-t/τ) — igual para carga e descarga
  return parseFloat(((v0 / r) * Math.exp(-t / tau)).toFixed(6))
}

function energiaCondensador(c: number, vc: number): number {
  // E = 0.5 * C * Vc²
  return parseFloat((0.5 * c * vc * vc).toFixed(9))
}

function gerarTrajetoria(
  v0: number,
  r: number,
  c: number,
  modo: 'carga' | 'descarga',
  duracao: number,
  passos = 60
): CircuitoRCResult['trajetoria'] {
  const tau = tauRC(r, c)
  const dt  = duracao / passos

  return Array.from({ length: passos + 1 }, (_, i) => {
    const t  = parseFloat((i * dt).toFixed(4))
    const vc = modo === 'carga'
      ? tensaoCarga(v0, tau, t)
      : tensaoDescarga(v0, tau, t)
    const i_ = corrente(v0, r, tau, t, modo)
    const e  = energiaCondensador(c, vc)

    return { t, vc, i: i_, e }
  })
}

// ─── ponto de entrada ────────────────────────────────────

export function calcular(params: CircuitoRCParams): CircuitoRCResult {
  const { v0, r, c, modo, duracao } = params

  const tau       = tauRC(r, c)
  const trajetoria = gerarTrajetoria(v0, r, c, modo, duracao)
  const ultimo    = trajetoria[trajetoria.length - 1]

  return {
    tauRC:         tau,
    tempoPleno:    parseFloat((5 * tau).toFixed(4)),
    tensaoFinal:   ultimo.vc,
    correnteFinal: ultimo.i,
    energiaFinal:  ultimo.e,
    trajetoria,
  }
}