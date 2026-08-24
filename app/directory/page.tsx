import type { Metadata } from "next";
import DirectoryClient from "@/components/DirectoryClient";
import { getCategory } from "@/data/businesses";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: `업체 디렉토리 — ${SITE.name}`,
};

type PageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function DirectoryPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const initialCategory =
    params.category && getCategory(params.category) ? params.category : "all";

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
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
