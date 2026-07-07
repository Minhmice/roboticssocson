"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { GlowCard } from "./GlowCard";
import { CTAButton } from "./CTAButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with API endpoint or webhook
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  return (
    <GlowCard className="max-w-3xl">
      <h2 className="mb-6 text-2xl font-bold text-foreground">
        Get in Touch
      </h2>

      {submitted && (
        <div className="mb-6 rounded-lg bg-green-950/50 border border-green-500/30 p-4 text-green-400">
          Thank you! We&apos;ll get back to you soon.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name & Company */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-muted-foreground"
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
              className="mb-2 block text-sm font-medium text-muted-foreground"
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

        {/* Email & Phone */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-muted-foreground"
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
              className="mb-2 block text-sm font-medium text-muted-foreground"
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

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-muted-foreground"
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

        {/* Submit Button */}
        <CTAButton
          type="submit"
          label="Send Message"
          icon={Send}
          disabled={!isFormValid}
          className="w-full md:w-auto"
        />
      </form>
    </GlowCard>
  );
};

