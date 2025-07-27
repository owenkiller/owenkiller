import Header from '@/components/layout/Header'
import HeroSection from '@/components/home/HeroSection'
import FeaturesSection from '@/components/home/FeaturesSection'
import ImpactMapSection from '@/components/home/ImpactMapSection'
import InnovationShowcase from '@/components/home/InnovationShowcase'
import CommunitySection from '@/components/home/CommunitySection'
import NewsSection from '@/components/home/NewsSection'
import PartnersSection from '@/components/home/PartnersSection'
import CallToActionSection from '@/components/home/CallToActionSection'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ImpactMapSection />
      <InnovationShowcase />
      <CommunitySection />
      <NewsSection />
      <PartnersSection />
      <CallToActionSection />
      <Footer />
    </main>
  )
}