import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import SectionDoodles from "@/components/SectionDoodles";
import Work from "@/components/Work";
import Writing from "@/components/Writing";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SectionDoodles />
        <Work />
        <About />
        <Writing />
        <Contact />
      </main>
    </>
  );
}
