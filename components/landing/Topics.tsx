import { motion } from "framer-motion";

import { Bolt, Atom, AudioWaveform, ScanEye, Flame, LucideIcon, CircleDot } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Bolt, Atom, AudioWaveform, ScanEye, Flame,
};

function Themes({ topics } : { topics: string[] })
{
    return (
        <div className="pb-4">
        {
            topics.map((t, index) => (
                <motion.div whileHover={{ fontWeight: 'bold', scale: 1.15 }} key={index} className="flex gap-2 px-6 md:px-8 py-1.5 md:py-2 text-sm md:text-base cursor-pointer">
                    <CircleDot size={8} className="text-main-text mt-2" />
                    <span>{t}</span>
                </motion.div>
            ))
        }
        </div>
    )
}

export default function Topics()
{
    type Topic = {
        id: number;
        name: string;
        icon: string;
        color: string;
        subtopics: string[]
    };

    const topics: Topic[] = [
        { id: 1, name: "Eletromagnetismo", icon: "Bolt", color: "#BA7517", subtopics: ["Campo Magnético", "Circuito RC", "Campo Elétrico", "Coulomb", "Potencial Elétrico"]}, 
        { id: 2, name: "Mecânica", icon: "Atom", color: "#534AB7", subtopics: ["MRU & MRUV", "Projécteis", "Queda Livre", "Colisões", "Plano Inclinado"] }, 
        { id: 3, name: "Ondas", icon: "AudioWaveform", color: "#0F6E56", subtopics: ["Interferência", "Onda Transversal", "MHS", "Pêndulo"] }, 
        { id: 4, name: "Óptica", icon: "ScanEye", color: "#185FA5", subtopics: ["Espelho", "Lente Delgada", "Refração"] }, 
        { id: 5, name: "Termodinâmica", icon: "Flame", color: "#993C1D", subtopics: ["Gás Ideal", "Expansão", "Condução de Calor"] }
    ];

    return (
        <section id="topics" className="min-h-screen relative px-4 md:px-20 py-8 md:py-16">
            <div className="flex flex-col gap-8 md:gap-12 max-w-7xl mx-auto">
                <div className="flex justify-center">
                    <h1 className="text-2xl md:text-4xl font-bold text-center">
                      Esta plataforma pode simular os tópicos físicos em
                    </h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10">
                    {
                        topics.map((topic) => {
                            const Icon = iconMap[topic.icon];
                            return (
                                <motion.div key={topic.id} initial={{ y: 0 }} whileHover={{ y: -10 }} className="bg-card hover:bg-card-hover rounded-xl h-full w-full flex flex-col shadow-card gap-6 md:gap-10 p-4 md:p-6">
                                    <div className="flex gap-4 md:gap-6 items-center">
                                        <div className="bg-card-hover px-6 md:px-8 rounded-tl-lg rounded-br-3xl py-4 md:py-8 -mt-6 sm:-mt-8 md:-mt-10 -ml-3 sm:-ml-4 md:-ml-6">
                                            <Icon color={topic.color} size={24} />
                                        </div>
                                        <div className="py-3 md:py-8 pr-4 -mt-1 sm:-mt-2 md:-mt-4">
                                            <h3 className="text-xl md:text-2xl font-black">{topic.name}</h3>
                                        </div>
                                    </div>
                                    <Themes topics={topic.subtopics}/>
                                </motion.div>
                            );
                        })
                    }
                </div>
            </div>
        </section>
    );
}
