"use client";

import { 
  HeroSection, 
  TrustSection,
  CaseStudiesSection,
  ServicesSection,
  DataPerformanceSection,
  ConversionSection,
  BrandsMarquee, 
  FAQSection,
  LiveIntelligenceSection,
  WhyClientsStaySection
} from '@/components/home';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-black overflow-hidden">
      <HeroSection />
      <BrandsMarquee />
      <LiveIntelligenceSection />
      <TrustSection />
      <CaseStudiesSection />
      <ServicesSection />
      <WhyClientsStaySection />
      <DataPerformanceSection />
      <ConversionSection />
      <FAQSection />
    </main>
  );
}
