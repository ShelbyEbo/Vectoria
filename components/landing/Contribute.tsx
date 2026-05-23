import CyberneticGridShader from "../ui/cybernetic-grid-shader";

export default function Contribute()
{
    return (
        <div id="contribute" className="min-h-screen relative overflow-hidden">
            <CyberneticGridShader />
            <div className="relative inset-0 z-10 flex flex-col items-center gap-4 px-6 py-12">
                <h1 className="text-4xl font-bold">Contribua</h1>
                <p className="text-xl">Este projecto é open source</p>
                <p className="text-lg text-center">Então podes sempre dar o teu contributo para que chegue com melhor qualidade a todos os estudantes!!</p>
            </div>
            <div className="relative flex flex-col items-center justify-center gap-4 p-8">
                <p>© 2026 Melzira Ebo</p>
            </div>
        </div>
    );
}