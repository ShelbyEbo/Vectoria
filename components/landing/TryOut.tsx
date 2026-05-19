export default function TryOut()
{
    return (
        <div id="experiment" className="min-h-screen relative">
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-4xl font-bold">Demo</h1>
                    <h2 className="text-xl">Esta é uma versão demo sobre a magia do teu novo laboratório</h2>
                </div>
                <div className="p-20">
                    <div className="bg-card relative flex flex-col px-12 py-8 mt-10 rounded-lg shadow-card gap-4">
                        {/* Tela/Monitor */}
                        <div className="flex flex-col gap-2">
                            <h3 className="text-lg font-semibold">Simulador</h3>
                            <div className="bg-card-hover border-2 border-main-text rounded-lg p-6 w-full aspect-auto flex items-center justify-center relative overflow-hidden">
                                {/* Canvas/Simulação vai aqui */}
                                <div className="text-secondary-text text-center">
                                    <p>Simulação carregará aqui</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Controles */}
                        <div className="flex gap-4 justify-center">
                            <button className="bg-button text-main-text px-6 py-2 rounded-lg shadow-btn hover:shadow-btn-active">
                                Play
                            </button>
                            <button className="bg-button text-main-text px-6 py-2 rounded-lg shadow-btn hover:shadow-btn-active">
                                Pausar
                            </button>
                            <button className="bg-button text-main-text px-6 py-2 rounded-lg shadow-btn hover:shadow-btn-active">
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    );
}