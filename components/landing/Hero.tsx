import Link from "next/link";
import AnoAI from "@/components/ui/animated-shader-background";
import { motion } from "framer-motion"

export default function Hero()
{
    return (
        <section className="relative overflow-hidden">
          <div className="flex flex-col h-screen items-center text-center justify-center gap-8 px-4 md:px-12">
            <div className="absolute inset-0 bg-background/30 z-0 pointer-events-none">
              <AnoAI />
            </div>
            <div className="flex flex-col gap-6 md:gap-10 z-10 relative justify-center items-center max-w-4xl">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-main-text">
                Quando o laboratório não chega, a simulação chega
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="text-base md:text-lg">
                Bem-vindo(a) ao Vectoria. Uma plataforma com gravidade
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} whileHover={{ color: "var(--color-button-hover)", scale: 1.15 }} >
                <Link
                  href="/tabs"
                  className="bg-button text-btn-text font-medium shadow-btn hover:shadow-btn-active rounded-md py-3 px-6 md:px-8 w-full sm:w-auto"
                >
                  Quebrar as leis da física
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
    );
}
