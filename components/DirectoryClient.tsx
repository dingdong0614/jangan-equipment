"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import BusinessRow from "@/components/BusinessRow";
import { MAP_TYPE } from "@/data/mapTypes";
import { businesses, categories, getDongs, sortForListing } from "@/lib/directory";

const ALL = "all";

export default function DirectoryClient({
  initialCategory,
  initialDong = ALL,
  initialQuery = "",
  autoFocusSearch = false,
}: {
  initialCategory: string;
  initialDong?: string;
  initialQuery?: string;
  autoFocusSearch?: boolean;
}) {
  const [category, setCategory] = useState(initialCategory);
  const [dong, setDong] = useState(initialDong);
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  const dongs = useMemo(() => getDongs(), []);

  useEffect(() => {
    if (autoFocusSearch) inputRef.current?.focus();
  }, [autoFocusSearch]);

  // 필터 상태를 주소에 반영(공유·뒤로가기 대비). 서버 재요청 없이 주소만 바꾼다.
  useEffect(() => {
    const sp = new URLSearchParams();
    if (category !== ALL) sp.set("category", category);
    if (dong !== ALL) sp.set("dong", dong);
    if (query.trim()) sp.set("q", query.trim());
    const next = `${window.location.pathname}${sp.toString() ? `?${sp}` : ""}`;
    if (next !== `${window.location.pathname}${window.location.search}`) {
      window.history.replaceState(window.history.state, "", next);
    }
  }, [category, dong, query]);

  const labelOf = (slug: string) => categories.find((c) => c.slug === slug)?.label ?? "";

  const filtered = useMemo(() => {
    const tokens = query.trim().split(/\s+/).filter(Boolean);
    const list = businesses.filter((b) => {
      if (category !== ALL && b.categorySlug !== category) return false;
      if (dong !== ALL && b.dong !== dong) return false;
      if (tokens.length === 0) return true;
      const hay = [
        b.name,
        b.dong,
        b.address,
        categories.find((c) => c.slug === b.categorySlug)?.label ?? "",
        MAP_TYPE[b.slug] ?? "",
        ...(b.specialties ?? []),
      ].join(" ");
      return tokens.every((t) => hay.includes(t));
    });
    return sortForListing(list);
  }, [category, dong, query]);

  const countIn = (slug: string) =>
    businesses.filter((b) => (slug === ALL || b.categorySlug === slug) && (dong === ALL || b.dong === dong)).length;

  const reset = () => {
    setCategory(ALL);
    setDong(ALL);
    setQuery("");
  };

  return (
    <div>
      <div className="sticky top-14 z-30 -mx-4 border-b-2 border-ink bg-bg px-4 pt-3 md:top-16 md:-mx-8 md:px-8">
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="flex flex-1 items-center gap-2 rounded-md border border-line-strong bg-surface pl-3 focus-within:border-amber">
            <Search size={18} aria-hidden className="flex-none text-ink-soft" />
            <label htmlFor="dir-q" className="sr-only">
              상호, 동네, 도로명으로 검색
            </label>
            <input
              id="dir-q"
              ref={inputRef}
              type="search"
              value={query}
              maxLength={40}
              autoComplete="off"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="상호, 동네, 도로명 (예: 도배, 서부로)"
              className="min-w-0 flex-1 bg-transparent py-2.5 text-[16px] text-ink outline-none placeholder:text-ink-soft [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="검색어 지우기"
                className="grid h-11 w-11 place-items-center text-ink-soft hover:text-ink"
              >
                <X size={18} aria-hidden />
              </button>
            )}
          </div>
          <label className="flex items-center gap-2 text-[14px] text-ink-body">
            <span className="flex-none font-semibold">동네</span>
            <select
              value={dong}
              onChange={(e) => setDong(e.target.value)}
              className="min-h-11 w-full rounded-md border border-line-strong bg-surface px-3 text-[16px] text-ink sm:w-40"
            >
              <option value={ALL}>장안구 전체</option>
              {dongs.map((d) => (
                <option key={d.dong} value={d.dong}>
                  {d.dong} ({d.count})
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="tab-row -mx-4 mt-2 px-4 md:mx-0 md:px-0" role="group" aria-label="업종 선택">
          {[{ slug: ALL, label: "전체" }, ...categories].map((c) => (
            <button
              key={c.slug}
              type="button"
              aria-pressed={category === c.slug}
              onClick={() => setCategory(c.slug)}
              className="tab"
            >
              {c.label} <span className="tnum text-[13px] font-normal">{countIn(c.slug)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-[15px] text-ink-body" aria-live="polite">
          <strong className="tnum text-ink">{filtered.length}곳</strong>
          {category !== ALL && ` · ${labelOf(category)}`}
          {dong !== ALL && ` · ${dong}`}
          {query.trim() && ` · "${query.trim()}"`}
        </p>
        {(category !== ALL || dong !== ALL || query) && (
          <button type="button" onClick={reset} className="min-h-11 text-[14px] font-semibold text-amber underline">
            처음부터 다시
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <>
          <div className="mt-2 hidden grid-cols-[minmax(0,1.4fr)_120px_80px_minmax(0,1fr)] gap-x-4 border-b border-ink px-2 pb-1.5 text-[13px] font-semibold text-ink-soft md:grid">
            <span>상호</span>
            <span>지도 업종</span>
            <span>동</span>
            <span>도로명 주소</span>
          </div>
          <ul className="border-t border-ink md:border-t-0">
            {filtered.map((business) => (
              <BusinessRow key={business.slug} business={business} />
            ))}
          </ul>
        </>
      ) : (
        <div className="mt-4 border-y-2 border-ink py-8">
          <p className="text-[18px] font-bold text-ink">이 조건으로는 한 곳도 없네요.</p>
          <p className="mt-1 text-ink-soft">조건을 하나 풀어 보세요.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {query && (
              <button type="button" className="btn btn-ghost !min-h-11" onClick={() => setQuery("")}>
                검색어 빼기
              </button>
            )}
            {dong !== ALL && (
              <button type="button" className="btn btn-ghost !min-h-11" onClick={() => setDong(ALL)}>
                장안구 전체로
              </button>
            )}
            {category !== ALL && (
              <button type="button" className="btn btn-ghost !min-h-11" onClick={() => setCategory(ALL)}>
                모든 업종으로
              </button>
            )}
            <button type="button" className="btn btn-primary !min-h-11" onClick={reset}>
              {businesses.length}곳 전부 보기
            </button>
          </div>
          <p className="mt-5 text-[14px] text-ink-soft">
            아는 가게가 빠져 있나요? 사장님께{" "}
            <Link href="/join" className="font-semibold text-amber underline">
              등록 안내
            </Link>
            를 전해 주세요.
          </p>
        </div>
      )}
    </div>
  );
}
