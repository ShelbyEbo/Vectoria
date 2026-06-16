import BeginCard from "@/components/app/home/BeginCard";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function HomePage()
{
    return (
        <div className="h-screen">
            <div className="flex flex-col items-center gap-8 text-center">
                <div className="p-8">
                    <h1 className="text-5xl font-bold">
                        Bem-vindo ao Vectoria
                    </h1>
                    <p className="text-secondary-text text-lg font-body mt-3">
                        Explora simulações, experimenta conceitos e acompanha a tua evolução.
                    </p>
                </div>
                <BeginCard />
            </div>
        </div>
    )
}