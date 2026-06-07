type SimulationType = | "campo-eletrico" | "circuito-rc" | "mhs" | "espelho" | "conducao-calor" | "plano-inclinado" | "mru-mruv"

interface Props {
  simulation: SimulationType
  params: any
  onChange: (values: any) => void
}

export default function SimulationControls({
  simulation,
  params,
  onChange
}: Props) {
    if (simulation === "mru-mruv") {
        return (
            <div className="flex flex-col bg-card-hover rounded-lg border-2 border-main-text/5 px-8 py-4 gap-2">

            <label>
                Tipo
                <select
                value={params.tipo}
                onChange={e => onChange({ tipo: e.target.value })}
                >
                <option>MRU</option>
                <option>MRUV</option>
                </select>
            </label>

            <label>
                Posição Inicial (m)
                <input
                type="number"
                value={params.s0}
                onChange={e =>
                    onChange({ s0: Number(e.target.value) })
                }
                className="shadow-input rounded-sm px-4 py-1 border border-2 border-main-text/5"
                />
            </label>

            {
                params.tipo === "MRU"
                ? (
                <label>
                    Velocidade (m/s)
                    <input
                    type="number"
                    value={params.v}
                    onChange={e =>
                        onChange({ v: Number(e.target.value) })
                    }
                    className="shadow-input rounded-sm px-4 py-1 border border-2 border-main-text/5"
                    />
                </label>
                )
                : (
                <>
                    <label>
                    Velocidade Inicial
                    <input
                        type="number"
                        value={params.v0}
                        onChange={e =>
                        onChange({ v0: Number(e.target.value) })
                        }
                    className="shadow-input rounded-sm px-4 py-1 border border-2 border-main-text/5"
                    />
                    </label>

                    <label>
                    Aceleração
                    <input
                        type="number"
                        value={params.a}
                        onChange={e =>
                        onChange({ a: Number(e.target.value) })
                        }
                        className="shadow-input rounded-sm px-4 py-1 border border-2 border-main-text/5"
                    />
                    </label>
                </>
                )
            }

            <label>
                Duração (s)
                <input
                type="number"
                value={params.duracao}
                onChange={e =>
                    onChange({ duracao: Number(e.target.value) })
                }
                className="shadow-input rounded-sm px-4 py-1 border border-2 border-main-text/5"
                />
            </label>

            </div>
        )
        }
    if (simulation === "plano-inclinado") {
        return (
            <div className="flex flex-col bg-card-hover rounded-lg border-2 border-main-text/5 px-8 py-4 gap-2">

            <label>
                Massa (kg)
                <input
                type="number"
                value={params.massa}
                onChange={e =>
                    onChange({ massa: Number(e.target.value) })
                }
                className="shadow-input rounded-sm px-4 py-1 border border-2 border-main-text/5"
                />
            </label>

            <label>
                Ângulo (°)
                <input
                type="number"
                value={params.angulo}
                onChange={e =>
                    onChange({ angulo: Number(e.target.value) })
                }
                className="shadow-input rounded-sm px-4 py-1 border border-2 border-main-text/5"
                />
            </label>

            <label>
                μ Estático
                <input
                type="number"
                step="0.01"
                value={params.muEstatico}
                onChange={e =>
                    onChange({
                    muEstatico: Number(e.target.value)
                    })
                }
                className="shadow-input rounded-sm px-4 py-1 border border-2 border-main-text/5"
                />
            </label>

            <label>
                μ Cinético
                <input
                type="number"
                step="0.01"
                value={params.muCinetico}
                onChange={e =>
                    onChange({
                    muCinetico: Number(e.target.value)
                    })
                }
                className="shadow-input rounded-sm px-4 py-1 border border-2 border-main-text/5"
                />
            </label>

            </div>
        )
        }
    if (simulation === "campo-eletrico") {
        return (
            <div className="flex flex-col bg-card-hover rounded-lg border-2 border-main-text/5 px-8 py-4 gap-2">

            <label>
                Carga Q1 (C)
                <input
                type="number"
                step="0.000001"
                value={params.q1}
                onChange={e =>
                    onChange({ q1: Number(e.target.value) })
                }
                className="shadow-input rounded-sm px-4 py-1 border border-2 border-main-text/5"
                />
            </label>

            <label>
                Carga Q2 (C)
                <input
                type="number"
                step="0.000001"
                value={params.q2}
                onChange={e =>
                    onChange({ q2: Number(e.target.value) })
                }
                className="shadow-input rounded-sm px-4 py-1 border border-2 border-main-text/5"
                />
            </label>

            <label>
                Distância (m)
                <input
                type="number"
                value={params.r}
                onChange={e =>
                    onChange({ r: Number(e.target.value) })
                }
                className="shadow-input rounded-sm px-4 py-1 border border-2 border-main-text/5"
                />
            </label>

            </div>
        )
        }
    if (simulation === "circuito-rc") {
        return (
            <div className="flex flex-col bg-card-hover rounded-lg border-2 border-main-text/5 px-8 py-4 gap-2">

            <label>
                Tensão Inicial (V)
                <input
                type="number"
                value={params.v0}
                onChange={e =>
                    onChange({ v0: Number(e.target.value) })
                }
                className="shadow-input rounded-sm px-4 py-1 border border-2 border-main-text/5"
                />
            </label>

            <label>
                Resistência (Ω)
                <input
                type="number"
                value={params.r}
                onChange={e =>
                    onChange({ r: Number(e.target.value) })
                }
                className="shadow-input rounded-sm px-4 py-1 border border-2 border-main-text/5"
                />
            </label>

            <label>
                Capacitância (F)
                <input
                type="number"
                step="0.0001"
                value={params.c}
                onChange={e =>
                    onChange({ c: Number(e.target.value) })
                }
                className="shadow-input rounded-sm px-4 py-1 border border-2 border-main-text/5"
                />
            </label>

            <label>
                Modo
                <select
                value={params.modo}
                onChange={e =>
                    onChange({ modo: e.target.value })
                }
                >
                <option value="carga">Carga</option>
                <option value="descarga">Descarga</option>
                </select>
            </label>

            <label>
                Duração
                <input
                type="number"
                value={params.duracao}
                onChange={e =>
                    onChange({ duracao: Number(e.target.value) })
                }
                className="shadow-input rounded-sm px-4 py-1 border border-2 border-main-text/5"
                />
            </label>

            </div>
        )
        }
    if (simulation === "espelho") {
        return (
            <div className="flex flex-col bg-card-hover rounded-lg border-2 border-main-text/5 px-8 py-4 gap-2">

            <label>
                Tipo
                <select
                value={params.tipo}
                onChange={e =>
                    onChange({ tipo: e.target.value })
                }
                >
                <option value="concavo">Côncavo</option>
                <option value="convexo">Convexo</option>
                </select>
            </label>

            <label>
                Distância Focal
                <input
                type="number"
                value={params.f}
                onChange={e =>
                    onChange({ f: Number(e.target.value) })
                }
                className="shadow-input rounded-sm px-4 py-1 border border-2 border-main-text/5"
                />
            </label>

            <label>
                Altura do Objeto
                <input
                type="number"
                value={params.ho}
                onChange={e =>
                    onChange({ ho: Number(e.target.value) })
                }
                className="shadow-input rounded-sm px-4 py-1 border border-2 border-main-text/5"
                />
            </label>

            <label>
                Distância do Objeto
                <input
                type="number"
                value={params.do}
                onChange={e =>
                    onChange({ do: Number(e.target.value) })
                }
                className="shadow-input rounded-sm px-4 py-1 border border-2 border-main-text/5"
                />
            </label>

            </div>
        )
    }
    if (simulation === "mhs") {
        return (
            <div className="flex flex-col bg-card-hover rounded-lg border-2 border-main-text/5 px-8 py-4 gap-2">

            <label>
                Amplitude (m)
                <input
                type="number"
                value={params.a}
                onChange={e =>
                    onChange({ a: Number(e.target.value) })
                }
                className="shadow-input rounded-sm px-4 py-1 border border-2 border-main-text/5"
                />
            </label>

            <label>
                Fase Inicial (rad)
                <input
                type="number"
                value={params.phi}
                onChange={e =>
                    onChange({ phi: Number(e.target.value) })
                }
                className="shadow-input rounded-sm px-4 py-1 border border-2 border-main-text/5"
                />
            </label>

            <label>
                Tempo
                <input
                type="number"
                value={params.t}
                onChange={e =>
                    onChange({ t: Number(e.target.value) })
                }
                className="shadow-input rounded-sm px-4 py-1 border border-2 border-main-text/5"
                />
            </label>

            <label>
                Duração
                <input
                type="number"
                value={params.duracao}
                onChange={e =>
                    onChange({ duracao: Number(e.target.value) })
                }
                className="shadow-input rounded-sm px-4 py-1 border border-2 border-main-text/5"
                />
            </label>

            </div>
        )
    }
    if (simulation === "conducao-calor") {
        return (
            <div className="flex flex-col bg-card-hover rounded-lg border-2 border-main-text/5 px-8 py-4 gap-2">

            <label>
                Material
                <select
                value={params.material}
                onChange={e =>
                    onChange({ material: e.target.value })
                }
                >
                <option value="cobre">Cobre</option>
                <option value="aluminio">Alumínio</option>
                <option value="ferro">Ferro</option>
                </select>
            </label>

            <label>
                Temperatura Quente (°C)
                <input
                type="number"
                value={params.t1}
                onChange={e =>
                    onChange({ t1: Number(e.target.value) })
                }
                className="shadow-input rounded-sm px-4 py-1 border border-2 border-main-text/5"
                />
            </label>

            <label>
                Temperatura Fria (°C)
                <input
                type="number"
                value={params.t2}
                onChange={e =>
                    onChange({ t2: Number(e.target.value) })
                }
                className="shadow-input rounded-sm px-4 py-1 border border-2 border-main-text/5"
                />
            </label>

            <label>
                Área (m²)
                <input
                type="number"
                value={params.area}
                onChange={e =>
                    onChange({ area: Number(e.target.value) })
                }
                className="shadow-input rounded-sm px-4 py-1 border border-2 border-main-text/5"
                />
            </label>

            <label>
                Espessura (m)
                <input
                type="number"
                value={params.espessura}
                onChange={e =>
                    onChange({ espessura: Number(e.target.value) })
                }
                className="shadow-input rounded-sm px-4 py-1 border border-2 border-main-text/5"
                />
            </label>

            </div>
        )
    }
}