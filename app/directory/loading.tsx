// 디렉토리 이동 중 스켈레톤 (흰 화면·스피너 대신)
export default function Loading() {
  return (
    <div className="wrap pb-8 pt-5 md:pt-8" aria-busy="true" aria-label="업체 목록을 불러오는 중">
      <div className="skel h-[120px] w-full md:h-[180px]" />
      <div className="skel mt-5 h-9 w-72 max-w-full" />
      <div className="skel mt-6 h-11 w-full" />
      <ul className="mt-6 border-t-2 border-ink">
        {Array.from({ length: 8 }).map((_, i) => (
          <li key={i} className="border-b border-line py-3">
            <div className="skel h-4 w-1/2" />
            <div className="skel mt-2 h-3 w-3/4" />
          </li>
        ))}
      </ul>
    </div>
  );
}
