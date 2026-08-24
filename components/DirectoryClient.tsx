"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BusinessRow from "@/components/BusinessRow";
import { businesses, categories } from "@/data/businesses";

export default function DirectoryClient({
  initialCategory,
}: {
  initialCategory: string;
}) {
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return businesses.filter((b) => {
      const matchesCategory = category === "all" || b.categorySlug === category;
      const matchesQuery =
        query.trim() === "" ||
        b.name.includes(query) ||
        b.specialties.some((s) => s.includes(query)) ||
        b.address.includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="업체명, 지역, 취급 분야로 검색"
          className="w-full max-w-sm border border-graphite bg-white px-4 py-2.5 text-sm outline-none focus:border-amber-strong"
        />
        <span className="spec-label text-xs text-graphite-soft/60">
          {String(filtered.length).padStart(2, "0")}건 검색됨
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={() => setCategory("all")}
          className={`spec-label border px-3 py-1.5 text-xs transition-colors ${
            category === "all"
              ? "border-graphite bg-graphite text-paper"
              : "border-paper-line text-graphite-soft hover:border-graphite"
          }`}
        >
          전체
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => setCategory(c.slug)}
            className={`spec-label border px-3 py-1.5 text-xs transition-colors ${
              category === c.slug
                ? "border-graphite bg-graphite text-paper"
                : "border-paper-line text-graphite-soft hover:border-graphite"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-8 border-t border-graphite">
        <AnimatePresence mode="popLayout">
          {filtered.map((business) => (
            <motion.div
              key={business.slug}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <BusinessRow business={business} />
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-graphite-soft">
            조건에 맞는 업체가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
