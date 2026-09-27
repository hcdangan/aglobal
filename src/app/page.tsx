import { About, Team } from "@/components/sections/about";
import { BusinessModel } from "@/components/sections/business-model";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Impact } from "@/components/sections/impact";
import { Partners } from "@/components/sections/partners";
import { Products } from "@/components/sections/products";
import { Solutions } from "@/components/sections/solutions";

/**
 * Single-page marketing site.
 *
 * Section order mirrors the visitor's decision path:
 * promise → impact → how we work → what we carry → how we help → who we are → contact.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Impact />
      <BusinessModel />
      <Products />
      <Solutions />
      <Partners />
      <About />
      <Team />
      <Contact />
    </>
  );
}
