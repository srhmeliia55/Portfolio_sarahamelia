import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Navbar } from "@/components/layout/navbar";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Journey } from "@/components/sections/journey";
import { Skills } from "@/components/sections/skills";
import { profile } from "@/data/portfolio";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Video Editor",
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cilegon",
    addressCountry: "ID",
  },
  description: profile.headline.id,
  sameAs: profile.socials.map((social) => social.href),
};

export default function Home() {
  return (
    <>
      <Navbar />
      <MobileNav />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Journey />
        <Contact />
      </main>
      <Footer />

      <script
        type="application/ld+json"
        // JSON-LD statis — aman untuk SEO.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </>
  );
}
