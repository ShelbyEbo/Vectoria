"use client";

import { useState } from "react"
import { FaGoogle, FaGithub } from "react-icons/fa"

function LoginWithGithub()
{
}

function LoginWithGoogle()
{
}

export default function BeginCard()
{
    const [isLogged, setIsLogged] = useState(false)
    if (isLogged)
    {
        return (
            <div>
                <div>
                    <h1 className="text-2xl">Continua de onde paraste</h1>
                </div>
                <div className="bg-card py-6">

                </div>
            </div>
        )
    }
    return (
        <div>
            <div className="bg-card shadow shadow-card rounded-xl p-8 max-w-2xl">
                <h2 className="text-2xl font-semibold mb-4">
                    Nenhuma força aplicada... ainda.
                </h2>

                <p className="text-secondary-text mb-8">
                    Inicia sessão para guardar experiências, acompanhar o teu progresso e desbloquear funcionalidades futuras.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button className="flex items-center justify-center gap-3 bg-[#6E5494] text-white px-6 py-3 rounded-lg cursor-pointer hover:opacity-90 transition" onClick={() => {LoginWithGithub(); setIsLogged(true);}}>
                        <FaGithub />
                        Continuar com o GitHub
                    </button>

                    <button className="flex items-center justify-center gap-3 bg-white text-black px-6 py-3 rounded-lg cursor-pointer hover:opacity-90 transition"onClick={() => {LoginWithGoogle(); setIsLogged(true);}}>
                        <FaGoogle />
                        Continuar com a Google
                    </button>
                </div>
            </div>
        </div>
    )
}