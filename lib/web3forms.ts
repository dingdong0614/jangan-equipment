import { WEB3FORMS_ACCESS_KEY } from "@/lib/config";

// 같은 브라우저에서 짧은 시간에 반복 전송하는 것을 막는 간단한 클라이언트 제한.
// (서버 측 제한은 Web3Forms 자체 스팸 필터에 의존. 서버 라우트 전환은 docs/security.md 참고)
const MIN_INTERVAL_MS = 30_000;
let lastSentAt = 0;

export async function submitToWeb3Forms(
  fields: Record<string, string>,
  opts: { honeypot?: boolean } = {}
) {
  // 봇이 숨김 필드를 채운 경우: 조용히 성공 처리하고 실제로는 보내지 않는다.
  if (opts.honeypot) return { success: true };

  const now = Date.now();
  if (now - lastSentAt < MIN_INTERVAL_MS) {
    throw new Error("잠시 후 다시 시도해 주세요.");
  }

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, botcheck: false, ...fields }),
  });
  const data = await res.json().catch(() => ({ success: false }));
  if (!data.success) {
    throw new Error("전송에 실패했습니다. 전화나 이메일로 연락 주세요.");
  }
  lastSentAt = now;
  return data;
}

/** 입력값 검증: 앞뒤 공백 제거, 길이 제한, 전화번호 형식. 실패 시 사람 말로 된 메시지를 돌려준다. */
export function clean(value: FormDataEntryValue | null, max: number) {
  return String(value ?? "").trim().slice(0, max);
}

export function isPhone(v: string) {
  return /^0\d{1,2}-?\d{3,4}-?\d{4}$/.test(v.replace(/\s/g, ""));
}
