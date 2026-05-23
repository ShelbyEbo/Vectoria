import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion"

export default function About()
{
    return (
        <div id="about" className="min-h-screen relative">
            <div className="flex py-16 px-8">
                <h1 className="text-4xl font-bold">Sobre o Vectoria</h1>
            </div>
            <div className="flex p-6 gap-16 items-start">
                <Image alt="about" src="/about.jpg" className="rounded-xl" width={800} height={600}/>
                <div className="flex flex-col border border-2 shadow-card border-card hover:bg-card-hover px-10 py-4 self-start rounded-md">
                    <h6>Criado em 2026 por </h6>
                    <h6 className="font-black">Melzira Ebo </h6>
                    <h6>com o objectivo de passar aos jovens estudantes uma experiência totalmente visual com a física experimental</h6>
                </div>
                <div className="flex flex-col border border-2 shadow-card border-card hover:bg-card-hover px-10 py-4 self-center rounded-md">
                    <h6>Muitos estudantes aprendem física apenas no papel.</h6> 
                    <h6>Criamos uma plataforma onde é possível visualizar os fenômenos mesmo sem acesso a laboratórios físicos</h6>
                </div>
                <div className="flex flex-col border border-2 shadow-card border-card hover:bg-card-hover px-10 py-4 self-end rounded-md">
                    <h6>Uma plataofrma de simulações interativas de fenômenos físicos</h6>
                    <h6>para todos explorarem movimento, forças, energia e colisões de forma visual.</h6>
                </div>
            </div>
            <div className="flex p-6 justify-start">
                <div>
                </div>
                <div>
                </div>
                <div>
                </div>
            </div>
        </div>
    );
}
