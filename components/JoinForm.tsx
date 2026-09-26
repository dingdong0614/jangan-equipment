"use client";

import { useState, type FormEvent } from "react";
import { clean, isPhone, submitToWeb3Forms } from "@/lib/web3forms";
import { categories } from "@/data/businesses";

type Status = "idle" | "sending" | "success" | "error";

const field =
  "mt-1.5 w-full rounded-md border border-line-strong bg-surface px-4 py-3 text-[16px] text-ink outline-none transition-colors placeholder:text-ink-soft focus:border-amber";

export default function JoinForm({ monthlyFee }: { monthlyFee: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      businessName: clean(form.get("businessName"), 50),
      category: clean(form.get("category"), 20),
      contactName: clean(form.get("contactName"), 30),
      phone: clean(form.get("phone"), 20),
      address: clean(form.get("address"), 100),
      message: clean(form.get("message"), 1000),
    };
    if (!data.businessName || !data.category || !data.contactName || !data.address) {
      setStatus("error");
      setError("업체명, 업종, 담당자명, 주소를 모두 적어 주세요.");
      return;
    }
    if (!isPhone(data.phone)) {
      setStatus("error");
      setError("연락처를 010-1234-5678 형식으로 적어 주세요.");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      await submitToWeb3Forms(
        { subject: `[업체 등록 신청] ${monthlyFee}`, ...data },
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
      <div className="card p-8 text-center" role="status">
        <p className="text-lg font-bold text-amber">신청이 접수되었습니다.</p>
        <p className="mt-2 text-[15px] text-ink-soft">
          담당자가 확인 후 남겨주신 연락처로 연락드립니다.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card relative p-5 sm:p-8">
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          웹사이트
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-ink-body">
          업체명
          <input name="businessName" required maxLength={50} autoComplete="organization" className={field} />
        </label>
        <label className="text-sm text-ink-body">
          업종
          <select name="category" required defaultValue="" className={field}>
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
        <label className="text-sm text-ink-body">
          담당자명
          <input name="contactName" required maxLength={30} autoComplete="name" className={field} />
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
        업체 주소
        <input
          name="address"
          required
          maxLength={100}
          placeholder="예: 수원시 장안구 정자동"
          className={field}
        />
      </label>
      <label className="mt-4 block text-sm text-ink-body">
        취급 분야 / 하고 싶은 말
        <textarea name="message" rows={4} maxLength={1000} className={field} />
      </label>

      {status === "error" && (
        <p className="mt-3 text-sm text-amber-soft" role="alert">
          {error}
        </p>
      )}

      <p className="mt-6 text-sm text-ink-soft">
        신청 승인 후 {monthlyFee} 이용료가 청구됩니다. 게시는 상담 후 계약서와
        개인정보 공개 동의서를 받은 다음 진행합니다.
      </p>
      <p className="mt-2 text-xs text-ink-soft">
        신청 내용은 처리 완료 후 1년간 보관하며, 접수·호스팅을 위해
        Web3Forms(인도)·Vercel(미국)로 국외 이전됩니다.{" "}
        <a href="/privacy" className="underline hover:text-amber">
          개인정보처리방침
        </a>
      </p>
      <button type="submit" disabled={status === "sending"} className="btn btn-primary mt-4 w-full disabled:opacity-60">
        {status === "sending" ? "보내는 중..." : "등록 신청 보내기"}
      </button>
    </form>
  );
}
