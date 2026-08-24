import Link from "next/link";
import type { Business } from "@/data/businesses";
import { getCategory } from "@/data/businesses";

export default function BusinessRow({ business }: { business: Business }) {
  const category = getCategory(business.categorySlug);

  return (
    <Link
      href={`/directory/${business.slug}`}
      className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-paper-line px-2 py-4 transition-colors hover:bg-graphite/5 sm:px-4"
    >
      <span className="spec-label hidden text-xs text-blueprint sm:block">
        {category?.code}
      </span>
      <div>
        <p className="font-semibold">{business.name}</p>
        <p className="mt-0.5 text-sm text-graphite-soft">
          {category?.label} · {business.address}
        </p>
      </div>
      <span className="spec-label text-xs text-amber-strong opacity-0 transition-opacity group-hover:opacity-100">
        상세 →
      </span>
    </Link>
  );
}
