import Image from "next/image";
import AtomTumbleweed from "@/components/ui/animated-atom-bouncing";
import { motion } from "framer-motion";

export default function About()
{
    return (
        <section id="about" className="relative px-4 md:px-20 py-12 md:py-16">
            <div className="flex justify-center md:justify-start mb-8">
                <h1 className="text-2xl md:text-4xl font-bold">Sobre o Vectoria</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                <div className="w-full">
                    <Image alt="about" src="/about.jpg" className="rounded-xl w-full h-auto" width={800} height={600} priority />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <motion.div whileHover={{ scale: 1.05, rotateZ: 10 }} className="flex flex-col border border-2 shadow-card border-card hover:bg-card-hover px-6 md:px-10 py-4 rounded-md">
                        <h6>Criado em 2026 por</h6>
                        <h6 className="font-black">Melzira Ebo</h6>
                        <h6>
                          com o objectivo de passar aos jovens estudantes uma experiência totalmente visual com a física experimental
                        </h6>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05, rotateZ: 10 }} className="flex flex-col border border-2 shadow-card border-card hover:bg-card-hover px-6 md:px-10 py-4 rounded-md">
                        <h6>Muitos estudantes aprendem física apenas no papel.</h6>
                        <h6>
                          Criamos uma plataforma onde é possível visualizar os fenômenos mesmo sem acesso a laboratórios físicos
                        </h6>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05, rotateZ: 10 }} className="flex flex-col border border-2 shadow-card border-card hover:bg-card-hover px-6 md:px-10 py-4 rounded-md sm:col-span-2">
                        <h6>Uma plataforma de simulações interativas de fenômenos físicos</h6>
                        <h6>para todos explorarem movimento, forças, energia e colisões de forma visual.</h6>
                    </motion.div>
                    <div className="sm:col-span-2">
                        <AtomTumbleweed />
                    </div>
                </div>
            </div>            
        </section>
    );
}
