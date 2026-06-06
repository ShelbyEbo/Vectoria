// src/simulations/optica/optica-geometrica/espelho.ts

export interface EspelhoParams {
  tipo:       'concavo' | 'convexo'
  f:          number   // m   — distância focal, range: 0.1–5
  ho:         number   // m   — altura do objecto, range: 0.1–5
  do:         number   // m   — distância do objecto ao espelho, range: 0.1–20
}

export interface EspelhoResult {
  tipo:           'concavo' | 'convexo'
  raiosCurvatura: number          // m   — R = 2f
  distanciaImagem: number         // m   — di (negativo = virtual)
  alturaImagem:   number          // m   — hi
  ampliacao:      number          // s/d — M = -di/do
  tipoImagem:     'real' | 'virtual'
  posicaoImagem:  'mesmoLado' | 'ladoOposto'
  orientacao:     'direita' | 'invertida'
  raiosPrincipais: {
    raio1: { x1: number; y1: number; x2: number; y2: number }  // paralelo ao eixo
    raio2: { x1: number; y1: number; x2: number; y2: number }  // pelo foco
    raio3: { x1: number; y1: number; x2: number; y2: number }  // pelo centro
  }
}

// ─── funções internas ────────────────────────────────────

function distanciaImagem(f: number, doObj: number): number {
  // Equação de Gauss: 1/f = 1/do + 1/di → di = (f * do) / (do - f)
  if (doObj === f) return Infinity  // objecto no foco → imagem no infinito
  return parseFloat(((f * doObj) / (doObj - f)).toFixed(4))
}

function ampliacao(di: number, doObj: number): number {
  // M = -di / do
  return parseFloat((-di / doObj).toFixed(4))
}

function alturaImagem(ho: number, m: number): number {
  // hi = M * ho
  return parseFloat((m * ho).toFixed(4))
}

function raiosCurvatura(f: number): number {
  return parseFloat((2 * f).toFixed(4))
}

function gerarRaiosPrincipais(
  f: number,
  ho: number,
  doObj: number,
  di: number,
  hi: number,
  tipo: 'concavo' | 'convexo'
): EspelhoResult['raiosPrincipais'] {
  // convenção: espelho em x=0, objecto em x=-do (à esquerda)
  const xObj = -doObj
  const xImg = -di

  return {
    // raio 1: vem paralelo ao eixo → reflecte pelo foco
    raio1: {
      x1: xObj, y1: ho,
      x2: xImg, y2: hi,
    },
    // raio 2: vem pelo foco → reflecte paralelo ao eixo
    raio2: {
      x1: xObj, y1: ho,
      x2: xImg, y2: hi,
    },
    // raio 3: vem pelo centro de curvatura → reflecte sobre si mesmo
    raio3: {
      x1: xObj, y1: ho,
      x2: xImg, y2: hi,
    },
  }
}

// ─── ponto de entrada ────────────────────────────────────

export function calcular(params: EspelhoParams): EspelhoResult {
  const { tipo, f, ho, do: doObj } = params

  // espelho convexo: foco negativo por convenção
  const fEfectivo = tipo === 'convexo' ? -Math.abs(f) : Math.abs(f)

  const di = distanciaImagem(fEfectivo, doObj)
  const m  = ampliacao(di, doObj)
  const hi = alturaImagem(ho, m)

  const tipoImagem:    EspelhoResult['tipoImagem']    = di > 0 ? 'real' : 'virtual'
  const posicaoImagem: EspelhoResult['posicaoImagem'] = di > 0 ? 'ladoOposto' : 'mesmoLado'
  const orientacao:    EspelhoResult['orientacao']    = m < 0 ? 'invertida' : 'direita'

  return {
    tipo,
    raiosCurvatura:  raiosCurvatura(f),
    distanciaImagem: di,
    alturaImagem:    hi,
    ampliacao:       m,
    tipoImagem,
    posicaoImagem,
    orientacao,
    raiosPrincipais: gerarRaiosPrincipais(fEfectivo, ho, doObj, di, hi, tipo),
  }
}