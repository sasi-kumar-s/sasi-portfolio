import { ScrollyCanvas } from "../components/ScrollyCanvas";
import { Projects } from "../components/Projects";
import { Contact } from "../components/Contact";
import { Skills } from "../components/Skills";

export const metadata = {
  title: "Sasi Kumar - Creative Developer & ML Engineer",
  description: "A high-end scrollytelling personal portfolio.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] font-sans selection:bg-white/30 selection:text-white">
        <ScrollyCanvas />
        <Skills />
        <Projects />
        <Contact />
    </main>
  );
}
