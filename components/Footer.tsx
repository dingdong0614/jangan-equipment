import Link from "next/link";
import { SITE } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-graphite bg-graphite text-paper">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-amber spec-label">
              {SITE.region}
            </p>
            <p className="mt-1 font-semibold">{SITE.name}</p>
          </div>
          <nav className="flex gap-6 text-paper/70">
            <Link href="/directory" className="hover:text-amber">
              업체 디렉토리
            </Link>
            <Link href="/join" className="hover:text-amber">
              업체 등록 신청
            </Link>
            <Link href="/privacy" className="hover:text-amber">
              개인정보처리방침
            </Link>
          </nav>
        </div>
        <p className="mt-6 text-xs text-paper/50">
          현재 등록된 업체 정보는 서비스 소개를 위한 예시 데이터입니다. 실제
          업체 등록은 &quot;업체 등록 신청&quot;을 통해 접수받고 있습니다.
        </p>
      </div>
    </footer>
  );
}
