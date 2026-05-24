import Link from "next/link";
import AnoAI from "@/components/ui/animated-shader-background";
import { AnimatePresence, motion } from "framer-motion"

export default function Hero()
{
    return (
        <div className="relative min-h-screen overflow-hidden">
          <div className="flex flex-col min-h-screen items-center text-center justify-center gap-8">
            <div className="absolute inset-0 bg-background/30 z-0 pointer-events-none">
              <AnoAI />
            </div>
            <div className="flex flex-col gap-10 z-10 relative justify-center items-center">
              <h1 className="text-6xl font-extrabold text-main-text">Onde o laboratório não chega, a simulação chega</h1>
              <motion.p>Bem-vindo(a) ao Vectoria. Uma plataforma com gravidade</motion.p>
              <Link href="/tabs" className="bg-button text-main-text shadow-btn hover:shadow-btn-active rounded-md py-2 px-8 p-8 w-1/4">
                Entrar no laboratório
              </Link>
            </div>
          </div>
        </div>
    );
}