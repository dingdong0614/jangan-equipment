export type Category = {
  slug: string;
  code: string;
  label: string;
  description: string;
};

export type Business = {
  slug: string;
  name: string;
  categorySlug: string;
  since: string;
  ownerLine: string;
  phone: string;
  address: string;
  hours: string;
  specialties: string[];
};

export const categories: Category[] = [
  {
    slug: "boiler",
    code: "BLR",
    label: "보일러",
    description: "가정용·산업용 보일러 설치, 수리, 정기점검",
  },
  {
    slug: "hvac",
    code: "HVAC",
    label: "냉난방·에어컨",
    description: "에어컨 설치, 냉동공조, 환기 시스템 시공",
  },
  {
    slug: "sash",
    code: "SASH",
    label: "샷시·유리",
    description: "창호 샷시 제작·시공, 유리 가공 및 교체",
  },
  {
    slug: "kitchen",
    code: "KTC",
    label: "주방기계",
    description: "업소용 주방기계 제작, 설치, 유지보수",
  },
  {
    slug: "metal",
    code: "MTL",
    label: "철제·판금",
    description: "철제 구조물, 판금 가공, 용접 시공",
  },
  {
    slug: "electric",
    code: "ELC",
    label: "전기설비",
    description: "전기 배선, 분전반, 산업 전기설비 시공",
  },
  {
    slug: "interior",
    code: "INT",
    label: "인테리어",
    description: "매장·주택 인테리어 시공, 리모델링, 마감 공사",
  },
];

// 예시 데이터입니다. 실제 업체 정보로 교체 전까지는 등록 안내용으로만 사용하세요.
export const businesses: Business[] = [
  {
    slug: "jangan-boiler",
    name: "장안보일러설비",
    categorySlug: "boiler",
    since: "2009년 개업",
    ownerLine: "출동은 빠르게, 견적은 정직하게 합니다.",
    phone: "031-000-1001",
    address: "수원시 장안구 정자동",
    hours: "평일 08:00 - 19:00 · 주말 응급출동 가능",
    specialties: ["가정용 보일러 교체", "정기 점검", "누수 수리"],
  },
  {
    slug: "songjuk-thermo",
    name: "송죽열원",
    categorySlug: "boiler",
    since: "2015년 개업",
    ownerLine: "산업용 보일러 정비 20년 경력.",
    phone: "031-000-1002",
    address: "수원시 장안구 송죽동",
    hours: "평일 09:00 - 18:00",
    specialties: ["산업용 보일러", "배관 점검", "부품 교체"],
  },
  {
    slug: "jowon-airtech",
    name: "조원에어텍",
    categorySlug: "hvac",
    since: "2012년 개업",
    ownerLine: "시스템 에어컨 시공은 조원에어텍입니다.",
    phone: "031-000-1003",
    address: "수원시 장안구 조원동",
    hours: "평일 08:30 - 18:30",
    specialties: ["시스템 에어컨 설치", "냉동공조", "환기 시공"],
  },
  {
    slug: "yuljeon-cooling",
    name: "율전냉난방",
    categorySlug: "hvac",
    since: "2018년 개업",
    ownerLine: "당일 견적, 당일 시공 원칙입니다.",
    phone: "031-000-1004",
    address: "수원시 장안구 율전동",
    hours: "평일 09:00 - 19:00",
    specialties: ["가정용 에어컨", "실외기 이전", "냉매 충전"],
  },
  {
    slug: "pajang-sash",
    name: "파장샷시유리",
    categorySlug: "sash",
    since: "2005년 개업",
    ownerLine: "샷시 하나부터 유리 한 장까지 맞춰드립니다.",
    phone: "031-000-1005",
    address: "수원시 장안구 파장동",
    hours: "평일 08:00 - 18:00",
    specialties: ["창호 샷시 제작", "유리 가공", "방충망 교체"],
  },
  {
    slug: "jeongja-glasswork",
    name: "정자유리공방",
    categorySlug: "sash",
    since: "2020년 개업",
    ownerLine: "깨진 유리는 빠르게, 견적은 무료로.",
    phone: "031-000-1006",
    address: "수원시 장안구 정자동",
    hours: "평일 09:00 - 18:00",
    specialties: ["강화유리 교체", "인테리어 유리", "샷시 실리콘 보수"],
  },
  {
    slug: "yeonghwa-kitchen",
    name: "영화주방기계",
    categorySlug: "kitchen",
    since: "2011년 개업",
    ownerLine: "업소용 주방기계 제작·설치 전문입니다.",
    phone: "031-000-1007",
    address: "수원시 장안구 영화동",
    hours: "평일 08:00 - 19:00",
    specialties: ["업소용 냉장고", "후드 시공", "맞춤 스테인리스 제작"],
  },
  {
    slug: "jangan-kitchentech",
    name: "장안키친테크",
    categorySlug: "kitchen",
    since: "2016년 개업",
    ownerLine: "신규 매장 오픈 주방설비 일괄 시공.",
    phone: "031-000-1008",
    address: "수원시 장안구 정자동",
    hours: "평일 09:00 - 18:00",
    specialties: ["신규 매장 주방설비", "가스 배관 연동", "유지보수"],
  },
  {
    slug: "songjuk-metal",
    name: "송죽철재",
    categorySlug: "metal",
    since: "2008년 개업",
    ownerLine: "도면 있으면 그대로, 없으면 같이 만듭니다.",
    phone: "031-000-1009",
    address: "수원시 장안구 송죽동",
    hours: "평일 08:00 - 18:00",
    specialties: ["철제 구조물 제작", "판금 가공", "용접 시공"],
  },
  {
    slug: "jowon-electric",
    name: "조원전기설비",
    categorySlug: "electric",
    since: "2013년 개업",
    ownerLine: "분전반부터 배선까지, 안전점검 꼼꼼히 합니다.",
    phone: "031-000-1010",
    address: "수원시 장안구 조원동",
    hours: "평일 09:00 - 18:00 · 야간 응급출동 가능",
    specialties: ["분전반 교체", "누전 점검", "산업 전기설비"],
  },
  {
    slug: "jeongja-interior",
    name: "정자인테리어",
    categorySlug: "interior",
    since: "2014년 개업",
    ownerLine: "매장 인테리어는 설계부터 시공까지 한 번에.",
    phone: "031-000-1011",
    address: "수원시 장안구 정자동",
    hours: "평일 09:00 - 18:00",
    specialties: ["매장 인테리어", "리모델링", "마감 공사"],
  },
  {
    slug: "yeonghwa-remodel",
    name: "영화리모델링",
    categorySlug: "interior",
    since: "2017년 개업",
    ownerLine: "주택 리모델링, 견적부터 투명하게 안내드립니다.",
    phone: "031-000-1012",
    address: "수원시 장안구 영화동",
    hours: "평일 09:00 - 19:00",
    specialties: ["주택 리모델링", "도배·장판", "욕실 개조"],
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getBusiness(slug: string) {
  return businesses.find((b) => b.slug === slug);
}

export function getBusinessesByCategory(categorySlug: string) {
  return businesses.filter((b) => b.categorySlug === categorySlug);
}
