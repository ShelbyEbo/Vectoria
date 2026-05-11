export default function NavBar()
{
    return (
        <nav className="fixed bg-navbar">
            <div className="flex">
                <div>
                    <h1>Vectoria logo</h1>
                </div>
                <div className="gap-4">
                    <a>Sobre</a>
                    <a>Motivação</a>
                    <a>Temas</a>
                    <a>Experimentar</a>
                    <a>Contribua</a>
                </div>
            </div>
        </nav>
    )
}