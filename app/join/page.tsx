import type { Metadata } from "next";
import JoinForm from "@/components/JoinForm";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: `업체 등록 신청 — ${SITE.name}`,
};

export default function JoinPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <p className="spec-label text-xs text-blueprint">FOR BUSINESS OWNERS</p>
      <h1 className="mt-2 text-3xl font-bold">업체 등록 신청</h1>
      <p className="mt-2 text-ink-soft">
        {SITE.region}에서 영업 중인 설비·제조 업체라면 무료로 등록할 수
        있습니다. 신청 내용을 확인 후 담당자가 연락드립니다.
      </p>

      <div className="mt-8">
        <JoinForm />
      </div>
    </div>
  );
}
