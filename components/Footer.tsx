import Link from "next/link";
import { SITE, OPERATOR } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="mt-16 border-t-[3px] border-ink bg-bg-1">
      <div className="wrap grid gap-8 py-10 text-[15px] md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl text-ink">{SITE.name}</p>
          <p className="mt-2 max-w-sm text-ink-soft">
            파장동부터 연무동까지, 장안구에서 일하는 설비·인테리어 업체를 업종과 동네로 모았습니다.
          </p>
        </div>

        <nav aria-label="하단 링크" className="flex flex-col">
          <Link href="/directory" className="py-1.5 text-ink-body hover:text-amber">업체 찾기</Link>
          <Link href="/join" className="py-1.5 text-ink-body hover:text-amber">사장님 등록 안내</Link>
          <Link href="/privacy" className="py-1.5 text-ink-body hover:text-amber">개인정보처리방침</Link>
        </nav>

        <div className="text-ink-body">
          <p>등록 상담·정보 수정 요청</p>
          <a href={OPERATOR.tel} className="inline-block py-1 font-bold text-ink hover:text-amber">
            {OPERATOR.phone}
          </a>
          <br />
          <a href={`mailto:${OPERATOR.email}`} className="inline-block py-1 text-ink hover:text-amber">
            {OPERATOR.email}
          </a>
        </div>
      </div>
      <div className="wrap border-t border-line py-5 text-[13px] leading-relaxed text-ink-soft">
        <p>
          &quot;미등록&quot;으로 표시된 업체는 공개된 지도 정보를 참고해 상호·업종·위치만 보여드리며,
          사실과 다를 수 있습니다. 연락처는 사장님이 직접 등록한 경우에만 싣습니다. 수정이나 삭제를
          원하시면 위 연락처로 알려주세요.
        </p>
        <p className="mt-2">사진: Unsplash (업종 분위기 사진이며 실제 업체 사진이 아닙니다)</p>
      </div>
    </footer>
  );
}
