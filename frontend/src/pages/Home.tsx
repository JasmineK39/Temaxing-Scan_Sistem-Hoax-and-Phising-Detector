import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustSection } from "@/components/TrustSection";
import { FeatureSection } from "@/components/FeatureSection";
import { HowItWorks } from "@/components/HowItWorks";
import { ExampleReport } from "@/components/ExampleReport";
import { WhyChoose } from "@/components/WhyChoose";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <TrustSection />
        <FeatureSection />
        <HowItWorks />
        <ExampleReport />
        <WhyChoose />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}