import type { Metadata } from "next";
import JoinForm from "@/components/JoinForm";
import { SITE } from "@/lib/config";

const title = `설비업체 등록 신청 — ${SITE.name}`;
const description = `${SITE.region}에서 영업 중인 설비·제조 업체라면 ${SITE.name}에 등록해 온라인으로 새 고객을 만나보세요.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/join",
  },
  openGraph: {
    title,
    description,
    url: "/join",
  },
};

// 답변은 사이트에 이미 공개된 정보(SITE.monthlyFee, SITE.region)만 사용한다.
// 확인되지 않은 정책은 지어내지 않고 중립적인 문구로 남긴다.
const FAQ = [
  {
    q: "장안구에서 설비 업체가 필요하면 어떻게 찾나요?",
    a: `${SITE.name}의 업체 디렉토리에서 보일러·냉난방·샷시 등 업종별로 등록된 업체를 확인하고 바로 연락하실 수 있습니다.`,
  },
  {
    q: "업체 등록 비용은 얼마인가요?",
    a: `${SITE.monthlyFee} 이용료로 등록하실 수 있으며, 신청 후 담당자 확인을 거쳐 승인됩니다.`,
  },
  {
    q: "장안구 외 지역 업체도 등록할 수 있나요?",
    a: `현재는 ${SITE.region} 소재 업체를 중심으로 운영하고 있습니다. 다른 지역은 등록 신청 폼을 통해 문의해 주시면 확인 후 안내드립니다.`,
  },
];

export default function JoinPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <p className="spec-label text-xs text-blueprint">FOR BUSINESS OWNERS</p>
      <h1 className="mt-2 text-3xl font-bold">업체 등록 신청</h1>
      <p className="mt-2 text-ink-soft">
        {SITE.region}에서 영업 중인 설비·제조 업체라면 {SITE.monthlyFee}{" "}
        이용료로 등록할 수 있습니다. 신청 내용을 확인 후 담당자가
        연락드립니다.
      </p>

      <div className="mt-8">
        <JoinForm monthlyFee={SITE.monthlyFee} />
      </div>

      <div className="mt-14 border-t border-line-strong pt-8">
        <p className="spec-label text-xs text-blueprint">자주 묻는 질문</p>
        <dl className="mt-4 space-y-6">
          {FAQ.map((item) => (
            <div key={item.q}>
              <dt className="font-semibold">{item.q}</dt>
              <dd className="mt-1 text-sm text-ink-soft">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
