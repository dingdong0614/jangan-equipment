"use client";

import { useState, type FormEvent } from "react";
import { submitToWeb3Forms } from "@/lib/web3forms";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm({ businessName }: { businessName: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");
    try {
      await submitToWeb3Forms({
        subject: `[문의] ${businessName}`,
        name: String(form.get("name") ?? ""),
        phone: String(form.get("phone") ?? ""),
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
      <div className="border border-graphite bg-paper p-6 text-sm">
        <p className="font-semibold text-amber-strong">문의가 접수되었습니다.</p>
        <p className="mt-1 text-graphite-soft">
          {businessName}에서 남기신 연락처로 회신드릴 예정입니다.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-graphite bg-paper p-6">
      <p className="spec-label text-xs text-blueprint">문의하기</p>
      <h3 className="mt-1 text-lg font-bold">{businessName}에 견적 문의</h3>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          이름
          <input
            name="name"
            required
            className="mt-1 w-full border border-paper-line bg-white px-3 py-2 text-sm outline-none focus:border-amber-strong"
          />
        </label>
        <label className="text-sm">
          연락처
          <input
            name="phone"
            required
            className="mt-1 w-full border border-paper-line bg-white px-3 py-2 text-sm outline-none focus:border-amber-strong"
          />
        </label>
      </div>
      <label className="mt-4 block text-sm">
        문의 내용
        <textarea
          name="message"
          required
          rows={4}
          className="mt-1 w-full border border-paper-line bg-white px-3 py-2 text-sm outline-none focus:border-amber-strong"
        />
      </label>

      {status === "error" && (
        <p className="mt-3 text-sm text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-4 w-full bg-graphite py-3 text-sm font-semibold text-paper transition-colors hover:bg-amber-strong disabled:opacity-60"
      >
        {status === "sending" ? "전송 중..." : "문의 보내기"}
      </button>
    </form>
  );
}
