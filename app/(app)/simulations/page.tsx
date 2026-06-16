import { FaSearch } from "react-icons/fa";

export default function Simulations() {
    return (
        <div>
            <div className="fixed top-6 left-1/2 -translate-x-1/3 w-full max-w-5xl px-2 z-50">
                <div className="bg-navbar rounded-full p-3 shadow-lg">
                    <input
                        type="search"
                        placeholder="Pesquisar simulações"
                        className="
                            w-full
                            bg-input
                            text-main-text
                            px-6
                            py-4
                            rounded-full
                            outline-none
                        "
                    />
                </div>
            </div>
        </div>
    )
}