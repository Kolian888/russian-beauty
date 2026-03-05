import {
  Navigation,
  Crown3D,
  Hero,
  SocialProof,
  WhyParticipate,
  Benefits,
  Competitions,
  Categories,
  Gallery,
  Jury,
  HonoraryGuests,
  Partners,
  Schedule,
  Regulations,
  LeadForm,
  FAQ,
  Footer,
  BackToTop,
} from './components'

function App() {
  return (
    <div className="min-h-screen bg-[var(--color-black)] relative">
      {/* 3D Rotating Crown Background */}
      <Crown3D />

      {/* Skip to content link - accessibility */}
      <a
        href="#why-participate"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--color-gold)] focus:text-[var(--color-black)] focus:rounded"
      >
        Перейти к содержимому
      </a>
      <Navigation />
      <main className="relative z-[2]">
        <Hero />
        <SocialProof />
        <WhyParticipate />
        <Benefits />
        <Competitions />
        <Categories />
        <Gallery />
        <Jury />
        <HonoraryGuests />
        <Partners />
        <Schedule />
        <Regulations />
        <LeadForm />
        <FAQ />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default App
