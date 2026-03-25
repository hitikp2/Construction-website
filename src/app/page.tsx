import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import TrustBar from "@/components/sections/TrustBar";
import Portfolio from "@/components/sections/Portfolio";
import BeforeAfter from "@/components/sections/BeforeAfter";
import Calculator from "@/components/sections/Calculator";
import AITools from "@/components/sections/AITools";
import ServiceAreas from "@/components/sections/ServiceAreas";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  generateLocalBusinessSchema,
  generateAggregateRatingSchema,
  generateFAQSchema,
} from "@/lib/schema";
import { FAQS } from "@/lib/faq-data";

export default function Home() {
  return (
    <>
      <JsonLd data={generateLocalBusinessSchema()} />
      <JsonLd data={generateAggregateRatingSchema()} />
      <JsonLd data={generateFAQSchema(FAQS)} />
      <Hero />
      <Services />
      <TrustBar />
      <Portfolio />
      <BeforeAfter />
      <Calculator />
      <AITools />
      <ServiceAreas />
      <Testimonials />
      <FAQ />
      <Blog />
      <Contact />
    </>
  );
}
