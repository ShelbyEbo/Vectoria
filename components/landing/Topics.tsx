import React from "react";

import { Bolt, Atom, AudioWaveform, ScanEye, Flame, LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion"

const iconMap: Record<string, LucideIcon> = {
  Bolt, Atom, AudioWaveform, ScanEye, Flame,
};

function Themes({ topics } : { topics: string[] })
{
    return (
        <div>
        {
            topics.map((t, index) => (
                <div key={index} className="flex gap-2 px-8 py-2">
                    <h1>─</h1>
                    <h1>{t}</h1>
                </div>
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
        <div id="topics" className="min-h-screen relative">
            <div className="flex flex-col py-16 px-8 gap-6">
                <div className="flex justify-center">
                    <h1 className="text-4xl font-bold">Esta plataforma pode simular os tópicos físicos em</h1>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-6 px-48 py-8 auto-rows-fr">
                    {
                        topics.map((topic) => {
                            const Icon = iconMap[topic.icon];
                            return (
                                <div key={topic.id} className="bg-card rounded-xl h-full flex flex-col shadow-card gap-3">
                                    <div className="flex gap-6">
                                        <div className="bg-card-hover px-8 rounded-tl-lg rounded-br-3xl py-8">
                                            <Icon color={topic.color} size={24} />
                                        </div>
                                        <div className="py-8">
                                            <h3 className="text-2xl font-black">{topic.name}</h3>
                                        </div>
                                    </div>
                                    <Themes topics={topic.subtopics}/>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}