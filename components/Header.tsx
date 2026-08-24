import Link from "next/link";
import { SITE } from "@/lib/config";

const NAV = [
  { href: "/directory", label: "업체 디렉토리" },
  { href: "/join", label: "업체 등록 신청" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line-strong bg-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-mono text-xs text-amber-strong spec-label">
            JANGAN-GU
          </span>
          <span className="text-lg font-bold tracking-tight">
            {SITE.name}
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ink-soft transition-colors hover:text-amber"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
