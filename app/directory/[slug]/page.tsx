import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactForm from "@/components/ContactForm";
import { businesses, getBusiness, getCategory } from "@/data/businesses";
import { SITE } from "@/lib/config";

export function generateStaticParams() {
  return businesses.map((b) => ({ slug: b.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const business = getBusiness(slug);
  if (!business) return {};
  return { title: `${business.name} — ${SITE.name}` };
}

export default async function BusinessPage({ params }: PageProps) {
  const { slug } = await params;
  const business = getBusiness(slug);
  if (!business) notFound();

  const category = getCategory(business.categorySlug);
  const naverMapUrl = `https://map.naver.com/p/search/${encodeURIComponent(
    business.address
  )}`;

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <Link
        href="/directory"
        className="text-sm text-graphite-soft hover:text-amber-strong"
      >
        ← 디렉토리로
      </Link>

      <div className="mt-4 border border-graphite bg-paper">
        <div className="flex items-center justify-between border-b border-graphite bg-graphite px-6 py-3 text-paper">
          <span className="spec-label text-xs text-amber">{category?.code}</span>
          <span className="spec-label text-xs text-paper/60">
            SPEC SHEET
          </span>
        </div>

        <div className="p-6 sm:p-8">
          <p className="spec-label text-xs text-blueprint">{category?.label}</p>
          <h1 className="mt-2 text-3xl font-bold">{business.name}</h1>
          <p className="mt-3 max-w-lg text-graphite-soft">
            &ldquo;{business.ownerLine}&rdquo;
          </p>

          <dl className="mt-8 grid grid-cols-1 gap-6 border-t border-paper-line pt-6 sm:grid-cols-2">
            <div>
              <dt className="spec-label text-xs text-graphite-soft/60">연락처</dt>
              <dd className="mt-1">
                <a
                  href={`tel:${business.phone.replace(/-/g, "")}`}
                  className="font-semibold text-amber-strong hover:underline"
                >
                  {business.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="spec-label text-xs text-graphite-soft/60">영업시간</dt>
              <dd className="mt-1">{business.hours}</dd>
            </div>
            <div>
              <dt className="spec-label text-xs text-graphite-soft/60">위치</dt>
              <dd className="mt-1">
                {business.address}
                <a
                  href={naverMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-amber-strong hover:underline"
                >
                  네이버지도 →
                </a>
              </dd>
            </div>
            <div>
              <dt className="spec-label text-xs text-graphite-soft/60">개업</dt>
              <dd className="mt-1">{business.since}</dd>
            </div>
          </dl>

          <div className="mt-6 border-t border-paper-line pt-6">
            <dt className="spec-label text-xs text-graphite-soft/60">취급 분야</dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {business.specialties.map((s) => (
                <span
                  key={s}
                  className="border border-paper-line px-3 py-1 text-sm"
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
