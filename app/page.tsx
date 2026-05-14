import NavBar from "@/components/landing/NavBar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main>
        <Hero />
        <About />
      </main>
    </div>
  );
}
