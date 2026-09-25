import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Mail, MapPin, Phone, Search } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import BusinessRow from "@/components/BusinessRow";
import Pic from "@/components/Pic";
import { MAP_TYPE } from "@/data/mapTypes";
import { CATEGORY_PHOTO, PHOTOS } from "@/lib/photos";
import { businesses, getBusiness, getCategory } from "@/data/businesses";
import { getRelated } from "@/lib/directory";
import { SITE, OPERATOR, extractDong } from "@/lib/config";

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
  const dong = business.dong || extractDong(business.address);
  const title = `${business.name} — 장안구 ${dong} ${category?.label ?? ""} | ${SITE.name}`;
  const description = business.claimed
    ? `수원 장안구 ${dong}에서 활동하는 ${category?.label ?? "설비"} 전문업체, ${business.name}입니다. 연락처와 위치를 확인하세요.`
    : `수원 장안구 ${dong}의 ${category?.label ?? "설비"} 업체 ${business.name} 위치 정보입니다. 아직 등록되지 않은 업체로 상세 정보는 표시되지 않습니다.`;
  const canonicalPath = `/directory/${business.slug}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: { title, description, url: canonicalPath },
  };
}

export default async function BusinessPage({ params }: PageProps) {
  const { slug } = await params;
  const business = getBusiness(slug);
  if (!business) notFound();

  const category = getCategory(business.categorySlug);
  const dong = business.dong || extractDong(business.address);
  const naverMapUrl = `https://map.naver.com/p/search/${encodeURIComponent(
    business.address
  )}`;
  const naverSearchUrl = `https://search.naver.com/search.naver?query=${encodeURIComponent(
    `${business.name} 수원`
  )}`;
  const related = getRelated(business);
  const phoneHref = business.claimed && business.phone ? `tel:${business.phone.replace(/-/g, "")}` : null;

  const schemaType =
    SCHEMA_TYPE_BY_CATEGORY[business.categorySlug] ?? "LocalBusiness";

  // 미등록 업체는 연락처를 게시하지 않으므로 구조화 데이터에도 telephone을 넣지 않는다.
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: business.name,
    ...(business.claimed && business.phone ? { telephone: business.phone } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      addressLocality: dong,
      addressRegion: "경기도 수원시 장안구",
      addressCountry: "KR",
    },
    areaServed: dong,
    url: `${SITE.url}/directory/${business.slug}`,
    ...(business.claimed && business.ownerLine
      ? { description: business.ownerLine }
      : {}),
    ...(business.claimed && business.specialties
      ? { knowsAbout: business.specialties }
      : {}),
  };

  const photo = CATEGORY_PHOTO[business.categorySlug] ?? PHOTOS.plumber;
  const mapType = MAP_TYPE[business.slug];

  return (
    <div className="pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      {/* 업종 사진 띠 */}
      <div className="relative h-[140px] overflow-hidden bg-ink md:h-[220px]">
        <Pic photo={photo} sizes="100vw" eager decorative className="absolute inset-0 opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" aria-hidden />
        <p className="wrap absolute inset-x-0 bottom-3 text-[13px] text-white/90">
          {category?.label} 업종 사진 (업체 사진 아님)
        </p>
      </div>

      <div className="wrap">
        <nav aria-label="현재 위치" className="text-[14px] text-ink-soft">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="inline-flex min-h-11 items-center hover:text-amber">홈</Link>
            </li>
            <li aria-hidden><ChevronRight size={14} /></li>
            <li>
              <Link href="/directory" className="inline-flex min-h-11 items-center hover:text-amber">업체 찾기</Link>
            </li>
            <li aria-hidden><ChevronRight size={14} /></li>
            <li>
              <Link
                href={`/directory?category=${business.categorySlug}`}
                className="inline-flex min-h-11 items-center hover:text-amber"
              >
                {category?.label}
              </Link>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
          <article>
            <p className="text-[15px] text-ink-body">
              장안구 {dong} · {category?.label}
              {!business.claimed && (
                <span className="ml-2 rounded border border-line-strong px-1.5 py-0.5 text-[13px] text-ink-soft">
                  미등록 업체
                </span>
              )}
            </p>
            <h1 className="font-display mt-1 text-[30px] text-ink sm:text-[40px]">{business.name}</h1>

            {business.claimed && business.ownerLine && (
              <p className="mt-4 max-w-lg text-[17px] text-ink-body">&ldquo;{business.ownerLine}&rdquo;</p>
            )}

            <div className="mt-5 flex flex-wrap gap-2">
              {phoneHref ? (
                <>
                  <a href={phoneHref} className="btn btn-primary">
                    <Phone size={18} aria-hidden />
                    전화 걸기 {business.phone}
                  </a>
                  <a href="#inquiry" className="btn btn-ghost">견적 문의 남기기</a>
                </>
              ) : (
                <>
                  <a href={naverMapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    <MapPin size={18} aria-hidden />
                    지도에서 위치 보기
                  </a>
                  <a href={naverSearchUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    <Search size={18} aria-hidden />
                    네이버에서 상호 검색
                  </a>
                </>
              )}
            </div>

            <table className="mt-7 w-full border-t-2 border-ink text-left text-[15px]">
              <caption className="sr-only">{business.name} 정보</caption>
              <tbody>
                <tr className="border-b border-line">
                  <th scope="row" className="w-24 py-3 pr-4 align-top font-semibold text-ink-soft sm:w-32">주소</th>
                  <td className="py-3 text-ink">
                    {business.address}
                    <a
                      href={naverMapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 inline-block font-semibold text-amber underline"
                    >
                      지도
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-line">
                  <th scope="row" className="py-3 pr-4 align-top font-semibold text-ink-soft">동네</th>
                  <td className="py-3 text-ink">장안구 {dong}</td>
                </tr>
                {mapType && (
                  <tr className="border-b border-line">
                    <th scope="row" className="py-3 pr-4 align-top font-semibold text-ink-soft">지도 업종</th>
                    <td className="py-3 text-ink">
                      {mapType}
                      <span className="ml-2 text-[13px] text-ink-soft">2026년 8월 카카오맵 기준</span>
                    </td>
                  </tr>
                )}
                {business.claimed && business.phone && (
                  <tr className="border-b border-line">
                    <th scope="row" className="py-3 pr-4 align-top font-semibold text-ink-soft">전화</th>
                    <td className="py-3">
                      <a href={phoneHref!} className="font-bold text-amber">{business.phone}</a>
                    </td>
                  </tr>
                )}
                {business.claimed && business.hours && (
                  <tr className="border-b border-line">
                    <th scope="row" className="py-3 pr-4 align-top font-semibold text-ink-soft">영업시간</th>
                    <td className="py-3 text-ink">{business.hours}</td>
                  </tr>
                )}
                {business.claimed && business.since && (
                  <tr className="border-b border-line">
                    <th scope="row" className="py-3 pr-4 align-top font-semibold text-ink-soft">개업</th>
                    <td className="py-3 text-ink">{business.since}</td>
                  </tr>
                )}
                {business.claimed && business.specialties && (
                  <tr className="border-b border-line">
                    <th scope="row" className="py-3 pr-4 align-top font-semibold text-ink-soft">하는 일</th>
                    <td className="py-3 text-ink">{business.specialties.join(", ")}</td>
                  </tr>
                )}
                {!business.claimed && (
                  <tr className="border-b border-line">
                    <th scope="row" className="py-3 pr-4 align-top font-semibold text-ink-soft">전화</th>
                    <td className="py-3 text-ink-soft">사장님이 직접 등록하면 여기에 나옵니다</td>
                  </tr>
                )}
              </tbody>
            </table>
          </article>

          <aside className="lg:sticky lg:top-24">
            {!business.claimed ? (
              <div className="card p-5 sm:p-6">
                <p className="text-[17px] font-bold text-ink">{business.name} 사장님이신가요?</p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-body">
                  공개된 지도 정보를 참고해 상호·업종·위치만 올려 두었습니다. 등록하시면 전화번호와
                  영업시간, 하시는 일을 같이 실어 드립니다. 내용이 틀리거나 내리길 원하시면 알려주세요.
                  바로 고치거나 내립니다.
                </p>
                {/* 문의 폼(web3forms) 키가 아직 설정되지 않아 전송이 실패할 수 있다.
                    삭제 요청은 실패하면 안 되는 경로라 전화·이메일로 직접 연결한다. */}
                <div className="mt-5 flex flex-col gap-2">
                  <a href={OPERATOR.tel} className="btn btn-primary">
                    <Phone size={18} aria-hidden />
                    등록 문의 {OPERATOR.phone}
                  </a>
                  <a
                    href={`mailto:${OPERATOR.email}?subject=${encodeURIComponent(
                      `[장안설비대장] ${business.name} 정보 수정·삭제 요청`
                    )}`}
                    className="btn btn-ghost"
                  >
                    <Mail size={18} aria-hidden />
                    정보 수정·삭제 요청
                  </a>
                </div>
                <p className="mt-4 text-[13px] text-ink-soft">
                  이메일{" "}
                  <a href={`mailto:${OPERATOR.email}`} className="text-amber underline">
                    {OPERATOR.email}
                  </a>{" "}
                  ·{" "}
                  <Link href="/join" className="text-amber underline">
                    등록 신청 폼
                  </Link>
                </p>
              </div>
            ) : (
              <div id="inquiry" className="scroll-mt-24">
                <ContactForm businessName={business.name} />
              </div>
            )}
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-14" aria-labelledby="related-title">
            <div className="rule-heavy flex flex-wrap items-baseline justify-between gap-3 pt-3">
              <h2 id="related-title" className="font-display text-[22px] text-ink sm:text-[26px]">
                {dong} 근처 다른 {category?.label} 업체
              </h2>
              <Link
                href={`/directory?category=${business.categorySlug}`}
                className="inline-flex min-h-11 items-center text-[15px] font-semibold text-amber underline"
              >
                {category?.label} 전부 보기
              </Link>
            </div>
            <ul className="mt-2">
              {related.map((b) => (
                <BusinessRow key={b.slug} business={b} />
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* 모바일 하단 행동 바 (탭바 대신) */}
      <div className="actionbar md:hidden">
        {phoneHref ? (
          <>
            <a href={phoneHref} className="btn btn-primary flex-1">
              <Phone size={18} aria-hidden /> 전화 걸기
            </a>
            <a href="#inquiry" className="btn btn-ghost flex-1">견적 문의</a>
          </>
        ) : (
          <>
            <a href={naverMapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost flex-1 !text-[14px]">
              <MapPin size={17} aria-hidden /> 위치 보기
            </a>
            <Link href={`/directory?category=${business.categorySlug}`} className="btn btn-primary flex-1 !text-[14px]">
              다른 {category?.label} 업체
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
