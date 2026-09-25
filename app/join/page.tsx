import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, Check, Minus, Phone } from "lucide-react";
import JoinForm from "@/components/JoinForm";
import Pic from "@/components/Pic";
import { SURVEY } from "@/data/mapTypes";
import { PHOTOS } from "@/lib/photos";
import { businesses } from "@/lib/directory";
import { SITE, OPERATOR } from "@/lib/config";

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

// 답변은 사이트에 이미 공개된 정보(SITE.monthlyFee, SITE.region)와 등록 원칙 문서의 사실만 사용한다.
// 검색 순위·문의 건수 보장 같은 표현은 쓰지 않는다(표시광고법).
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
  {
    q: "제 가게가 이미 올라가 있던데, 동의한 적이 없어요.",
    a: `공개된 지도 정보를 참고해 상호·업종·위치만 "미등록 업체"로 표시하고 있으며, 연락처는 게시하지 않습니다. 원하지 않으시면 전화(${OPERATOR.phone})나 이메일(${OPERATOR.email})로 알려주세요. 바로 수정하거나 내려드립니다.`,
  },
  {
    q: "등록하면 검색 결과 상위에 나오나요?",
    a: `네이버·구글 같은 검색엔진 순위는 저희가 정할 수 없어 약속드리지 않습니다. ${SITE.name} 안의 업종 목록에서는 등록 업체가 미등록 업체보다 위에 표시됩니다.`,
  },
];

