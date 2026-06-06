// src/simulations/cinematica/mru-mruv.ts

export interface MruMruvParams {
  tipo:    'MRU' | 'MRUV'
  s0:      number   // m    — posição inicial
  duracao: number   // s    — duração da simulação
  v:       number   // m/s  — velocidade constante (MRU)
  v0:      number   // m/s  — velocidade inicial (MRUV)
  a:       number   // m/s² — aceleração (MRUV)
}

export interface PontoParagem {
  t: number
  s: number
}

export interface MruMruvResult {
  tipo:            'MRU' | 'MRUV'
  velocidadeFinal: number
  posicaoFinal:    number
  distancia:       number
  torricelli:      number | null
  pontoParagem:    PontoParagem | null
  trajetoria:      Array<{ t: number; s: number; v: number }>
}

// ─── funções internas MRU ────────────────────────────────

function posicao(s0: number, v: number, t: number): number {
  return s0 + v * t
}

function tempoParaPosicao(s0: number, v: number, s: number): number {
  if (v === 0) return Infinity  // sem velocidade nunca chega
  return (s - s0) / v
}

function gerarTrajetoriaMRU(
  s0: number,
  v: number,
  duracao: number,
  passos = 60
): Array<{ t: number; s: number; v: number }> {
  const dt = duracao / passos
  return Array.from({ length: passos + 1 }, (_, i) => {
    const t = parseFloat((i * dt).toFixed(3))
    const s = parseFloat(posicao(s0, v, t).toFixed(3))
    return { t, s, v }
  })
}

// ─── funções internas MRUV ───────────────────────────────

function posicaoMRUV(s0: number, v0: number, a: number, t: number): number {
  return s0 + v0 * t + 0.5 * a * t * t  // Math.pow substituído por t * t
}

function velocidadeMRUV(v0: number, a: number, t: number): number {
  return v0 + a * t
}

function calcularTorricelli(v0: number, a: number, ds: number): number | null {
  const v2 = v0 * v0 + 2 * a * ds
  if (v2 < 0) return null  // raiz de número negativo — fisicamente impossível
  return parseFloat(Math.sqrt(v2).toFixed(3))
}

function tempoParaVelocidade(v0: number, a: number, v: number): number | null {
  if (a === 0) return null  // sem aceleração a velocidade nunca muda
  return parseFloat(((v - v0) / a).toFixed(3))
}

function tempoParaPosicaoMRUV(
  s0: number,
  v0: number,
  a: number,
  s: number
): number | null {
  // resolve: 0.5*a*t² + v0*t + (s0 - s) = 0
  const ds = s - s0
  if (a === 0) {
    // sem aceleração → MRU
    if (v0 === 0) return null
    return parseFloat((ds / v0).toFixed(3))
  }
  const discriminante = v0 * v0 + 2 * a * ds
  if (discriminante < 0) return null  // não atinge a posição
  const t1 = (-v0 + Math.sqrt(discriminante)) / a
  const t2 = (-v0 - Math.sqrt(discriminante)) / a
  // devolve o menor tempo positivo
  const validos = [t1, t2].filter(t => t >= 0)
  if (validos.length === 0) return null
  return parseFloat(Math.min(...validos).toFixed(3))
}

function calcularPontoParagem(
  s0: number,
  v0: number,
  a: number
): PontoParagem | null {
  // o corpo para quando v = 0 → t = -v0 / a
  if (a === 0) return null  // velocidade constante, nunca para
  const t = -v0 / a
  if (t <= 0) return null   // paragem já ocorreu antes do início
  const s = parseFloat(posicaoMRUV(s0, v0, a, t).toFixed(3))
  return { t: parseFloat(t.toFixed(3)), s }
}

function gerarTrajetoriaMRUV(
  s0: number,
  v0: number,
  a: number,
  duracao: number,
  passos = 60
): Array<{ t: number; s: number; v: number }> {
  const dt = duracao / passos
  return Array.from({ length: passos + 1 }, (_, i) => {
    const t = parseFloat((i * dt).toFixed(3))
    const s = parseFloat(posicaoMRUV(s0, v0, a, t).toFixed(3))
    const v = parseFloat(velocidadeMRUV(v0, a, t).toFixed(3))
    return { t, s, v }
  })
}

// ─── ponto de entrada ────────────────────────────────────

export function calcular(params: MruMruvParams): MruMruvResult {
  const { tipo, s0, v, v0, a, duracao } = params

  if (tipo === 'MRU') {
    const posicaoFinal = parseFloat(posicao(s0, v, duracao).toFixed(3))
    return {
      tipo,
      velocidadeFinal: parseFloat(v.toFixed(3)),
      posicaoFinal,
      distancia:       parseFloat(Math.abs(posicaoFinal - s0).toFixed(3)),
      torricelli:      null,
      pontoParagem:    null,
      trajetoria:      gerarTrajetoriaMRU(s0, v, duracao),
    }
  }

  // MRUV
  const posicaoFinal    = parseFloat(posicaoMRUV(s0, v0, a, duracao).toFixed(3))
  const velocidadeFinal = parseFloat(velocidadeMRUV(v0, a, duracao).toFixed(3))
  const ds              = posicaoFinal - s0

  return {
    tipo,
    velocidadeFinal,
    posicaoFinal,
    distancia:    parseFloat(Math.abs(ds).toFixed(3)),
    torricelli:   calcularTorricelli(v0, a, ds),
    pontoParagem: calcularPontoParagem(s0, v0, a),
    trajetoria:   gerarTrajetoriaMRUV(s0, v0, a, duracao),
  }
}