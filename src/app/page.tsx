import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Calculator from "@/components/sections/Calculator";
import AITools from "@/components/sections/AITools";
import ServiceAreas from "@/components/sections/ServiceAreas";
import Testimonials from "@/components/sections/Testimonials";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <Calculator />
      <AITools />
      <ServiceAreas />
      <Testimonials />
      <Blog />
      <Contact />
    </>
  );
}
