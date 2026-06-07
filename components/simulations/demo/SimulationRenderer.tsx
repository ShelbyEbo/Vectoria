import MruMruvVisualizer from "./MruMruvVisualizer"
import PlanoInclinadoVisualizer from "./PlanoInclinadoVisualizer"
import MHSVisualizer from "./MHSVisualizer"
import EspelhoVisualizer from "./EspelhoVisualizer"
import CampoEletricoVisualizer from "./CampoEletricoVisualizer"
import CircuitoRCVisualizer from "./CircuitoRCVisualizer"
import ConducaoCalorVisualizer from "./ConducaoCalorVisualizer"

interface Props {
  simulation: string | null
  params: any
  playing: boolean
  elapsedTime: number
}

export default function SimulationRenderer({
  simulation,
  params,
  playing,
  elapsedTime,
}: Props) {

  if (!simulation) {
    return (
      <div className="flex items-center text-secondary-text justify-center h-full">
        Escolha uma simulação
      </div>
    )
  }

  switch (simulation) {

    case "mru-mruv":
      return (
        <MruMruvVisualizer
          params={params}
          playing={playing}
          elapsedTime={elapsedTime}
        />
      )

    case "plano-inclinado":
      return (
        <PlanoInclinadoVisualizer
          params={params}
          playing={playing}
          elapsedTime={elapsedTime}
        />
      )

    case "mhs":
      return (
        <MHSVisualizer
          params={params}
          playing={playing}
          elapsedTime={elapsedTime}
        />
      )

    case "espelho":
      return (
        <EspelhoVisualizer
          params={params}
          playing={playing}
          elapsedTime={elapsedTime}
        />
      )

    case "campo-eletrico":
      return (
        <CampoEletricoVisualizer
          params={params}
          playing={playing}
          elapsedTime={elapsedTime}
        />
      )

    case "circuito-rc":
      return (
        <CircuitoRCVisualizer
          params={params}
          playing={playing}
          elapsedTime={elapsedTime}
        />
      )

    case "conducao-calor":
      return (
        <ConducaoCalorVisualizer
          params={params}
          playing={playing}
          elapsedTime={elapsedTime}
        />
      )

    default:
      return null
  }
}