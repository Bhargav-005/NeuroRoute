import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Features from "@/components/features" // "Why NeuroRoute" Core values
import HowItWorks from "@/components/how-it-works"
import GlobalSection from "@/components/global-section" // Real-time routing demo
import Metrics from "@/components/metrics"
import Developers from "@/components/developers" // Dev focus + Security
import Pricing from "@/components/pricing"
import CTA from "@/components/cta"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <GlobalSection />
      <Metrics />
      <Developers />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  )
}
