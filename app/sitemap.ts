import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";
import { businesses, categories } from "@/data/businesses";

// 정적 목록을 하드코딩하지 않고 data/businesses.ts를 순회해서 생성한다.
// 새 업체가 businesses 배열에 추가되면 다음 빌드에서 sitemap도 자동으로 최신 상태가 된다.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/directory`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/join`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE.url}/directory?category=${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const businessRoutes: MetadataRoute.Sitemap = businesses.map((b) => ({
    url: `${SITE.url}/directory/${b.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...businessRoutes];
}
