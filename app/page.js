// app/page.js (SERVER)
import HeroSection from "./HeroSection";
import dynamic from "next/dynamic";
// Contenu SEO (Server Components)
import AboutContent from "./sections/about/AboutUsContent";
import PricingContent from "./sections/pricing/PricingContent";
import FooterContent from "./sections/footer/FooterContent";
import SectionTeamAndContact from "./TeamContact";

// Animations (Client Components - chargés dynamiquement)
const AboutAnimation = dynamic(
  () => import("./sections/about/AboutUsAnimation"),
);
const ProjectsContent = dynamic(
  () => import("./sections/projects/ProjectsContent"),
);
const InteractionContent = dynamic(
  () => import("./sections/interaction/InteractionContent"),
);

export default function Home() {
  return (
    <main id="main-content" className="bg-[#F5F3EF]">
      <HeroSection />
      {/* About Us */}
      <section
        id="about_section"
        className="text-[#0f0f0f] h-full p-4 bg-[#F5F3EF] relative"
      >
        <AboutContent />
        <AboutAnimation />
      </section>

      {/* Projects */}
      <section
        id="project_section"
        className="h-full bg-[#F5F3EF] p-2 sm:p-4 flex flex-col"
      >
        <ProjectsContent />
      </section>

      <SectionTeamAndContact />

      {/* Interaction/Discover */}
      <section id="interaction_section">
        <InteractionContent />
      </section>

      {/* Pricing */}
      <section
        id="pricing_section"
        className="bg-[#F5F3EF] text-[#0f0f0f] h-[110vh] flex relative items-center justify-center"
      >
        <PricingContent />
      </section>

      {/* Footer */}
      <section
        id="footer_section"
        className="sm:h-full h-full bg-[#F5F3EF] pr-4 pl-4 pt-4 relative w-full"
      >
        <FooterContent />
      </section>
    </main>
  );
}
