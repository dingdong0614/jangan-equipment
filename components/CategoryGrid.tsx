import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories, categoryCount } from "@/lib/directory";
import CategoryIcon from "@/components/CategoryIcon";

// 벤토 레이아웃: 업체가 많은 업종일수록 넓은 칸. (데이터 기준 자동 배치)
export default function CategoryGrid() {
  const items = categories
    .map((c) => ({ ...c, count: categoryCount(c.slug) }))
    .sort((a, b) => b.count - a.count);

  // 6열 그리드에서의 칸 폭: 상위 2개 3칸, 다음 3개 2칸, 나머지 3칸
  const span = (i: number) =>
    i < 2 ? "lg:col-span-3" : i < 5 ? "lg:col-span-2" : "lg:col-span-3";

  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6">
      {items.map((c, i) => (
        <li key={c.slug} className={`${i === 0 ? "col-span-2" : ""} ${span(i)}`}>
          <Link
            href={`/directory?category=${c.slug}`}
            className={`card card-link group flex h-full flex-col justify-between p-4 sm:p-6 ${
              i < 2 ? "lg:min-h-[208px]" : "lg:min-h-[176px]"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-line-strong bg-bg-1 text-teal transition-colors group-hover:text-amber">
                <CategoryIcon slug={c.slug} size={22} />
              </span>
              <span className="spec-label text-[11px] text-ink-soft">{c.code}</span>
            </div>
            <div className="mt-5">
              <h3 className="flex items-center gap-1.5 text-[17px] font-bold text-ink sm:text-lg">
                {c.label}
                <ArrowUpRight
                  size={16}
                  aria-hidden
                  className="text-ink-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber"
                />
              </h3>
              <p className="mt-1 hidden text-sm leading-relaxed text-ink-soft sm:block">
                {c.description}
              </p>
              <p className="mt-2 text-sm">
                {c.count > 0 ? (
                  <>
                    <span className="font-mono text-base font-medium text-amber">{c.count}</span>
                    <span className="text-ink-soft">곳 등재</span>
                  </>
                ) : (
                  <span className="text-ink-soft">등록 업체 모집 중</span>
                )}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
