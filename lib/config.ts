export const SITE = {
  name: "장안설비대장",
  region: "수원시 장안구",
  tagline: "장안구 설비·제조 업체를 한 곳에 모은 동네 사양서",
  description:
    "보일러, 냉난방, 샷시, 주방기계 등 수원 장안구 설비·제조 소상공인을 찾고 바로 연락할 수 있는 디렉토리입니다.",
  monthlyFee: "월 5만원",
  // 실제 배포 도메인. 커스텀 도메인 연결 시 이 값만 바꾸면 됨(canonical/OG/sitemap 전부 이 값을 참조).
  url: "https://jangan-equipment.vercel.app",
};

// "수원시 장안구 정자동" 같은 주소 문자열에서 동네 이름만 추출한다. (동네 단위 롱테일 SEO용)
export function extractDong(address: string): string {
  const match = address.match(/([가-힣]+동)(?!\S)/);
  return match ? match[1] : address;
}

// TODO: web3forms.com 에서 무료로 발급받은 access key로 교체 (가입 없이 이메일만으로 즉시 발급)
export const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";
