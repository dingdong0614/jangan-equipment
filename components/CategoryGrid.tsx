import Link from "next/link";
import { categories, getBusinessesByCategory } from "@/data/businesses";

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => {
        const count = getBusinessesByCategory(category.slug).length;
        return (
          <Link
            key={category.slug}
            href={`/directory?category=${category.slug}`}
            className="group relative overflow-hidden border border-line-strong bg-surface p-5 transition-colors hover:border-amber"
          >
            <div className="flex items-start justify-between">
              <span className="spec-label text-xs text-blueprint">
                {category.code}
              </span>
              <span className="spec-label text-xs text-ink-soft/70">
                {String(count).padStart(2, "0")}개 업체
              </span>
            </div>
            <h3 className="mt-3 text-lg font-bold">{category.label}</h3>
            <p className="mt-1 text-sm text-ink-soft">
              {category.description}
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-amber opacity-0 transition-opacity group-hover:opacity-100">
              목록 보기 →
            </span>
          </Link>
        );
      })}
    </div>
  );
}
