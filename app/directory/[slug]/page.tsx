import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactForm from "@/components/ContactForm";
import { businesses, getBusiness, getCategory } from "@/data/businesses";
import { SITE, extractDong } from "@/lib/config";

// 업종별 schema.org LocalBusiness 하위 타입. 정확히 대응하는 타입이 없으면 LocalBusiness로 통일.
const SCHEMA_TYPE_BY_CATEGORY: Record<string, string> = {
  boiler: "HVACBusiness",
  hvac: "HVACBusiness",
  electric: "Electrician",
  interior: "GeneralContractor",
  sash: "GeneralContractor",
  kitchen: "LocalBusiness",
  metal: "LocalBusiness",
};

export function generateStaticParams() {
  return businesses.map((b) => ({ slug: b.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const business = getBusiness(slug);
  if (!business) return {};

  const category = getCategory(business.categorySlug);
  const dong = extractDong(business.address);
  const title = `${business.name} — 장안구 ${dong} ${category?.label ?? ""} | ${SITE.name}`;
  const description = `수원 장안구 ${dong}에서 활동하는 ${category?.label ?? "설비"} 전문업체, ${business.name}입니다. 연락처와 위치를 확인하세요.`;
  const canonicalPath = `/directory/${business.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url: canonicalPath,
    },
  };
}

export default async function BusinessPage({ params }: PageProps) {
  const { slug } = await params;
  const business = getBusiness(slug);
  if (!business) notFound();

  const category = getCategory(business.categorySlug);
  const dong = extractDong(business.address);
  const naverMapUrl = `https://map.naver.com/p/search/${encodeURIComponent(
    business.address
  )}`;

  const schemaType = SCHEMA_TYPE_BY_CATEGORY[business.categorySlug] ?? "LocalBusiness";
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: business.name,
    telephone: business.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      addressLocality: dong,
      addressRegion: "경기도 수원시 장안구",
      addressCountry: "KR",
    },
    areaServed: dong,
    url: `${SITE.url}/directory/${business.slug}`,
    description: business.ownerLine,
    knowsAbout: business.specialties,
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Link
        href="/directory"
        className="text-sm text-ink-soft hover:text-amber"
      >
        ← 디렉토리로
      </Link>

      <div className="mt-4 border border-line-strong bg-surface">
        <div className="flex items-center justify-between border-b border-line-strong bg-surface-deep px-6 py-3 text-ink">
          <span className="spec-label text-xs text-amber">{category?.code}</span>
          <span className="spec-label text-xs text-ink/60">
            SPEC SHEET
          </span>
        </div>

        <div className="p-6 sm:p-8">
          <p className="spec-label text-xs text-blueprint">{category?.label}</p>
          <h1 className="mt-2 text-3xl font-bold">{business.name}</h1>
          <p className="mt-3 max-w-lg text-ink-soft">
            &ldquo;{business.ownerLine}&rdquo;
          </p>

          <dl className="mt-8 grid grid-cols-1 gap-6 border-t border-line pt-6 sm:grid-cols-2">
            <div>
              <dt className="spec-label text-xs text-ink-soft/70">연락처</dt>
              <dd className="mt-1">
                <a
                  href={`tel:${business.phone.replace(/-/g, "")}`}
                  className="font-semibold text-amber hover:underline"
                >
                  {business.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="spec-label text-xs text-ink-soft/70">영업시간</dt>
              <dd className="mt-1">{business.hours}</dd>
            </div>
            <div>
              <dt className="spec-label text-xs text-ink-soft/70">위치</dt>
              <dd className="mt-1">
                {business.address}
                <a
                  href={naverMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-amber hover:underline"
                >
                  네이버지도 →
                </a>
              </dd>
            </div>
            <div>
              <dt className="spec-label text-xs text-ink-soft/70">개업</dt>
              <dd className="mt-1">{business.since}</dd>
            </div>
          </dl>

          <div className="mt-6 border-t border-line pt-6">
            <dt className="spec-label text-xs text-ink-soft/70">취급 분야</dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {business.specialties.map((s) => (
                <span
                  key={s}
                  className="border border-line px-3 py-1 text-sm"
                >
                  {s}
                </span>
              ))}
            </dd>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <ContactForm businessName={business.name} />
      </div>
    </div>
  );
}
