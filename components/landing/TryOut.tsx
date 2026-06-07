import { Play, RotateCw, Square, Pause, ArrowDown, ArrowUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { calcular as calcularCampoEletrico } from '@/src/simulations/eletromag/eletrostatica/campo-eletrico'
import { calcular as calcularCircuitoRC }    from '@/src/simulations/eletromag/eletrodinamica/circuito-rc'
import { calcular as calcularMHS }           from '@/src/simulations/ondas/oscilacoes/mhs'
import { calcular as calcularEspelho }       from '@/src/simulations/optica/optica-geometrica/espelho'
import { calcular as calcularConducao }      from '@/src/simulations/termodinamica/transferencia-de-calor/conducao-calor'
import { calcular as calcularPlanoInclinado } from '@/src/simulations/mecanica/dinamica/plano-inclinado'
import { calcular as calcularMruMruv } from '@/src/simulations/mecanica/cinematica/mru-mruv'
import SimulationRenderer from "../simulations/demo/SimulationRenderer";
import SimulationControls from "../simulations/demo/SimulationControls";

interface LoadDemoProps 
{
  simulacao: 'campo-eletrico' | 'circuito-rc' | 'mhs' | 'espelho' | 'conducao-calor' | 'plano-inclinado' | 'mru-mruv'
}

const PARAMS_DEMO = 
{
  'campo-eletrico':  { q1: 2e-6,  q2: -2e-6, r: 2 },
  'circuito-rc':     { v0: 12, r: 1000, c: 1e-3, modo: 'carga' as const, duracao: 10 },
  'mhs':             { a: 2, t: 3, phi: 0, duracao: 9 },
  'espelho':         { tipo: 'concavo' as const, f: 2, ho: 1, do: 5 },
  'conducao-calor':  { material: 'cobre' as const, k: 385, t1: 300, t2: 20, area: 0.01, espessura: 0.1, duracao: 60 },
  'plano-inclinado': { massa: 10, angulo: 30, muEstatico: 0.4, muCinetico: 0.3 },
  'mru-mruv':        { tipo: 'MRUV' as const, s0: 0, duracao: 5, v: 10, v0: 20, a: -4 }
}

function LoadDemo({ simulacao }: LoadDemoProps) {
  switch (simulacao) {
    case 'campo-eletrico':
      return calcularCampoEletrico(PARAMS_DEMO['campo-eletrico'])

    case 'circuito-rc':
      return calcularCircuitoRC(PARAMS_DEMO['circuito-rc'])

    case 'mhs':
      return calcularMHS(PARAMS_DEMO['mhs'])

    case 'espelho':
      return calcularEspelho(PARAMS_DEMO['espelho'])

    case 'conducao-calor':
      return calcularConducao(PARAMS_DEMO['conducao-calor'])

    case 'plano-inclinado':
      return calcularPlanoInclinado(PARAMS_DEMO['plano-inclinado'])

    case 'mru-mruv': 
      return calcularMruMruv(PARAMS_DEMO['mru-mruv'])

    default:
      return null
  }
}

type SimulationType = | "campo-eletrico" | "circuito-rc" | "mhs" | "espelho" | "conducao-calor" | "plano-inclinado" | "mru-mruv"

export default function TryOut() {

  type sims =
  {
    topic: string,
    subtopics: SimulationType[]
  }
  const labels = {
  "mru-mruv": "MRU / MRUV",
  "plano-inclinado": "Plano Inclinado",
  "campo-eletrico": "Campo Elétrico",
  "circuito-rc": "Circuito RC",
  "mhs": "Movimento Harmónico Simples",
  "espelho": "Espelho Esférico",
  "conducao-calor": "Condução de Calor",
}
  const [playing, setPlaying] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  // quando muda a simulação
  const [isOpen, setIsOpen] = useState(false);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState("Escolhe um fenômeno")
  const [params, setParams] = useState(PARAMS_DEMO)
  const [topicSelecionado, setTopicSelecionado] = useState<string | null>(null)
  const [simSelecionada, setSimSelecionada] = useState<LoadDemoProps['simulacao'] | null>(null)
  useEffect(() => {
    if (!playing)
      return
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 0.05)
    }, 50)
    return () => clearInterval(interval)
  }, [playing])
  const simulations: sims[] = [
    { topic: "Eletromagnetismo", subtopics: ["campo-eletrico", "circuito-rc"] } ,
    { topic: "Mecânica", subtopics: ["plano-inclinado", "mru-mruv"] },
    { topic: "Ondas", subtopics: ["mhs"] },
    { topic: "Óptica", subtopics: ["espelho"] },
    { topic: "Termodinâmica", subtopics: ["conducao-calor"] },
  ]
  const opcoes = ['Eletromagnetismo', 'Mecânica', 'Ondas', 'Óptica', 'Termodinâmica']

  return (
    <section id="experiment" className="min-h-screen relative px-4 py-6 md:px-20 md:py-16">
      <div className="flex flex-col items-center gap-2 md:gap-4 text-center max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold">Demo</h1>
        <h2 className="text-sm sm:text-base md:text-xl">
          Esta é uma versão demo sobre a magia do teu novo laboratório
        </h2>
      </div>

      <div className="pt-8 md:pt-10">
        <div className="bg-card relative flex flex-col px-4 py-6 md:px-12 md:py-8 rounded-lg shadow-card gap-4 max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h3 className="text-base md:text-lg font-semibold">Simulador</h3>

            <div className="w-full md:w-auto relative inline-block overflow-visible">
              <button onClick={() => setIsOpen(!isOpen)} className="bg-card-hover items-center shadow-btn px-6 py-2 flex gap-2 rounded-md border border-1 border-second-text cursor-pointer">
                {opcaoSelecionada}
                {isOpen && (<ArrowUp size={18}/>)}
                {!isOpen && (<ArrowDown size={18}/>)}
                </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute left-0 top-full z-[9999] mt-2 w-full rounded-md border border-second-text bg-card-hover p-4 shadow-xl"
                  >
                    {opcoes.map((opcao, index) => (
                      <li key={index} onClick={() => {setOpcaoSelecionada(opcao); setIsOpen(false);}} className="px-3 py-2 cursor-pointer hover:bg-card/70 rounded-md">
                        {opcao}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
              {opcaoSelecionada && (
                <div className="flex flex-col gap-3 mt-4">
                  <div className="flex flex-wrap gap-2">
                    {
                      simulations.find(sim => sim.topic === opcaoSelecionada)?.subtopics.map(sub => (
                        <button key={sub} onClick={() => setSimSelecionada(sub)} className={`m-2 px-4 py-2 rounded-md shadow-btn shadow-sm cursor-pointer border border-second-text ${simSelecionada === sub ? "bg-btn-ghost-text text-btn-text" : "bg-button"}`}>{labels[sub]}</button>
                      ))
                    }
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="bg-card-hover border-2 border-main-text/5 rounded-lg p-4 md:p-6 w-full h-64 sm:h-76 md:h-100 lg:h-[34rem] flex items-center justify-center relative overflow-hidden">
              <div className="text-secondary-text text-center px-2 text-sm md:text-base">
                <SimulationRenderer simulation={simSelecionada} params={simSelecionada ? params[simSelecionada] : null} playing={playing} elapsedTime={elapsedTime}/>
              </div>
            </div>
            {simSelecionada && 
            <div className="mx-2">
              <SimulationControls simulation={simSelecionada} params={params[simSelecionada]} onChange={(newParams) => setParams(prev => ({...prev, [simSelecionada]: {...prev[simSelecionada], ...newParams}}))}/>
            </div>
            }
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-2">
            <button
              aria-label={playing ? "Pause" : "Play"}
              title={playing ? "Pause" : "Play"}
              className="bg-button text-main-text w-full sm:w-auto px-4 py-4 rounded-full shadow-btn hover:shadow-btn-active flex items-center justify-center"
              onClick={() => setPlaying(!playing)}
            >
              {playing ? (
                <Pause className="text-success w-5 h-5" />
              ) : (
                <Play className="text-success w-5 h-5" />
              )}

              <span className="sr-only">
                {playing ? "Pause" : "Play"}
              </span>
            </button>

            <button
              aria-label="Reset"
              title="Reset"
              className="bg-button text-main-text w-full sm:w-auto px-4 py-4 rounded-full shadow-btn hover:shadow-btn-active flex items-center justify-center"
              onClick={() => {setElapsedTime(0); setPlaying(true);}}>
              <RotateCw className="text-warning w-5 h-5" />
              <span className="sr-only">Reset</span>
            </button>

            <button
              aria-label="Stop"
              title="Stop"
              className="bg-button text-main-text w-full sm:w-auto px-4 py-4 rounded-full shadow-btn hover:shadow-btn-active flex items-center justify-center"
              onClick={() => {setPlaying(false); setElapsedTime(0);}}>
              <Square className="text-error w-5 h-5" />
              <span className="sr-only">Stop</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
