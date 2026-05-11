import Link from "next/link";

export default function NavBar()
{
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
            <div className="flex">
                <Link href="/app" className="bg-button shadow-btn hover:shadow-btn-active text-white px-4 py-1 text-center rounded-lg">
                    Acessar
                </Link>
            </div>
        </nav>
    )
}