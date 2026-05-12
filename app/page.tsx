import NavBar from "@/components/landing/NavBar";
import Hero from "@/components/landing/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main>
        <Hero />
      </main>
    </div>
  );
}
