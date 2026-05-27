import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoStrip from "@/components/LogoStrip";
import FeaturesGrid1 from "@/components/FeaturesGrid1";
import FeaturesGrid2 from "@/components/FeaturesGrid2";
import FeaturesDark1 from "@/components/FeaturesDark1";
import FeaturesDark2 from "@/components/FeaturesDark2";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <LogoStrip />
      <FeaturesGrid1 />
      <FeaturesGrid2 />
      <FeaturesDark1 />
      <FeaturesDark2 />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <Footer />
    </>
  );
}
