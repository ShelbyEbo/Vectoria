"use client"
import React, { useEffect, useState } from "react"
import { Home, ImagePlay, CircleUser, Settings, FlaskConical, LucideIcon, LogOut, Wrench } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

const iconMap: Record<string, LucideIcon> = {
 Home, ImagePlay, CircleUser, Settings, FlaskConical
};
export default function SideBar()
{
    type tab = {
        name: string,
        href: string,
        icon: any
    }
    const tabs: tab[] = [
        { name: "Home", href: "/home", icon: "Home" },
        { name: "Simulações", href: "/simulations", icon: "FlaskConical" },
        { name: "Prática", href: "/training", icon: "Wrench" },
        { name: "Memes", href: "/memes", icon: "ImagePlay"  },
        { name: "Configurações", href: "/settings", icon: "Settings" },
        { name: "Perfil", href: "/profile", icon: "CircleUser" },
    ]; 
    return (
        <div className="fixed flex flex-col bg-card h-screen rounded-tr-3xl rounded-br-3xl px-4">
            <div className="py-12">
                {
                    tabs.map(tabb => {
                        const Icon = iconMap[tabb.icon];
                        return (
                            <div key={tabb.name} className="justify-center gap-2">
                                <Link href={tabb.href} className="flex gap-4 py-2 hover:bg-card-hover rounded-md px-8">
                                    <Icon size={20}/>
                                    <h1 className="text-md">{tabb.name}</h1>
                                </Link>
                            </div>
                        );
                    })
                }
            </div>
            <div className="mt-auto mb-10">
                <div className="flex gap-4">
                    <select className="bg-button-hover rounded-md">
                        <option value="en">English</option>
                        <option value="pt">Português</option>
                    </select>
                    <div className="bg-button-hover shadow-button-hover rounded-xl">

                    </div>
                </div>
                    <Link href="/" className="flex gap-4 hover:bg-card-hover py-2 px-8 rounded-md">
                        <LogOut className="text-error" size={20}/>
                        <h1 className="text-md">Sair</h1>
                    </Link>
            </div>
        </div>
    )
}