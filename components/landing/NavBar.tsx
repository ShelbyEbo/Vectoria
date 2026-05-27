"use client"

import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function NavBar()
{
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

    return (
        <nav className="fixed top-3 md:top-4 shadow-card left-1/2 -translate-x-1/2 rounded-2xl md:rounded-full px-4 py-3 md:p-5 flex flex-col md:flex-row md:items-center gap-3 md:gap-10 bg-navbar text-white z-50 w-[calc(100%-2rem)] md:w-auto max-w-5xl">
            <div className="px-2 md:px-8 text-center md:text-left">
                <h1 className="text-sm md:text-base">Vectoria logo</h1>
            </div>

            <div className="flex gap-4 text-sm md:text-base overflow-x-auto whitespace-nowrap justify-start md:justify-center w-full md:w-auto px-1">
                <a className="shrink-0" href="#about">Sobre</a>
                <a className="shrink-0" href="#topics">Temas</a>
                <a className="shrink-0" href="#experiment">Experimentar</a>
                <a className="shrink-0" href="#contribute">Contribua</a>
            </div>

            <div className="flex gap-3 md:gap-4 justify-center md:justify-end w-full md:w-auto">
                <Link href="/tabs" className="bg-button shadow-btn hover:shadow-btn-active text-main-text px-4 py-2 md:py-1 text-center rounded-lg items-center inline-flex justify-center w-full md:w-auto">
                    Acessar
                </Link>
                <button className="bg-button shadow-btn rounded-full text-main-text text-center px-3 py-3 hover:shadow-btn-active" onClick={() => setDarkTheme(prev => !prev)}>
                    {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </button>
            </div>
        </nav>
    )
}
