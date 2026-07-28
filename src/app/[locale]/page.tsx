import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { WhySection } from '@/components/why-section';
import { ServicesSection } from '@/components/services-section';
import { LogisticsSection } from '@/components/logistics-section';
import { TeamSection } from '@/components/team-section';
import { ProcessSection } from '@/components/process-section';
import { BeforeAfterSection } from '@/components/before-after-section';
import { StatsSection } from '@/components/stats-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { FAQSection } from '@/components/faq-section';
import { CTASection } from '@/components/cta-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <WhySection />
        <ServicesSection />
        <LogisticsSection />
        <TeamSection />
        <ProcessSection />
        <BeforeAfterSection />
        <StatsSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
