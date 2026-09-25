import Link from "next/link";
import { Phone, Search } from "lucide-react";
import Pic from "@/components/Pic";
import { getClaimedBusinesses } from "@/data/businesses";
import { extraMapType } from "@/data/mapTypes";
import { businesses, categories, categoryCount, getDongs, sortForListing } from "@/lib/directory";
import { CATEGORY_PHOTO, PHOTOS } from "@/lib/photos";
import { SITE, OPERATOR } from "@/lib/config";

export default function Home() {
  const claimed = getClaimedBusinesses();
  const dongs = getDongs();
  const withCount = categories
    .map((c) => ({ ...c, count: categoryCount(c.slug) }))
    .sort((a, b) => b.count - a.count);
  const listed = withCount.filter((c) => c.count > 0);
  const empty = withCount.filter((c) => c.count === 0);

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/directory?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE.name} 업종 카테고리`,
    itemListElement: categories.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      url: `${SITE.url}/directory?category=${c.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      {/* 1. 제호 + 검색 */}
      <section className="wrap pt-5 md:pt-8">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-line-strong pb-2 text-[13px] text-ink-soft">
          <p>
            수원시 장안구 {dongs.length}개 동 · 업체 정보는 2026년 8월 지도 조사 기준
          </p>
          <a href={OPERATOR.tel} className="font-semibold text-ink-body hover:text-amber">
            업체 등록 문의 {OPERATOR.phone}
          </a>
        </div>

        <div className="grid grid-cols-1 gap-5 pb-6 pt-6 md:pb-8 md:pt-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:gap-10">
          <h1 className="font-display min-w-0 text-[30px] text-ink sm:text-[40px] xl:text-[50px]">
            보일러 기사님부터 도배집까지,
            <br className="hidden sm:block" /> 장안구 업체 {businesses.length}곳 다 적어 뒀어요
          </h1>
          <form action="/directory" method="get" role="search" className="w-full">
            <label htmlFor="hero-q" className="mb-1.5 block text-[14px] font-semibold text-ink-body">
              상호나 동네로 바로 찾기
            </label>
            <div className="flex items-stretch overflow-hidden rounded-md border-2 border-ink bg-surface focus-within:border-amber">
              <input
                id="hero-q"
                name="q"
                type="search"
                maxLength={40}
                autoComplete="off"
                placeholder="정자동 보일러, 도배, 샷시"
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-[16px] text-ink outline-none placeholder:text-ink-soft"
              />
              <button type="submit" className="flex items-center gap-1.5 bg-ink px-5 font-bold text-bg">
                <Search size={18} aria-hidden />
                찾기
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 2. 사진 띠 = 업종 바로가기 */}
      <nav aria-label="업종별로 보기" className="wrap">
        <ul className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-7 md:overflow-visible md:px-0">
          {listed.map((c, i) => (
            <li key={c.slug} className={`w-[42vw] max-w-[220px] flex-none snap-start md:w-auto md:max-w-none ${i === 0 ? "md:col-span-2" : ""}`}>
              <Link href={`/directory?category=${c.slug}`} className="group relative block h-[150px] overflow-hidden rounded-md md:h-[210px]">
                <Pic
                  photo={CATEGORY_PHOTO[c.slug]}
                  sizes="(min-width: 768px) 33vw, 42vw"
                  eager={i < 3}
                  decorative
                  className="photo-zoom"
                  width={800}
                  height={600}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" aria-hidden />
                <span className="absolute bottom-0 left-0 p-3 text-white md:p-4">
                  <span className="block text-[17px] font-bold md:text-[20px]">{c.label}</span>
                  <span className="text-[13px] opacity-90">{c.count}곳</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* 3. 전화번호부: 82곳 전부 */}
      <section className="wrap mt-10 md:mt-14" aria-labelledby="book-title">
        <div className="rule-heavy flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pt-3">
          <h2 id="book-title" className="font-display text-[24px] text-ink md:text-[30px]">
            업종별 업체 목록
          </h2>
          <p className="text-[14px] text-ink-soft">
            {claimed.length > 0
              ? "전화번호가 붙은 곳은 직접 등록한 업체입니다"
              : "아직 직접 등록한 업체가 없어 상호와 동네만 싣습니다. 누르면 위치가 나와요"}
          </p>
        </div>

        <div className="book-cols mt-6">
          {listed.map((c) => {
            const list = sortForListing(businesses.filter((b) => b.categorySlug === c.slug));
            return (
              <div key={c.slug} className="book-group">
                <h3 className="flex items-baseline justify-between border-b-2 border-ink pb-1">
                  <Link href={`/directory?category=${c.slug}`} className="text-[18px] font-bold text-ink hover:text-amber">
                    {c.label}
                  </Link>
                  <span className="tnum text-[14px] text-ink-soft">{c.count}곳</span>
                </h3>
                <ul>
                  {list.map((b) => (
                    <li key={b.slug} className="border-b border-line">
                      <Link href={`/directory/${b.slug}`} className="leader min-h-11 py-2 text-[15px] hover:text-amber">
                        <span className="min-w-0 font-medium text-ink">
                          {b.name}
                          {extraMapType(b.slug, c.slug) && (
                            <span className="ml-1.5 text-[13px] font-normal text-ink-soft">{extraMapType(b.slug, c.slug)}</span>
                          )}
                        </span>
                        <span className="end flex-none text-[14px] text-ink-body">
                          {b.claimed && b.phone ? (
                            <span className="font-bold text-amber">{b.phone}</span>
                          ) : (
                            b.dong
                          )}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          {empty.map((c) => (
            <div key={c.slug} className="book-group">
              <h3 className="flex items-baseline justify-between border-b-2 border-ink pb-1">
                <span className="text-[18px] font-bold text-ink">{c.label}</span>
                <span className="text-[14px] text-ink-soft">0곳</span>
              </h3>
              <p className="py-2 text-[14px] text-ink-soft">
                장안구에서 지도에 잡히는 곳이 없었습니다. 철공소·판금 하시는 사장님이면{" "}
                <Link href="/join" className="font-semibold text-amber underline">먼저 올려 드릴게요</Link>.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 동네별 */}
      <section className="mt-12 border-y border-line-strong bg-bg-1 md:mt-16">
        <div className="wrap grid grid-cols-1 gap-8 py-10 md:grid-cols-[1.3fr_1fr] md:gap-12 md:py-14">
          <div className="relative h-[200px] overflow-hidden rounded-md md:h-auto md:min-h-[320px]">
            <Pic photo={PHOTOS.city} sizes="(min-width: 768px) 55vw, 100vw" className="absolute inset-0" />
          </div>
          <div>
            <h2 className="font-display text-[24px] text-ink md:text-[30px]">우리 동네에 있는 곳만</h2>
            <p className="mt-2 text-ink-soft">
              출장은 가까울수록 빨리 옵니다. 등재 업체가 많은 동네 순서예요.
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6">
              {dongs.map((d) => (
                <li key={d.dong} className="border-b border-line">
                  <Link
                    href={`/directory?dong=${encodeURIComponent(d.dong)}`}
                    className="leader min-h-11 py-2.5 text-[16px] font-medium text-ink hover:text-amber"
                  >
                    <span>{d.dong}</span>
                    <span className="end tnum text-[14px] font-normal text-ink-body">{d.count}곳</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. 사장님께 */}
      <section className="relative mt-12 overflow-hidden bg-ink md:mt-16">
        <Pic photo={PHOTOS.workbench} sizes="100vw" className="absolute inset-0 opacity-45" decorative />
        <div className="relative wrap py-14 text-white md:py-20">
          <div className="max-w-2xl">
            <p className="text-[14px] font-medium text-white/85">설비·인테리어 사장님께</p>
            <h2 className="font-display mt-3 text-[28px] md:text-[40px]">
              용접 중에, 사다리 위에서,
              <br />
              보일러실 안에서 전화가 옵니다.
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-white/90 md:text-[17px]">
              손님은 신호 몇 번 가면 다음 번호를 누르죠. 사장님 가게는 이미 여기 상호랑 위치가 올라가
              있습니다. 등록하시면 전화번호, 영업시간, 하는 일이 같이 붙어서, 부재중이 떠도 손님이
              다시 걸 수 있게 됩니다. {SITE.monthlyFee}.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={OPERATOR.tel} className="btn btn-primary">
                <Phone size={18} aria-hidden />
                {OPERATOR.phone} 전화 상담
              </a>
              <Link href="/join" className="btn border border-white/60 text-white hover:border-white">
                등록하면 뭐가 바뀌는지 보기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
