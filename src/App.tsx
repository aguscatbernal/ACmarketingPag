import { MotionConfig } from "framer-motion";
import { LangProvider } from "./i18n";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Services } from "./components/Services";
import { NfcDemo } from "./components/NfcDemo";
import { Collabs } from "./components/Collabs";
import { SocialManagement } from "./components/SocialManagement";
import { RestaurantSystem } from "./components/RestaurantSystem";
import { Offers } from "./components/Offers";
import { Process } from "./components/Process";
import { Faq } from "./components/Faq";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ScrollProgress, WhatsAppFloat } from "./components/Extras";

export default function App() {
  return (
    <LangProvider>
      <MotionConfig reducedMotion="user">
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <Services />
          <NfcDemo />
          <Collabs />
          <SocialManagement />
          <RestaurantSystem />
          <Offers />
          <Process />
          <Faq />
          <Contact />
        </main>
        <Footer />
        <WhatsAppFloat />
      </MotionConfig>
    </LangProvider>
  );
}
