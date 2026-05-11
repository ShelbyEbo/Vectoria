import Link from "next/link";

export default function NavBar()
{
    return (
        <nav className="fixed rounded-full p-6 flex gap-10 bg-navbar text-white">
            <div className="">
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
                <Link href="/app" className="bg-button shadow-btn hover:shadow-btn-active text-white px-4 py-2 rounded-lg">
                    Acessar
                </Link>
            </div>
        </nav>
    )
}