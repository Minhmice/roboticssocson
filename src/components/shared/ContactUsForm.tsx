"use client";

import { FormEvent, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { sponsorEmail } from "@/data/settings";
import { cn } from "@/lib/utils";

type Status = "idle" | "invalid" | "ready";

const copy = {
  name: { vi: "Họ và tên", en: "Name" },
  email: { vi: "Email", en: "Email" },
  phone: { vi: "Số điện thoại", en: "Phone" },
  message: { vi: "Nội dung cần hỗ trợ", en: "How can we help" },
  submit: { vi: "Gửi liên hệ", en: "Submit" },
  pending: { vi: "Đang mở email…", en: "Opening email…" },
  successTitle: {
    vi: "Sắp mở ứng dụng email của bạn",
    en: "Opening your email app",
  },
  successSub: {
    vi: "Nếu không tự mở, gửi thư tới roboticssocson@gmail.com",
    en: "If nothing opens, email roboticssocson@gmail.com",
  },
  error: {
    vi: "Vui lòng điền tên, email hợp lệ và nội dung.",
    en: "Please fill name, a valid email, and a message.",
  },
  again: { vi: "Soạn lại", en: "Write another" },
};

const fieldClass =
  "h-10 w-full rounded-none border-0 border-b border-white/35 bg-transparent px-1.5 py-0 text-[0.88rem] font-medium uppercase tracking-[0.04em] text-white shadow-none outline-none transition-[border-color] placeholder:text-white/90 placeholder:uppercase placeholder:tracking-[0.05em] hover:border-white focus-visible:border-blue-300 focus-visible:ring-0";

export function ContactUsForm({ className }: { className?: string }) {
  const { locale } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const [pending, setPending] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = values.name.trim();
    const email = values.email.trim();
    const message = values.message.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !emailOk || !message) {
      setStatus("invalid");
      return;
    }

    setPending(true);
    setStatus("ready");

    const subject = encodeURIComponent(
      `Contact — ${name || "Robotics Soc Son"}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${values.phone.trim() || "—"}`,
        "",
        message,
      ].join("\n")
    );

    window.location.href = `mailto:${sponsorEmail}?subject=${subject}&body=${body}`;
    window.setTimeout(() => setPending(false), 800);
  };

  if (status === "ready") {
    return (
      <div
        className={cn(
          "flex min-h-56 w-full max-w-[35.63em] flex-col items-start justify-center gap-3 text-white",
          className
        )}
      >
        <p className="m-0 text-balance text-[clamp(1.75rem,3.5vw,2.4rem)] font-extrabold leading-none tracking-[-0.02em]">
          {copy.successTitle[locale]}
        </p>
        <p className="m-0 text-[0.92rem] uppercase leading-snug tracking-[0.04em] text-white/90 text-pretty">
          {copy.successSub[locale]}
        </p>
        <button
          type="button"
          className="mt-1 min-h-11 cursor-pointer border-0 bg-transparent p-0 text-[0.88rem] font-semibold text-blue-200 underline underline-offset-4"
          onClick={() => {
            setStatus("idle");
            setValues({ name: "", email: "", phone: "", message: "" });
          }}
        >
          {copy.again[locale]}
        </button>
      </div>
    );
  }

  return (
    <div className={cn("relative z-[100] w-full max-w-[35.63em]", className)}>
      <form
        className="flex flex-col items-start"
        onSubmit={onSubmit}
        noValidate
      >
        <div className="mb-10 flex w-full flex-col gap-8">
          <div className="flex w-full gap-5 max-[991px]:flex-col max-[991px]:gap-8">
            <input
              className={cn(fieldClass, "min-w-0 flex-1")}
              name="name"
              placeholder={copy.name[locale]}
              type="text"
              required
              autoComplete="name"
              maxLength={256}
              value={values.name}
              onChange={(e) =>
                setValues((v) => ({ ...v, name: e.target.value }))
              }
            />
            <input
              className={cn(fieldClass, "min-w-0 flex-1")}
              name="phone"
              placeholder={copy.phone[locale]}
              type="tel"
              autoComplete="tel"
              maxLength={32}
              value={values.phone}
              onChange={(e) =>
                setValues((v) => ({ ...v, phone: e.target.value }))
              }
            />
          </div>
          <input
            className={fieldClass}
            name="email"
            placeholder={copy.email[locale]}
            type="email"
            required
            autoComplete="email"
            maxLength={256}
            value={values.email}
            onChange={(e) =>
              setValues((v) => ({ ...v, email: e.target.value }))
            }
          />
          <textarea
            className={cn(
              fieldClass,
              "min-h-[4.5em] resize-none pt-1.5 normal-case tracking-normal"
            )}
            name="message"
            placeholder={copy.message[locale]}
            required
            maxLength={5000}
            rows={4}
            value={values.message}
            onChange={(e) =>
              setValues((v) => ({ ...v, message: e.target.value }))
            }
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="min-h-11 min-w-30 cursor-pointer rounded-md border-0 bg-white px-9 py-4 text-[0.88rem] font-bold uppercase leading-none tracking-[0.08em] text-primary shadow-[0_8px_28px_rgba(15,23,42,0.25)] transition-colors hover:bg-accent hover:text-primary disabled:cursor-wait disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          {pending ? copy.pending[locale] : copy.submit[locale]}
        </button>
      </form>

      {status === "invalid" && (
        <p className="mt-4 text-[0.9rem] text-red-200" role="alert">
          {copy.error[locale]}
        </p>
      )}
    </div>
  );
}
