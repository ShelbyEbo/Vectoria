"use client"
import React, { useEffect, useState } from "react"
import { Home, ImagePlay, CircleUser, Settings, FlaskConical, LucideIcon, LogOut, Wrench, ArrowUp, ArrowDown, ArrowLeft, Moon, Sun, ArrowRight } from "lucide-react"
import { usePathname } from "next/navigation"
import 'flag-icons/css/flag-icons.min.css';
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const iconMap: Record<string, LucideIcon> = {
 Home, ImagePlay, CircleUser, Settings, FlaskConical, Wrench
};
export default function SideBar()
{
    const [open, setOpen] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [opcaoSelecionada, setOpcaoSelecionada] = useState("Português")
    const [flag, setFlag] = useState("fi-pt")
    const pathname = usePathname();
    const [isDark, setDarkTheme] = useState(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem('theme');
            if (saved) {
                setDarkTheme(saved === 'dark');
            } else if (window.matchMedia) {
                setDarkTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
            }
        } catch (e) {
            // localStorage may be unavailable in some environments
        }
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
        try {
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        } catch (e) {
            // ignore write errors
        }
    }, [isDark]);
    type tab = {
        name: string,
        href: string,
        icon: any
    }
    type language = {
        title: string,
        flag: string
    }
    const tabs: tab[] = [
        { name: "Home", href: "/home", icon: "Home" },
        { name: "Simulações", href: "/simulations", icon: "FlaskConical" },
        { name: "Prática", href: "/training", icon: "Wrench" },
        { name: "Memes", href: "/memes", icon: "ImagePlay"  },
        { name: "Configurações", href: "/settings", icon: "Settings" },
        { name: "Perfil", href: "/profile", icon: "CircleUser" },
    ];
    const languages: language[] = [
        {title: "Português", flag: "fi-pt"},
        {title: "English", flag: "fi-en"},
    ]
    return (
        <div className="flex gap-20">
            <motion.div
                animate={{ width: open ? 256 : 80 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex flex-col bg-card h-screen rounded-tr-3xl rounded-br-3xl px-4 overflow-hidden"
            >  
              <div className="py-12">
                    {
                        tabs.map(tabb => {
                            const Icon = iconMap[tabb.icon];
                            const isActive = pathname === tabb.href;
                            return (
                                <div key={tabb.name} className="justify-center gap-2">
                                    <Link href={tabb.href} className={`flex items-center gap-4 py-2 rounded-md px-4 ${open ? "justify-start" : "justify-center"} ${isActive ? "bg-btn-ghost-text text-btn-text shadow-button" : "hover:bg-card-hover"}`}>
                                        <Icon size={20}/>
                                        <motion.h1
                                            animate={{ opacity: open ? 1 : 0, width: open ? "auto" : 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="text-md whitespace-nowrap overflow-hidden"
                                        >
                                            {tabb.name}
                                        </motion.h1>                                    
                                    </Link>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="mt-auto mb-12 flex flex-col gap-4 items-center">                    
                    <div className="flex gap-6">
                    <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-center bg-card-hover shadow-btn px-3 py-2 rounded-md">
                        <span className={flag}></span>
                        {open && (<span className="ml-2">{opcaoSelecionada}</span>)}
                    </button>                            
                    <AnimatePresence>
                                {isOpen && (
                                <motion.ul
                                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                                    transition={{ duration: 0.18, ease: "easeOut" }}
                                    className="absolute left-0 bottom-42 z-[9999] mt-2 w-1/2 rounded-md border border-second-text bg-card-hover p-4 shadow-xl"
                                >
                                    {languages.map((opcao, index) => (
                                    <div key={index} className="flex">
                                        <span className={opcao.flag}></span>
                                        <li key={index} onClick={() => {setOpcaoSelecionada(opcao.title); setFlag(opcao.flag); setIsOpen(false);}} className="px-3 py-2 cursor-pointer hover:bg-card/70 rounded-md">
                                            {opcao.title}
                                        </li>
                                    </div>
                                    ))}
                                </motion.ul>
                                )}
                    </AnimatePresence>
                    <div className="flex">
                        <button className="bg-button shadow-btn rounded-full p-3" onClick={() => setDarkTheme(prev => !prev)}>
                            {isDark ? <Moon /> : <Sun />}
                        </button>
                    </div>
                </div>
                    <Link href="/" className="flex gap-4 hover:bg-card-hover py-2 px-8 rounded-md">
                        <LogOut className="text-error" size={20}/>
                        <h1 className="text-md">Sair</h1>
                    </Link>
                </div>
            </motion.div>
            <motion.button onClick={() => setOpen(!open)} animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut"}} className="fixed top-6 left-66 z-50 flex justify-center bg-card-hover px-2 py-2 rounded-full cursor-pointer shadow-button shadow-2xl">
                {open === true ? <ArrowLeft size={20}/> : <ArrowRight size={20}/> }
            </motion.button>
        </div>
    )
}