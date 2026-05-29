"use client"

import CyberneticGridShader from "../ui/cybernetic-grid-shader";
import { useTheme } from "next-themes";

export default function Contribute()
{
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";
    return (
        <section id="contribute" className="min-h-screen relative overflow-hidden px-4 md:px-20 py-12 md:py-16">
            <CyberneticGridShader />
            <div className="relative inset-0 z-10 flex flex-col items-center gap-3 md:gap-4 text-center max-w-3xl mx-auto">
                <h1 className="text-2xl md:text-4xl font-bold">Contribua</h1>
                <p className="text-base md:text-xl">Este projecto é open source</p>
                <p className="text-sm md:text-lg">
                  Então podes sempre dar o teu contributo para que chegue com melhor qualidade a todos os estudantes!!
                </p>
            </div>
            <div className="relative flex flex-col items-center justify-center gap-4 pt-12">
                <p className="text-sm md:text-base">© 2026 Melzira Ebo</p>
            </div>
        </section>
    );
}
