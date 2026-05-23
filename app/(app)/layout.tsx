import SideBar from "@/components/app/Sidebar"
import React from "react"

export default function Routering({ children }: { children: React.ReactNode })
{
    return (
        <div className="min-h-screen h-screen flex">
            <SideBar />
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}