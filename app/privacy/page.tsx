import type { Metadata } from "next";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: `개인정보처리방침 — ${SITE.name}`,
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14 text-sm leading-relaxed text-ink-soft">
      <p className="spec-label text-xs text-blueprint">LEGAL</p>
      <h1 className="mt-2 text-3xl font-bold text-ink">개인정보처리방침</h1>
      <p className="mt-4">
        {SITE.name}(이하 &quot;서비스&quot;)는 이용자의 개인정보를 중요시하며,
        아래와 같이 개인정보를 처리하고 있습니다.
      </p>

      <h2 className="mt-8 text-lg font-bold text-ink">1. 수집하는 개인정보 항목 및 방법</h2>
      <p className="mt-2">
        업체 견적 문의: 이름, 연락처, 문의 내용 (문의 폼 입력)
        <br />
        업체 등록 신청: 업체명, 업종, 담당자명, 연락처, 업체 주소, 취급 분야
        (등록 신청 폼 입력)
      </p>

      <h2 className="mt-8 text-lg font-bold text-ink">2. 수집 목적</h2>
      <p className="mt-2">
        고객과 업체 간 견적 문의 연결, 업체 등록 심사 및 안내를 위해
        사용합니다.
      </p>

      <h2 className="mt-8 text-lg font-bold text-ink">3. 보유 및 이용 기간</h2>
      <p className="mt-2">
        수집일로부터 문의 처리 완료 후 1년간 보관하며, 이후 지체 없이
        파기합니다.
      </p>

      <h2 className="mt-8 text-lg font-bold text-ink">4. 제3자 제공</h2>
      <p className="mt-2">
        견적 문의 내용은 문의 대상 업체에 전달되며, 그 외 제3자에게 제공하지
        않습니다.
      </p>

      <h2 className="mt-8 text-lg font-bold text-ink">5. 처리 위탁</h2>
      <p className="mt-2">
        문의 폼 전송을 위해 이메일 전달 서비스(Web3Forms)를 이용하고 있으며,
        해당 서비스는 입력된 정보를 이메일 발송 목적으로만 처리합니다.
      </p>

      <h2 className="mt-8 text-lg font-bold text-ink">6. 파기 절차</h2>
      <p className="mt-2">
        보유 기간이 경과한 개인정보는 전자적 파일 형태의 경우 복구 불가능한
        방법으로 영구 삭제합니다.
      </p>

      <h2 className="mt-8 text-lg font-bold text-ink">7. 정보주체의 권리</h2>
      <p className="mt-2">
        이용자는 언제든지 자신의 개인정보 열람, 정정, 삭제를 요청할 수 있으며,
        아래 연락처로 요청하실 수 있습니다.
      </p>

      <h2 className="mt-8 text-lg font-bold text-ink">8. 개인정보 보호책임자</h2>
      <p className="mt-2">
        이현우 (ceo@doion.co.kr, 010-9786-2433)
      </p>

      <p className="mt-10 border-t border-line pt-6 text-xs">
        본 방침은 법률 자문이 아니며, 실제 서비스 게시 전 전문가 검토를
        권장합니다.
      </p>
    </div>
  );
}
