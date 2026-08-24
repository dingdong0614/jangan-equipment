import { WEB3FORMS_ACCESS_KEY } from "@/lib/config";

export async function submitToWeb3Forms(fields: Record<string, string>) {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, ...fields }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "전송에 실패했습니다.");
  return data;
}
