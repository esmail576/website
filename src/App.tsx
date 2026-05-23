import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { OverviewSection } from "@/components/OverviewSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { SolutionSection } from "@/components/SolutionSection";
import { ScreensSection } from "@/components/ScreensSection";
import { TechStackSection } from "@/components/TechStackSection";
import { AIArchitectureSection } from "@/components/AIArchitectureSection";
import { ScreenshotsSection } from "@/components/ScreenshotsSection";
import { MadeBySection } from "@/components/MadeBySection";
import { ContactFormSection } from "@/components/ContactFormSection";
import { PreFooterCTASection } from "@/components/PreFooterCTASection";
import { ContactSection } from "@/components/ContactSection";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="overflow-x-clip bg-background">
        <HeroSection />
        <OverviewSection />
        <FeaturesSection />
        <SolutionSection />
        <ScreenshotsSection />
        <ScreensSection />
        <TechStackSection />
        <AIArchitectureSection />
        <MadeBySection />
        <ContactFormSection />
        <PreFooterCTASection />
        <ContactSection />
      </main>
    </div>
  );
}
