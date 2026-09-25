"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, LayoutGrid, Search, Store } from "lucide-react";

const TABS = [
  { href: "/", label: "홈", Icon: House, match: (p: string) => p === "/" },
  {
    href: "/directory",
    label: "업종",
    Icon: LayoutGrid,
    match: (p: string) => p === "/directory",
  },
  {
    href: "/directory?focus=search",
    label: "검색",
    Icon: Search,
    match: () => false,
  },
  { href: "/join", label: "사장님", Icon: Store, match: (p: string) => p === "/join" },
];

// 모바일 전용 하단 탭바. 업체 상세 페이지에서는 상세 전용 행동 바가 대신 뜬다.
export default function TabBar() {
  const pathname = usePathname() ?? "/";
  if (pathname.startsWith("/directory/")) return null;

  return (
    <nav aria-label="하단 메뉴" className="tabbar md:hidden">
      {TABS.map(({ href, label, Icon, match }) => (
        <Link key={label} href={href} aria-current={match(pathname) ? "page" : undefined}>
          <Icon size={22} strokeWidth={1.75} aria-hidden />
          {label}
        </Link>
      ))}
    </nav>
  );
}
