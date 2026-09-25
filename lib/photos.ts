// Unsplash 무료 라이선스 사진 (대표 확인 풀: /home/claude/rework/UNSPLASH_POOL.md). 출처는 docs/image-credits.md.
// 실제 업체 사진이 아니라 업종 분위기 컷이다. 업체 사진처럼 보이게 쓰지 않는다.

export type Photo = { id: string; alt: string; author: string; pos?: string };

export const PHOTOS = {
  plumber: { id: "photo-1609815145871-27e56ba1ea06", alt: "벽돌 벽 앞에서 파이프 작업을 하는 기사", author: "Beth Macdonald" },
  boilerRoom: { id: "photo-1650551182991-b07558247564", alt: "보일러실 배관과 밸브", author: "Immo Wegmann" },
  outdoorUnit: { id: "photo-1718203862467-c33159fdc504", alt: "건물 외벽의 에어컨 실외기", author: "Everett Pachmann" },
  apartment: { id: "photo-1602161100872-7daa350808e3", alt: "창이 줄지어 있는 아파트 외벽", author: "rawkkim", pos: "50% 35%" },
  kitchen: { id: "photo-1618832515490-e181c4794a45", alt: "비닐로 보양해 둔 공사 중인 주방", author: "immo RENOVATION" },
  electrician: { id: "photo-1700727448575-6f1680cd7d75", alt: "클립보드를 들고 설비를 점검하는 기사", author: "TruckRun" },
  metalWork: { id: "photo-1609815145605-d623689a2c95", alt: "금속판을 다듬는 기사", author: "Beth Macdonald" },
  workbench: { id: "photo-1755053757758-e06b6593a320", alt: "공구 선반 앞 작업대에서 일하는 기사", author: "I'M ZION" },
  bathroom: { id: "photo-1584622650111-993a426fbf0a", alt: "리모델링을 마친 욕실", author: "Lotus Design N Print" },
  city: { id: "photo-1708242152350-4c34d2ee5a4d", alt: "아파트와 크레인이 보이는 도시 풍경", author: "IRa Kang" },
  toolbox: { id: "photo-1585569695919-db237e7cc455", alt: "검정과 빨강 공구함", author: "Tekton" },
} satisfies Record<string, Photo>;

export const CATEGORY_PHOTO: Record<string, Photo> = {
  boiler: PHOTOS.boilerRoom,
  hvac: PHOTOS.outdoorUnit,
  sash: PHOTOS.apartment,
  kitchen: PHOTOS.kitchen,
  metal: PHOTOS.metalWork,
  electric: PHOTOS.electrician,
  interior: PHOTOS.bathroom,
};

export function photoUrl(p: Photo, w = 1200) {
  return `https://images.unsplash.com/${p.id}?auto=format&fit=crop&w=${w}&q=80`;
}

export function photoSrcSet(p: Photo, widths = [480, 800, 1200, 1800]) {
  return widths.map((w) => `${photoUrl(p, w)} ${w}w`).join(", ");
}
