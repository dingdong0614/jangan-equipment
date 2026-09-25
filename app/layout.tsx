import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TabBar from "@/components/TabBar";
import { SITE } from "@/lib/config";

// 폰트는 셀프호스팅(app/fonts). 라이선스는 docs/credits.md 참고.
// 본문·UI: Pretendard (KS X 1001 서브셋)
const pretendard = localFont({
  variable: "--font-pretendard",
  display: "swap",
  src: [
    { path: "./fonts/Pretendard-Regular.subset.woff2", weight: "400" },
    { path: "./fonts/Pretendard-SemiBold.subset.woff2", weight: "600" },
    { path: "./fonts/Pretendard-Bold.subset.woff2", weight: "700" },
  ],
});

// 큰 제목: Noto Serif KR Bold (KS X 1001 + 업체명 글자 서브셋)
const serifKr = localFont({
  variable: "--font-serif-kr",
  display: "swap",
  preload: false,
  src: [{ path: "./fonts/NotoSerifKR-Bold.subset.woff2", weight: "700" }],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f1ea",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${serifKr.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-amber focus:px-4 focus:py-2 focus:text-on-amber focus:shadow"
        >
          본문으로 건너뛰기
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <TabBar />
      </body>
    </html>
  );
}
