import Link from "next/link";

export default function Hero()
{
    return (
        <div className="bg-card relative p-6 mt-28">
          <div className="flex flex-col items-center text-center justify-center gap-8">
            <h1 className="text-2xl font-extrabold text-main-text">Onde o laboratório não chega, a simulação chega</h1>
            <p>Bem-vindo ao Vectoria</p>
            <Link href="/app" className="bg-button text-main-text shadow-btn hover:shadow-btn-active rounded-md py-2 px-2">
              Abrir laboratório
            </Link>
          </div>
        </div>
    );
}