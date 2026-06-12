"use client"
import { ExternalLink } from "lucide-react";
import CyberneticGridShader from "../ui/cybernetic-grid-shader";
import { FaDiscord, FaGithub } from "react-icons/fa";

export default function Contribute()
{
    return (
        <section id="contribute" className="min-h-screen flex flex-col relative overflow-hidden px-4 md:px-20 py-12 md:py-16">
            <CyberneticGridShader />
            <div className="relative inset-0 z-10 flex flex-col items-center gap-3 md:gap-4 text-center max-w-3xl mx-auto mt-20">
                <h1 className="text-2xl md:text-4xl font-bold">Contribua</h1>
                <p className="text-base md:text-xl">Este projecto é open source</p>
                <p className="text-sm md:text-lg">
                  Então podes sempre dar o teu contributo para que chegue com melhor qualidade a todos os estudantes!!
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4 pt-10 max-w-5xl mx-auto">
                <div className="p-5 rounded-lg border border-main-text/10 backdrop-blur-sm">
                    <h3 className="font-semibold text-lg">Corrigir erros</h3>
                    <p className="text-sm opacity-80">
                        Encontraste um bug ou erro num conteúdo? Ajuda-nos a melhorar.
                    </p>
                </div>

                <div className="p-5 rounded-lg border border-main-text/10 backdrop-blur-sm">
                    <h3 className="font-semibold text-lg">Adicionar conteúdo</h3>
                    <p className="text-sm opacity-80">
                        Podes contribuir com exercícios, resumos ou explicações.
                    </p>
                </div>

                <div className="p-5 rounded-lg border border-main-text/10 backdrop-blur-sm">
                    <h3 className="font-semibold text-lg">Partilhar</h3>
                    <p className="text-sm opacity-80">
                        Divulga o projecto para mais estudantes.
                    </p>
                </div>
            </div>
            <div className="relative flex items-center justify-center p-2 py-4">
                <a href="https://ig.me/m/shelbot__" target="_blank" className="bg-button px-8 py-3 text-btn-text rounded shadow-btn hover:shadow-btn-active mt-10 flex items-center gap-2">
                    <ExternalLink  size={24} className="text-btn-text"/>
                    Dar Feedback
                </a>
            </div>
            <div className="relative flex flex-wrap items-center justify-center gap-4 pt-2">
                <a href="https://github.com/ShelbyEbo/Vectoria" target="_blank" rel="noopener noreferrer" className="bg-[#6E5494] text-btn-text px-5 py-3 rounded shadow-btn hover:shadow-btn-active mt-10 flex items-center gap-2">
                    <FaGithub className="w-5 h-5" />
                </a>
                <a href="https://discord.gg/h3VYQuVGZC" target="_blank" rel="noopener noreferrer" className="bg-[#5865F2] text-btn-text px-5 py-3 rounded shadow-btn hover:shadow-btn-active mt-10 flex items-center gap-2">
                    <FaDiscord className="w-5 h-5" />
                </a>                
            </div>
            <div className="relative flex flex-col mt-auto z-10 items-center justify-center gap-4 pt-8">
                <p className="text-sm md:text-base">© 2026 Melzira Ebo</p>
            </div>
        </section>
    );
}
