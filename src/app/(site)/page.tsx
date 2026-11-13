import { Hero } from "@/components/sections/Hero";
import { PositioningBar } from "@/components/sections/PositioningBar";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { Services } from "@/components/sections/Services";
import { Segments } from "@/components/sections/Segments";
import { DeviceShowcase } from "@/components/sections/DeviceShowcase";
import { Differentials } from "@/components/sections/Differentials";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Portfolio } from "@/components/sections/Portfolio";
import { Pricing } from "@/components/sections/Pricing";
import { SocialProof } from "@/components/sections/SocialProof";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { FaqJsonLd } from "@/components/seo/JsonLd";

export default function HomePage() {
  return (
    <>
      <FaqJsonLd />
      <Hero />
      <PositioningBar />
      <ProblemSolution />
      <Segments />
      <Services />
      <DeviceShowcase />
      <Differentials />
      <HowItWorks />
      <Portfolio />
      <Pricing />
      <SocialProof />
      <QuoteSection />
      <Faq />
      <FinalCta />
    </>
  );
}
