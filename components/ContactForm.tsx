"use client";

import { useState, type FormEvent } from "react";
import { clean, isPhone, submitToWeb3Forms } from "@/lib/web3forms";

type Status = "idle" | "sending" | "success" | "error";

const field =
  "mt-1.5 w-full rounded-md border border-line-strong bg-surface px-4 py-3 text-[16px] text-ink outline-none transition-colors placeholder:text-ink-soft focus:border-amber";

export default function ContactForm({ businessName }: { businessName: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = clean(form.get("name"), 30);
    const phone = clean(form.get("phone"), 20);
    const message = clean(form.get("message"), 1000);
    if (!name || !message) {
      setStatus("error");
      setError("이름과 문의 내용을 적어 주세요.");
      return;
    }
    if (!isPhone(phone)) {
      setStatus("error");
      setError("연락처를 010-1234-5678 형식으로 적어 주세요.");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      await submitToWeb3Forms(
        { subject: `[문의] ${businessName}`, name, phone, message },
        { honeypot: !!form.get("website") }
      );
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "전송에 실패했습니다.");
    }
  }

  if (status === "success") {
    return (
      <div className="card p-6 text-[15px]" role="status">
        <p className="font-semibold text-amber">문의가 접수되었습니다.</p>
        <p className="mt-1 text-ink-soft">
          {businessName}에서 남기신 연락처로 회신드릴 예정입니다.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card relative p-5 sm:p-6">
      <h2 className="text-lg font-bold text-ink">{businessName}에 견적 문의</h2>
      <p className="mt-1 text-sm text-ink-soft">현장에 계셔서 전화를 못 받으셔도, 남겨 두시면 사장님이 확인하고 연락드려요.</p>

      {/* honeypot: 사람에게는 보이지 않는 칸 */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          웹사이트
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-ink-body">
          이름
          <input name="name" required maxLength={30} autoComplete="name" className={field} />
        </label>
        <label className="text-sm text-ink-body">
          연락처
          <input
            name="phone"
            required
            type="tel"
            inputMode="tel"
            maxLength={20}
            autoComplete="tel"
            placeholder="010-1234-5678"
            className={field}
          />
        </label>
      </div>
      <label className="mt-4 block text-sm text-ink-body">
        문의 내용
        <textarea
          name="message"
          required
          rows={4}
          maxLength={1000}
          placeholder="예: 거실 보일러 온수가 안 나와요. 방문 가능한 날짜가 궁금합니다."
          className={field}
        />
      </label>

      {status === "error" && (
        <p className="mt-3 text-sm text-amber-soft" role="alert">
          {error}
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className="btn btn-primary mt-5 w-full disabled:opacity-60">
        {status === "sending" ? "보내는 중..." : "견적 문의 보내기"}
      </button>
      <p className="mt-3 text-xs text-ink-soft">
        보내신 내용은 문의 대상 업체에 전달됩니다.{" "}
        <a href="/privacy" className="underline hover:text-amber">
          개인정보처리방침
        </a>
      </p>
    </form>
  );
}
