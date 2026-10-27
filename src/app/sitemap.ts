import type { MetadataRoute } from "next";
import { siteMeta } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteMeta.url,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteMeta.url}/projects/web-2`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
