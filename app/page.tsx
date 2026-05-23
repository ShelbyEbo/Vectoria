"use client";

import NavBar from "@/components/landing/NavBar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Topics from "@/components/landing/Topics";
import TryOut from "@/components/landing/TryOut";
import Contribute from "@/components/landing/Contribute";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main>
        <Hero />
        <About />
        <Topics />
        <TryOut />
        <Contribute />
      </main>
    </div>
  );
}
