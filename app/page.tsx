import Link from "next/link";
import CategoryGrid from "@/components/CategoryGrid";
import BusinessRow from "@/components/BusinessRow";
import { businesses } from "@/data/businesses";
import { SITE } from "@/lib/config";

export default function Home() {
  const featured = businesses.slice(0, 5);

  return (
    <>
      <section className="blueprint-grid border-b border-graphite">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <p className="spec-label text-xs text-blueprint">
            {SITE.region} · EQUIPMENT & TRADE DIRECTORY
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
            장안구 설비 업체를
            <br />한 장의 사양서처럼 정리했습니다.
          </h1>
          <p className="mt-5 max-w-xl text-graphite-soft">
            보일러, 냉난방, 샷시, 주방기계, 철제·판금, 전기설비까지 — 동네에서
            일하는 소상공인 업체를 업종별로 모아 바로 연락할 수 있게
            만들었습니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/directory"
              className="bg-graphite px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-amber-strong"
            >
              업체 디렉토리 보기
            </Link>
            <Link
              href="/join"
              className="border border-graphite px-6 py-3 text-sm font-semibold transition-colors hover:border-amber-strong hover:text-amber-strong"
            >
              우리 업체 등록하기
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold">업종별 분류</h2>
          <span className="spec-label text-xs text-graphite-soft/60">
            CATEGORY INDEX
          </span>
        </div>
        <div className="mt-6">
          <CategoryGrid />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold">최근 등록 업체</h2>
          <Link
            href="/directory"
            className="text-sm font-semibold text-amber-strong hover:underline"
          >
            전체보기 →
          </Link>
        </div>
        <div className="mt-6 border-t border-graphite">
          {featured.map((business) => (
            <BusinessRow key={business.slug} business={business} />
          ))}
        </div>
      </section>

      <section className="border-t border-graphite bg-graphite text-paper">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <p className="spec-label text-xs text-amber">FOR BUSINESS OWNERS</p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            장안구에서 영업 중이신가요?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-paper/70">
            업체 정보를 등록하면 장안구 인근에서 견적을 찾는 고객에게
            노출됩니다.
          </p>
          <Link
            href="/join"
            className="mt-6 inline-block bg-amber px-6 py-3 text-sm font-semibold text-graphite transition-colors hover:bg-paper"
          >
            무료로 등록 신청하기
          </Link>
        </div>
      </section>
    </>
  );
}
