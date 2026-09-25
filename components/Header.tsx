import Link from "next/link";
import { Phone } from "lucide-react";
import { SITE, OPERATOR } from "@/lib/config";

const NAV = [
  { href: "/directory", label: "업체 찾기" },
  { href: "/join", label: "사장님 등록 안내" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line-strong bg-bg">
      <div className="wrap flex h-14 items-center justify-between gap-4 md:h-16">
        <Link href="/" className="flex min-h-11 items-baseline gap-2" aria-label={`${SITE.name} 홈`}>
          <span className="font-display text-[21px] text-ink md:text-[23px]">{SITE.name}</span>
          <span className="hidden text-[13px] text-ink-soft lg:inline">수원 장안구 설비·인테리어 업체 모음</span>
        </Link>

        <nav aria-label="주요 메뉴" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2.5 text-[15px] font-semibold text-ink-body hover:text-amber"
            >
              {item.label}
            </Link>
          ))}
          <a href={OPERATOR.tel} className="btn btn-ghost ml-2 !min-h-11 !px-4 !text-sm">
            <Phone size={15} aria-hidden />
            등록 상담 {OPERATOR.phone}
          </a>
        </nav>

        <Link
          href="/join"
          className="flex min-h-11 items-center px-1 text-[14px] font-bold text-amber md:hidden"
        >
          사장님 등록
        </Link>
      </div>
    </header>
  );
}
