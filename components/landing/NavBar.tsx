"use client"

import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function NavBar()
{
    const [isDark, setDarkTheme] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
        localStorage.setItem('theme', isDark ? 'light': 'dark');
    }, [isDark]);
    return (
        <nav className="fixed top-4 shadow-card left-1/2 -translate-x-1/2 rounded-full p-5 flex items-center gap-10 bg-navbar text-white">
            <div className="px-8">
                <h1>Vectoria logo</h1>
            </div>
            <div className="flex gap-4">
                <a href="#about">Sobre</a>
                <a href="#motivation">Motivação</a>
                <a href="#topics">Temas</a>
                <a href="#experiment">Experimentar</a>
                <a href="#contribute">Contribua</a>
            </div>
            <div className="flex gap-4">
                <Link href="/app" className="bg-button shadow-btn hover:shadow-btn-active text-main-text px-4 py-1 text-center rounded-lg items-center inline-flex justify-center">
                    Acessar
                </Link>
                <button className="bg-button shadow-btn rounded-full text-main-text text-center px-2 py-2 hover:shadow-btn-active" onClick={() => setDarkTheme(prev => !prev)}>
                    {isDark ? <Moon /> : <Sun />}
                </button>
            </div>
        </nav>
    )
}