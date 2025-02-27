import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { SecurityFeatures } from "@/components/sections/security-features";
import { AICoachDemo } from "@/components/sections/ai-coach-demo";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background/80 text-foreground">
      <Navbar />
      <Hero />
      <SecurityFeatures />
      <AICoachDemo />
      <Pricing />
      <Testimonials />
      <Footer />
    </main>
  );
}
