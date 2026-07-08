"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { GlowCard } from "./GlowCard";
import { CTAButton } from "./CTAButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sponsorEmail } from "@/data/settings";

/**
 * Contact form UI. Do not show fake "success" — no backend endpoint yet.
 * Primary action: mailto with prefilled body.
 */
export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    isValidEmail(formData.email) &&
    formData.message.trim();

  const mailtoHref = (() => {
    const subject = encodeURIComponent(
      `Contact — ${formData.name.trim() || "Robotics Soc Son"}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${formData.name}`,
        `Company: ${formData.company || "—"}`,
        `Email: ${formData.email}`,
        `Phone: ${formData.phone || "—"}`,
        "",
        formData.message,
      ].join("\n"),
    );
    return `mailto:${sponsorEmail}?subject=${subject}&body=${body}`;
  })();

  return (
    <GlowCard className="max-w-3xl">
      <h2 className="mb-2 text-2xl font-bold text-foreground">Get in Touch</h2>
      <p className="mb-6 text-sm text-foreground/80">
        Opens your email client — we do not store form data on this site yet.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!isFormValid) return;
          window.location.href = mailtoHref;
        }}
        className="space-y-6"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Name *
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="bg-muted border-border text-foreground focus:border-primary focus:ring-ring"
            />
          </div>
          <div>
            <label
              htmlFor="company"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Company
            </label>
            <Input
              id="company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              className="bg-muted border-border text-foreground focus:border-primary focus:ring-ring"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Email *
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="bg-muted border-border text-foreground focus:border-primary focus:ring-ring"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Phone
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="bg-muted border-border text-foreground focus:border-primary focus:ring-ring"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Message *
          </label>
          <Textarea
            id="message"
            name="message"
            required
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className="bg-muted border-border text-foreground focus:border-primary focus:ring-ring resize-none"
          />
        </div>

        <CTAButton
          type="submit"
          label="Open email draft"
          icon={Send}
          disabled={!isFormValid}
          className="w-full md:w-auto"
        />
      </form>
    </GlowCard>
  );
};
