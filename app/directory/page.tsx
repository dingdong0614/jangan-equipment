import type { Metadata } from "next";
import DirectoryClient from "@/components/DirectoryClient";
import { getCategory } from "@/data/businesses";
import { isKnownDong } from "@/lib/directory";
import { SITE } from "@/lib/config";
import Pic from "@/components/Pic";
import { CATEGORY_PHOTO, PHOTOS } from "@/lib/photos";

// 카테고리별 SEO 문구. 키워드는 clients/장안설비대장_SEO_키워드_프롬프트_2026-08.md 1-2 참고.
const CATEGORY_SEO: Record<string, { title: string; description: string }> = {
  boiler: {
    title: `장안구 보일러 수리·설치 업체 모음 — ${SITE.name}`,
    description:
      "수원 장안구(정자동·송죽동·조원동·율전동·파장동)에서 활동 중인 보일러 수리·설치 업체를 모아뒀습니다. 지금 바로 연락하세요.",
  },
  hvac: {
    title: `장안구 에어컨·냉난방 업체 모음 — ${SITE.name}`,
    description:
      "수원 장안구에서 활동 중인 에어컨·냉난방 설치·수리 업체를 모아뒀습니다.",
  },
  sash: {
    title: `장안구 샷시·유리 시공 업체 모음 — ${SITE.name}`,
    description: "수원 장안구 샷시·창호·유리 시공 업체를 한눈에 확인하세요.",
  },
  kitchen: {
    title: `장안구 주방기계·업소용 주방설비 업체 모음 — ${SITE.name}`,
    description: "수원 장안구 업소용 주방기계 설치·정비 업체를 모아뒀습니다.",
  },
  metal: {
    title: `장안구 철제·판금 업체 모음 — ${SITE.name}`,
    description: "수원 장안구 철제 가공·판금 업체를 확인하세요.",
  },
  electric: {
    title: `장안구 전기설비·전기공사 업체 모음 — ${SITE.name}`,
    description: "수원 장안구 전기설비·전기공사 업체를 모아뒀습니다.",
  },
  interior: {
    title: `장안구 인테리어 시공 업체 모음 — ${SITE.name}`,
    description: "수원 장안구 상가·주택 인테리어 시공 업체를 확인하세요.",
  },
};

type PageProps = {
  searchParams: Promise<{ category?: string; dong?: string; q?: string; focus?: string }>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const category =
    params.category && getCategory(params.category) ? params.category : undefined;
  // canonical은 업종 단위까지만. 동네·검색어 조합은 /directory 또는 업종 URL로 모은다.
  const canonicalPath = category
    ? `/directory?category=${category}`
    : "/directory";
  const seo = category ? CATEGORY_SEO[category] : undefined;
  const title = seo?.title ?? `업체 디렉토리 — ${SITE.name}`;
  const description =
    seo?.description ?? `${SITE.region} 설비·제조 업체를 업종별로 찾아보세요.`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url: canonicalPath,
    },
  };
}

export default async function DirectoryPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const initialCategory =
    params.category && getCategory(params.category) ? params.category : "all";
  const activeCategory =
    initialCategory !== "all" ? getCategory(initialCategory) : undefined;
  const initialDong = isKnownDong(params.dong) ? params.dong : "all";
  const initialQuery = (params.q ?? "").slice(0, 40);

  // 검색엔진이 /directory?category=X 링크로 직접 들어왔을 때를 위한 구조화 데이터.
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: SITE.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "업체 디렉토리",
        item: `${SITE.url}/directory`,
      },
      ...(activeCategory
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: activeCategory.label,
              item: `${SITE.url}/directory?category=${activeCategory.slug}`,
            },
          ]
        : []),
    ],
  };

  const photo = activeCategory ? CATEGORY_PHOTO[activeCategory.slug] : PHOTOS.plumber;

  return (
    <div className="wrap pb-8 pt-5 md:pt-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-end md:gap-10">
        <div className="order-2 md:order-1">
          <h1 className="font-display text-[28px] text-ink sm:text-[38px]">
            {activeCategory ? `장안구 ${activeCategory.label} 업체` : "장안구 설비·인테리어 업체"}
          </h1>
          <p className="mt-2 max-w-xl text-ink-body">
            {activeCategory
              ? `${activeCategory.description}. 동네를 고르면 가까운 곳만 남아요.`
              : "업종 탭을 누르고, 동네를 고르면 가까운 곳만 남아요. 직접 등록한 업체는 맨 위에 전화번호와 함께 나옵니다."}
          </p>
        </div>
        <div className="relative order-1 h-[120px] overflow-hidden rounded-md md:order-2 md:h-[180px]">
          <Pic photo={photo} sizes="(min-width: 768px) 50vw, 100vw" eager className="absolute inset-0" />
        </div>
      </div>

      <div className="mt-6">
        <DirectoryClient
          key={`${initialCategory}|${initialDong}|${initialQuery}|${params.focus ?? ""}`}
          initialCategory={initialCategory}
          initialDong={initialDong}
          initialQuery={initialQuery}
          autoFocusSearch={params.focus === "search"}
        />
      </div>
    </div>
  );
}
