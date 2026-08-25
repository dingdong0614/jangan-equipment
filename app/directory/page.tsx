import type { Metadata } from "next";
import DirectoryClient from "@/components/DirectoryClient";
import { getCategory } from "@/data/businesses";
import { SITE } from "@/lib/config";

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
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const category =
    params.category && getCategory(params.category) ? params.category : undefined;
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

  // 검색엔진이 /directory?category=X 링크로 직접 들어왔을 때를 위한 구조화 데이터.
  // (카테고리 버튼 클릭으로 인한 클라이언트 사이드 필터링은 URL을 바꾸지 않으므로 여기서 반영되지 않음 — 아래 참고)
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

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <p className="spec-label text-xs text-blueprint">DIRECTORY</p>
      <h1 className="mt-2 text-3xl font-bold">업체 디렉토리</h1>
      <p className="mt-2 text-ink-soft">
        {SITE.region} 설비·제조 업체를 업종별로 찾아보세요.
      </p>

      <div className="mt-10">
        <DirectoryClient initialCategory={initialCategory} />
      </div>
    </div>
  );
}
