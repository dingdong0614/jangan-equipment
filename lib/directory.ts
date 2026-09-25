import {
  businesses,
  categories,
  type Business,
} from "@/data/businesses";

/** 등재 업체가 있는 동네 목록(업체 수 많은 순). */
export function getDongs(): { dong: string; count: number }[] {
  const map = new Map<string, number>();
  for (const b of businesses) map.set(b.dong, (map.get(b.dong) ?? 0) + 1);
  return [...map.entries()]
    .map(([dong, count]) => ({ dong, count }))
    .sort((a, b) => b.count - a.count || a.dong.localeCompare(b.dong, "ko"));
}

export function isKnownDong(dong: string | undefined): dong is string {
  return !!dong && businesses.some((b) => b.dong === dong);
}

/**
 * 목록 정렬 규칙: 등록 업체(claimed)가 항상 먼저, 그다음 원래 데이터 순서.
 * /join 페이지의 "업종 목록에서 미등록 업체보다 위에 표시" 안내가 이 함수에 근거한다.
 */
export function sortForListing(list: Business[]): Business[] {
  return list
    .map((b, i) => ({ b, i }))
    .sort((x, y) => Number(y.b.claimed) - Number(x.b.claimed) || x.i - y.i)
    .map(({ b }) => b);
}

/** 상세 페이지 하단 "비슷한 업체": 같은 업종, 같은 동네 우선, 등록 업체 우선. */
export function getRelated(current: Business, limit = 6): Business[] {
  return businesses
    .filter((b) => b.categorySlug === current.categorySlug && b.slug !== current.slug)
    .map((b, i) => ({ b, i }))
    .sort(
      (x, y) =>
        Number(y.b.claimed) - Number(x.b.claimed) ||
        Number(y.b.dong === current.dong) - Number(x.b.dong === current.dong) ||
        x.i - y.i
    )
    .slice(0, limit)
    .map(({ b }) => b);
}

export const categoryCount = (slug: string) =>
  businesses.filter((b) => b.categorySlug === slug).length;

export { businesses, categories };
