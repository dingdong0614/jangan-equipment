import Link from "next/link";
import { Phone } from "lucide-react";
import type { Business } from "@/data/businesses";
import { getCategory } from "@/data/businesses";
import { MAP_TYPE } from "@/data/mapTypes";

// 전화번호부 한 줄: 상호 / 업종 / 동 / 도로명. 등록 업체만 오른쪽에 전화 버튼.
export default function BusinessRow({ business }: { business: Business }) {
  const category = getCategory(business.categorySlug);
  const canCall = business.claimed && !!business.phone;
  const street = business.address.replace("경기 수원시 장안구 ", "");

  return (
    <li className="flex items-stretch border-b border-line">
      <Link
        href={`/directory/${business.slug}`}
        className="grid min-w-0 flex-1 gap-x-4 py-3 hover:bg-bg-1 md:grid-cols-[minmax(0,1.4fr)_120px_80px_minmax(0,1fr)] md:items-baseline md:px-2"
      >
        <span className="min-w-0">
          <span className="text-[16px] font-semibold text-ink">{business.name}</span>
          {!business.claimed && (
            <span className="ml-2 align-[1px] text-[13px] text-ink-soft">미등록</span>
          )}
        </span>
        <span className="hidden text-[14px] text-ink-body md:block">
          {MAP_TYPE[business.slug] ?? category?.label}
        </span>
        <span className="hidden text-[14px] font-medium text-ink md:block">{business.dong}</span>
        <span className="mt-0.5 truncate text-[14px] text-ink-soft md:mt-0">
          <span className="md:hidden">
            {category?.label} · {business.dong} ·{" "}
          </span>
          {street}
        </span>
      </Link>
      {canCall && (
        <a
          href={`tel:${business.phone!.replace(/-/g, "")}`}
          aria-label={`${business.name}에 전화 걸기`}
          className="my-2 ml-2 flex flex-none items-center gap-1.5 rounded-md bg-amber px-3 text-[14px] font-bold text-on-amber"
        >
          <Phone size={16} aria-hidden />
          <span className="hidden sm:inline">{business.phone}</span>
        </a>
      )}
    </li>
  );
}
