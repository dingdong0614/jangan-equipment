import type { Metadata } from "next";
import { OPERATOR, SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: `개인정보처리방침 — ${SITE.name}`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="wrap max-w-3xl py-12 text-[15px] leading-relaxed text-ink-body md:py-16">
      <h1 className="font-display text-[30px] text-ink sm:text-[36px]">개인정보처리방침</h1>
      <p className="mt-4">
        {SITE.name}(이하 &quot;서비스&quot;)는 이용자의 개인정보를 중요시하며,
        아래와 같이 개인정보를 처리하고 있습니다.
      </p>

      <h2 className="mt-10 text-lg font-bold text-ink">1. 수집하는 개인정보 항목 및 방법</h2>
      <p className="mt-2">
        업체 견적 문의: 이름, 연락처, 문의 내용 (문의 폼 입력)
        <br />
        업체 등록 신청: 업체명, 업종, 담당자명, 연락처, 업체 주소, 취급 분야
        (등록 신청 폼 입력)
      </p>

      <h2 className="mt-10 text-lg font-bold text-ink">2. 수집 목적</h2>
      <p className="mt-2">
        고객과 업체 간 견적 문의 연결, 업체 등록 심사 및 안내를 위해
        사용합니다.
      </p>

      <h2 className="mt-10 text-lg font-bold text-ink">3. 보유 및 이용 기간</h2>
      <p className="mt-2">
        견적 문의와 업체 등록 신청 내용은 문의 처리 완료 후 1년간 보관한 뒤
        지체 없이 파기합니다. 단, 관계 법령에 따라 보존할 필요가 있는 경우
        해당 법령에서 정한 기간 동안 보관합니다.
      </p>

      <h2 className="mt-10 text-lg font-bold text-ink">4. 제3자 제공</h2>
      <p className="mt-2">
        견적 문의 내용은 문의 대상 업체에 전달되며, 그 외 제3자에게 제공하지
        않습니다.
      </p>

      <h2 className="mt-10 text-lg font-bold text-ink">5. 처리 위탁 및 국외 이전</h2>
      <p className="mt-2">
        원활한 문의 접수와 서비스 운영을 위해 아래와 같이 개인정보 처리 업무를
        위탁하고 있으며, 이 과정에서 개인정보가 국외로 이전됩니다.
      </p>
      <ul className="mt-3 list-disc space-y-3 pl-5">
        <li>
          <strong className="text-ink">Web3Creative(Web3Forms 운영사, 인도)</strong>,
          서버: Amazon Web Services, Cloudflare, Hetzner
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>위탁 업무: 문의 폼 데이터 전달 및 알림 메일 발송</li>
            <li>
              이전 항목: (견적 문의) 문의 대상 업체명, 이름, 연락처, 문의 내용 /
              (업체 등록 신청) 업체명, 업종, 담당자명, 연락처, 업체 주소, 취급 분야
            </li>
            <li>이전 시기·방법: 폼 제출 시 네트워크를 통해 전송</li>
            <li>
              보유 기간: Web3Forms 방침상 제출일부터 최대 3년 보관 후 자동
              삭제되며, 서비스는 문의 처리 완료 후 1년이 지나면 삭제를 요청하거나
              직접 삭제합니다.
            </li>
          </ul>
        </li>
        <li>
          <strong className="text-ink">Vercel Inc.(미국)</strong>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>위탁 업무: 웹사이트 호스팅</li>
            <li>이전 항목: 접속 IP 등 접속 기록</li>
            <li>이전 시기·방법: 사이트 접속 시 네트워크를 통해 전송</li>
            <li>보유 기간: 위탁 계약 종료 시까지</li>
          </ul>
        </li>
      </ul>
      <p className="mt-3">
        개인정보의 국외 이전을 원하지 않으시면 온라인 문의 대신 전화(
        {OPERATOR.phone})로 문의하실 수 있습니다.
      </p>

      <h2 className="mt-10 text-lg font-bold text-ink">6. 파기 절차</h2>
      <p className="mt-2">
        보유 기간이 경과한 개인정보는 전자적 파일 형태의 경우 복구 불가능한
        방법으로 영구 삭제합니다.
      </p>

      <h2 className="mt-10 text-lg font-bold text-ink">7. 정보주체의 권리</h2>
      <p className="mt-2">
        이용자는 언제든지 자신의 개인정보 열람, 정정, 삭제를 요청할 수 있으며,
        아래 연락처로 요청하실 수 있습니다.
      </p>

      <h2 className="mt-10 text-lg font-bold text-ink">8. 개인정보 보호책임자</h2>
      <p className="mt-2">
        이현우 (ceo@doion.co.kr, 010-9786-2433)
      </p>

      <p className="mt-10 border-t border-line pt-6 text-xs text-ink-soft">
        공고일자: 2026-09-26 / 시행일자: 2026-10-03
        <br />
        이전 방침: 2026-08-24 시행
        <br />
        본 방침은 법률 자문이 아니며, 실제 서비스 게시 전 전문가 검토를
        권장합니다.
      </p>
    </div>
  );
}