const COMPARE: [string, boolean][] = [
  ["상호·업종·동네·주소", true],
  ["전화 버튼", false],
  ["영업시간", false],
  ["하는 일·한 줄 소개", false],
  ["견적 문의 폼", false],
  ["업종 목록에서 미등록 업체보다 위", false],
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* 사진 히어로 */}
      <section className="relative overflow-hidden bg-ink">
        <Pic photo={PHOTOS.plumber} sizes="100vw" eager className="absolute inset-0 opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" aria-hidden />
        <div className="relative wrap pb-12 pt-16 text-white md:pb-20 md:pt-28">
          <p className="text-[15px] font-semibold text-white/85">장안구 설비·인테리어 사장님께</p>
          <h1 className="font-display mt-3 max-w-3xl text-[30px] sm:text-[42px] lg:text-[52px]">
            보일러 멈춘 손님은
            <br />
            아는 데 말고, 검색해서
            <br />
            위에서부터 전화합니다.
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/90 md:text-[17px]">
            장안설비대장에는 장안구 업체 {businesses.length}곳이 상호와 위치만으로 올라가 있습니다.
            사장님 가게도 있을 수 있어요. 등록하시면 거기에 전화번호가 붙습니다.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={OPERATOR.tel} className="btn btn-primary">
              <Phone size={18} aria-hidden />
              {OPERATOR.phone} 전화 상담
            </a>
            <a href="#apply" className="btn border border-white/60 text-white hover:border-white">
              신청서 쓰기 <ArrowDown size={16} aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {/* 실제 조사 숫자 */}
      <section className="wrap section-y grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
        <div>
          <h2 className="font-display text-[26px] text-ink md:text-[34px]">
            지도에서 {SURVEY.suwonSample}곳을
            <br />
            하나씩 열어 봤습니다
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-body">
            {SURVEY.date}, 수원 4개 구의 보일러·에어컨·샷시·싱크대·전기·인테리어·설비 업체를{" "}
            {SURVEY.source}으로 직접 찾아봤어요. 지도에 이름은 있어도 그 밖에는 가게를 알 방법이 없는 곳이 대부분이었습니다.
          </p>
          <p className="mt-3 text-[13px] text-ink-soft">
            출처: {SURVEY.date} {SURVEY.source} 기준, 수원 4개 구 {SURVEY.suwonSample}곳 표본(전수 아님)
          </p>
        </div>
        <dl className="border-t-2 border-ink">
          {[
            [`${SURVEY.noChannel}곳`, SURVEY.noChannelPct, "홈페이지·블로그 같은 자기 채널이 없거나, 본사 사이트 링크만 걸려 있음"],
            [`${SURVEY.noPhone}곳`, SURVEY.noPhonePct, "지도에 전화번호조차 올라가 있지 않음"],
            [`${SURVEY.electricNoChannel}곳`, `${SURVEY.electricSuwon}곳 중`, "전기공사 업체 가운데 자기 채널이 없는 곳"],
          ].map(([n, sub, d]) => (
            <div key={d} className="grid grid-cols-[110px_1fr] gap-4 border-b border-line py-5 sm:grid-cols-[150px_1fr]">
              <dt className="order-2 self-center text-[15px] leading-relaxed text-ink-body">{d}</dt>
              <dd className="order-1">
                <span className="tnum block text-[32px] font-bold leading-none text-amber sm:text-[40px]">{n}</span>
                <span className="mt-1 block text-[13px] text-ink-soft">{sub}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 등록 전후 + 사진 */}
      <section className="border-y border-line-strong bg-bg-1">
        <div className="wrap section-y grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center md:gap-14">
          <div>
            <h2 className="font-display text-[26px] text-ink md:text-[34px]">등록하면 사장님 줄에 붙는 것</h2>
            <p className="mt-3 text-ink-body">
              현장에 계셔서 전화를 못 받아도, 손님이 페이지에서 영업시간과 하시는 일을 보고 다시 걸 수
              있습니다. 문의 폼으로 남겨 두는 손님도 있고요.
            </p>
            <table className="mt-6 w-full border-t-2 border-ink text-left text-[15px]">
              <caption className="sr-only">미등록과 등록 시 표시 항목 비교</caption>
              <thead>
                <tr className="border-b border-line-strong text-[14px] text-ink-soft">
                  <th scope="col" className="py-2.5 pr-3 font-semibold">표시 항목</th>
                  <th scope="col" className="w-20 py-2.5 text-center font-semibold">지금</th>
                  <th scope="col" className="w-20 py-2.5 text-center font-bold text-amber">등록 후</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(([label, before]) => (
                  <tr key={label} className="border-b border-line">
                    <th scope="row" className="py-3 pr-3 font-normal text-ink">{label}</th>
                    <td className="py-3 text-center">
                      {before ? (
                        <Check size={18} className="mx-auto text-teal" aria-label="표시" />
                      ) : (
                        <Minus size={18} className="mx-auto text-ink-soft" aria-label="표시 안 함" />
                      )}
                    </td>
                    <td className="py-3 text-center">
                      <Check size={18} className="mx-auto text-amber" aria-label="표시" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-[14px] text-ink-soft">
              검색엔진이 읽는 업체 정보(구조화 데이터)에도 전화번호가 들어갑니다. {SITE.monthlyFee}.
            </p>
          </div>
          <div className="relative h-[260px] overflow-hidden rounded-md md:h-[440px]">
            <Pic photo={PHOTOS.toolbox} sizes="(min-width: 768px) 40vw, 100vw" className="absolute inset-0" />
          </div>
        </div>
      </section>

      {/* 솔직한 한계 + 순서 */}
      <section className="wrap section-y grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        <div className="border-l-4 border-amber pl-5">
          <h2 className="font-display text-[24px] text-ink md:text-[30px]">순위는 약속 못 드립니다</h2>
          <p className="mt-3 text-[16px] leading-relaxed text-ink-body">
            검색 순위는 저희가 아니라 네이버·구글·AI가 정합니다. &quot;몇 위 보장&quot;은 누구도 할 수
            없어요. 저희가 약속할 수 있는 건 정확한 정보를 올려 두고 계속 관리하는 것까지입니다.
          </p>
        </div>
        <div>
          <h2 className="font-display text-[24px] text-ink md:text-[30px]">신청하면 이렇게 진행돼요</h2>
          <ol className="mt-4 space-y-4 text-[16px] text-ink-body">
            <li className="flex gap-4">
              <span className="tnum w-6 flex-none text-[20px] font-bold text-amber">1</span>
              <span>아래 신청서를 보내시거나 전화 주세요. 확인하고 연락드립니다.</span>
            </li>
            <li className="flex gap-4">
              <span className="tnum w-6 flex-none text-[20px] font-bold text-amber">2</span>
              <span>실을 내용을 같이 정하고, 계약서·등록신청서·개인정보 수집·이용 및 공개 동의서에 서명합니다.</span>
            </li>
            <li className="flex gap-4">
              <span className="tnum w-6 flex-none text-[20px] font-bold text-amber">3</span>
              <span>사장님이 주신 정보만 올립니다. 바꿀 게 생기면 언제든 말씀하세요.</span>
            </li>
          </ol>
        </div>
      </section>

      {/* 신청서 + FAQ */}
      <section className="wrap grid grid-cols-1 gap-12 pb-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
        <div id="apply" className="scroll-mt-24">
          <h2 className="font-display rule-heavy pt-3 text-[26px] text-ink md:text-[34px]">업체 등록 신청</h2>
          <p className="mt-3 text-ink-body">
            {SITE.region}에서 영업 중인 설비·제조 업체라면 {SITE.monthlyFee} 이용료로 등록할 수
            있습니다. 폼이 번거로우시면{" "}
            <a href={OPERATOR.tel} className="font-bold text-amber underline">
              {OPERATOR.phone}
            </a>
            로 바로 전화 주세요.
          </p>
          <div className="mt-6">
            <JoinForm monthlyFee={SITE.monthlyFee} />
          </div>
        </div>

        <div>
          <h2 className="font-display rule-heavy pt-3 text-[26px] text-ink md:text-[34px]">자주 묻는 질문</h2>
          <dl className="mt-2">
            {FAQ.map((item) => (
              <div key={item.q} className="border-b border-line py-5">
                <dt className="text-[16px] font-bold text-ink">{item.q}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-ink-body">{item.a}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-[15px] text-ink-soft">
            손님으로 오셨나요?{" "}
            <Link href="/directory" className="font-semibold text-amber underline">
              업체 찾기로 가기
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
