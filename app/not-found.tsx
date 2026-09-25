import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap py-20 text-center md:py-28">
            <h1 className="font-display text-[30px] text-ink sm:text-[40px]">찾는 페이지가 없어요</h1>
      <p className="mx-auto mt-3 max-w-md text-ink-soft">
        주소가 바뀌었거나 업체 정보가 내려갔을 수 있습니다. 업종이나 동네로 다시 찾아보세요.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/directory" className="btn btn-primary">업체 찾기</Link>
        <Link href="/" className="btn btn-ghost">홈으로</Link>
      </div>
    </div>
  );
}
