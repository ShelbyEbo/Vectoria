// src/simulations/termodinamica/transferencia-de-calor/conducao-calor.ts

export interface ConducaoCalorParams {
  material:   'cobre' | 'aluminio' | 'ferro' | 'vidro' | 'madeira' | 'personalizado'
  k:          number   // W/(m·K) — condutividade térmica (usado se material = personalizado)
  t1:         number   // °C — temperatura lado quente, range: 0–1000
  t2:         number   // °C — temperatura lado frio,   range: -100–500
  area:       number   // m² — área da secção transversal, range: 0.001–1
  espessura:  number   // m  — espessura do material, range: 0.001–1
  duracao:    number   // s  — duração da simulação, range: 1–300
}

export interface ConducaoCalorResult {
  condutividade:    number   // W/(m·K)
  gradienteTermico: number   // K/m  — ΔT / espessura
  fluxoCalor:       number   // W/m² — q = k * ΔT / espessura
  potenciaTotal:    number   // W    — Q/t = k * A * ΔT / espessura
  energiaTotal:     number   // J    — energia transferida na duração
  resistenciaTermica: number // K/W  — R = espessura / (k * A)
  perfil: Array<{
    posicao:     number   // m   — posição ao longo da espessura
    temperatura: number   // °C  — temperatura nessa posição
  }>
  trajetoria: Array<{
    t:    number   // s
    qAcumulado: number   // J — calor acumulado
  }>
}

// ─── condutividades térmicas dos materiais (W/(m·K)) ─────

const CONDUTIVIDADES: Record<string, number> = {
  cobre:    385,
  aluminio: 205,
  ferro:    80,
  vidro:    1.05,
  madeira:  0.15,
}

function condutividade(material: ConducaoCalorParams['material'], k: number): number {
  if (material === 'personalizado') return k
  return CONDUTIVIDADES[material] ?? k
}

// ─── funções internas ────────────────────────────────────

function gradienteTermico(t1: number, t2: number, espessura: number): number {
  // ΔT / L
  return parseFloat(((t1 - t2) / espessura).toFixed(4))
}

function fluxoCalor(k: number, gradiente: number): number {
  // q = k * (ΔT / L)  — lei de Fourier
  return parseFloat((k * gradiente).toFixed(4))
}

function potenciaTotal(fluxo: number, area: number): number {
  // P = q * A
  return parseFloat((fluxo * area).toFixed(4))
}

function resistenciaTermica(espessura: number, k: number, area: number): number {
  // R = L / (k * A)
  return parseFloat((espessura / (k * area)).toFixed(6))
}

function gerarPerfil(
  t1: number,
  t2: number,
  espessura: number,
  pontos = 20
): ConducaoCalorResult['perfil'] {
  // perfil linear — condução em regime permanente
  return Array.from({ length: pontos + 1 }, (_, i) => {
    const posicao      = parseFloat(((i / pontos) * espessura).toFixed(4))
    const temperatura  = parseFloat((t1 - (t1 - t2) * (i / pontos)).toFixed(3))
    return { posicao, temperatura }
  })
}

function gerarTrajetoria(
  potencia: number,
  duracao: number,
  passos = 60
): ConducaoCalorResult['trajetoria'] {
  const dt = duracao / passos

  return Array.from({ length: passos + 1 }, (_, i) => {
    const t          = parseFloat((i * dt).toFixed(3))
    const qAcumulado = parseFloat((potencia * t).toFixed(4))
    return { t, qAcumulado }
  })
}

// ─── ponto de entrada ────────────────────────────────────

export function calcular(params: ConducaoCalorParams): ConducaoCalorResult {
  const { material, k, t1, t2, area, espessura, duracao } = params

  const kEfectivo  = condutividade(material, k)
  const gradiente  = gradienteTermico(t1, t2, espessura)
  const fluxo      = fluxoCalor(kEfectivo, gradiente)
  const potencia   = potenciaTotal(fluxo, area)

  return {
    condutividade:      kEfectivo,
    gradienteTermico:   gradiente,
    fluxoCalor:         fluxo,
    potenciaTotal:      potencia,
    energiaTotal:       parseFloat((potencia * duracao).toFixed(4)),
    resistenciaTermica: resistenciaTermica(espessura, kEfectivo, area),
    perfil:             gerarPerfil(t1, t2, espessura),
    trajetoria:         gerarTrajetoria(potencia, duracao),
  }
}