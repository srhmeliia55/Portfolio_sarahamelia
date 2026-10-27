import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Navbar } from "@/components/layout/navbar";
import { Web2Project } from "@/components/sections/web2-project";
import { web2Meta } from "@/data/web2";

export const metadata: Metadata = {
  title: web2Meta.title,
  description: web2Meta.description,
  alternates: {
    canonical: "/projects/web-2",
  },
  openGraph: {
    title: web2Meta.title,
    description: web2Meta.description,
    url: "/projects/web-2",
    type: "article",
  },
};

export default function Page() {
  return (
    <>
      <Navbar activeId="projects" />
      <MobileNav activeId="projects" />
      <Web2Project />
      <Footer />
    </>
  );
}
