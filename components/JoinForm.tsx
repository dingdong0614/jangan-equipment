"use client";

import { useState, type FormEvent } from "react";
import { submitToWeb3Forms } from "@/lib/web3forms";
import { categories } from "@/data/businesses";

type Status = "idle" | "sending" | "success" | "error";

export default function JoinForm({ monthlyFee }: { monthlyFee: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");
    try {
      await submitToWeb3Forms({
        subject: `[업체 등록 신청] ${monthlyFee}`,
        businessName: String(form.get("businessName") ?? ""),
        category: String(form.get("category") ?? ""),
        contactName: String(form.get("contactName") ?? ""),
        phone: String(form.get("phone") ?? ""),
        address: String(form.get("address") ?? ""),
        message: String(form.get("message") ?? ""),
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "전송에 실패했습니다.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-line-strong bg-surface p-8 text-center">
        <p className="text-lg font-bold text-amber">신청이 접수되었습니다.</p>
        <p className="mt-2 text-sm text-ink-soft">
          담당자가 확인 후 남겨주신 연락처로 연락드립니다.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-line-strong bg-surface p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          업체명
          <input
            name="businessName"
            required
            className="mt-1 w-full border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-amber"
          />
        </label>
        <label className="text-sm">
          업종
          <select
            name="category"
            required
            defaultValue=""
            className="mt-1 w-full border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-amber"
          >
            <option value="" disabled>
              선택해주세요
            </option>
            {categories.map((c) => (
              <option key={c.slug} value={c.label}>
                {c.label}
              </option>
            ))}
            <option value="기타">기타</option>
          </select>
        </label>
        <label className="text-sm">
          담당자명
          <input
            name="contactName"
            required
            className="mt-1 w-full border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-amber"
          />
        </label>
        <label className="text-sm">
          연락처
          <input
            name="phone"
            required
            className="mt-1 w-full border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-amber"
          />
        </label>
      </div>
      <label className="mt-4 block text-sm">
        업체 주소
        <input
          name="address"
          required
          placeholder="예: 수원시 장안구 정자동"
          className="mt-1 w-full border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-amber"
        />
      </label>
      <label className="mt-4 block text-sm">
        취급 분야 / 하고 싶은 말
        <textarea
          name="message"
          rows={4}
          className="mt-1 w-full border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-amber"
        />
      </label>

      {status === "error" && (
        <p className="mt-3 text-sm text-red-400">{error}</p>
      )}

      <p className="mt-6 text-xs text-ink-soft">
        신청 승인 후 {monthlyFee} 이용료가 청구됩니다.
      </p>
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 w-full bg-amber py-3 text-sm font-semibold text-surface-deep transition-colors hover:bg-amber-strong disabled:opacity-60"
      >
        {status === "sending" ? "전송 중..." : "등록 신청하기"}
      </button>
    </form>
  );
}
