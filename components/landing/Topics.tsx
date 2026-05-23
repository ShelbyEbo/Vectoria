import { Bolt, Atom, AudioWaveform, ScanEye, Flame, LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion"

const iconMap: Record<string, LucideIcon> = {
  Bolt, Atom, AudioWaveform, ScanEye, Flame,
};
export default function Topics()
{
    type Topic = {
        id: number;
        name: string;
        icon: string;
        color: string;
    };
    const topics: Topic[] = [
        { id: 1, name: "Eletromagnetismo", icon: "Bolt", color: "#BA7517"}, 
        { id: 2, name: "Mecânica", icon: "Atom", color: "#534AB7" }, 
        { id: 3, name: "Ondas", icon: "AudioWaveform", color: "#0F6E56" }, 
        { id: 4, name: "Óptica", icon: "ScanEye", color: "#185FA5" }, 
        { id: 5, name: "Termodinâmica", icon: "Flame", color: "#993C1D" }

    ];
    return (
        <div id="topics" className="min-h-screen relative">
            <div className="flex flex-col py-16 px-8 gap-6">
                <div className="flex justify-center">
                    <h1 className="text-4xl font-bold">Esta plataforma pode simular os tópicos físicos em</h1>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-6 px-48 py-6">
                    {
                        topics.map((topic) => {
                            const Icon = iconMap[topic.icon];
                            return (
                                <div key={topic.id} className="bg-card rounded-xl shadow-card p-4 px-16 py-32 items-start flex gap-3">
                                    <div className="bg-white flex justify-center items-center">
                                        <Icon color={topic.color} size={24} />
                                    </div>
                                    <h3 className="text-2xl font-black">{topic.name}</h3>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}