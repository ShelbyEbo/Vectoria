import Link from "next/link";
import AnoAI from "@/components/ui/animated-shader-background";
import { motion } from "framer-motion"

export default function Hero()
{
    return (
        <section className="relative min-h-screen overflow-hidden">
          <div className="flex flex-col min-h-screen items-center text-center justify-center gap-8 px-4 md:px-12">
            <div className="absolute inset-0 bg-background/30 z-0 pointer-events-none">
              <AnoAI />
            </div>
            <div className="flex flex-col gap-6 md:gap-10 z-10 relative justify-center items-center max-w-4xl">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-main-text">
                Onde o laboratório não chega, a simulação chega
              </h1>
              <motion.p className="text-base md:text-lg">
                Bem-vindo(a) ao Vectoria. Uma plataforma com gravidade
              </motion.p>
              <Link
                href="/tabs"
                className="bg-button text-main-text shadow-btn hover:shadow-btn-active rounded-md py-3 px-6 md:px-8 w-full sm:w-auto"
              >
                Entrar no laboratório
              </Link>
            </div>
          </div>
        </section>
    );
}
