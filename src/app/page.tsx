import {
  Header,
  Hero,
  JewelryRendering,
  JewelryDesign,
  Philosophy,
  ModelingSpecialization,
  ManufacturingIntelligence,
  Founder,
  FinishedCreations,
  Process,
  ContactForm,
  Footer,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <JewelryRendering />
      <JewelryDesign />
      <Philosophy />
      <ModelingSpecialization />
      <ManufacturingIntelligence />
      <Founder />
      <FinishedCreations />
      <Process />
      <ContactForm />
      <Footer />
    </main>
  );
}
