import { Play, RotateCw, Square, Pause } from "lucide-react"

export default function TryOut() {
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

            <div className="w-full md:w-auto">
              <label htmlFor="topic" className="sr-only">Escolhe um fenômeno</label>
              <select
                id="topic"
                defaultValue={""}
                className="px-3 py-2 w-full md:w-64 bg-card-hover shadow-input outline-none border border-main-text/10 rounded-sm text-sm md:text-base"
              >
                <option value="" disabled>
                  Escolhe um fenômeno
                </option>
                <option value="Eletromagnetismo">Eletromagnetismo</option>
                <option value="Mecânica">Mecânica</option>
                <option value="Ondas">Ondas</option>
                <option value="Óptica">Óptica</option>
                <option value="Termodinâmica">Termodinâmica</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="bg-card-hover border-2 border-main-text/5 rounded-lg p-4 md:p-6 w-full h-64 sm:h-76 md:h-100 lg:h-[34rem] flex items-center justify-center relative overflow-hidden">
              <div className="text-secondary-text text-center px-2 text-sm md:text-base">
                <p>Simulação carregará aqui</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-2">
            <button
              aria-label="Play"
              title="Play"
              className="bg-button text-main-text w-full sm:w-auto px-4 py-4 rounded-full shadow-btn hover:shadow-btn-active flex items-center justify-center"
            >
              <Play className="text-success w-5 h-5" />
              <span className="sr-only">Play</span>
            </button>

            <button
              aria-label="Reset"
              title="Reset"
              className="bg-button text-main-text w-full sm:w-auto px-4 py-4 rounded-full shadow-btn hover:shadow-btn-active flex items-center justify-center"
            >
              <RotateCw className="text-warning w-5 h-5" />
              <span className="sr-only">Reset</span>
            </button>

            <button
              aria-label="Stop"
              title="Stop"
              className="bg-button text-main-text w-full sm:w-auto px-4 py-4 rounded-full shadow-btn hover:shadow-btn-active flex items-center justify-center"
            >
              <Square className="text-error w-5 h-5" />
              <span className="sr-only">Stop</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
