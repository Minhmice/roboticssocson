"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlowCard } from "@/components/shared/GlowCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { sponsorEmail, socials } from "@/data/settings";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { MagicCard } from "@/components/magicui/MagicCard";

export default function ContactSection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="relative py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <SectionHeader
          badge={t("contact.badge")}
          title={t("contact.title")}
          subtitle={t("contact.subtitle")}
          align="center"
        />

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {/* Form */}
          <MagicCard className="rounded-2xl overflow-hidden">
            <GlowCard className="p-6 md:p-8">
              <h3 className="text-xl font-bold text-slate-100 mb-6">
                {t("contact.formTitle")}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">
                    {t("contact.name")} *
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-2 block">
                    {t("contact.email")} *
                  </label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">
                      {t("contact.company")}
                    </label>
                    <Input
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">
                      {t("contact.phone")}
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-2 block">
                    {t("contact.message")}
                  </label>
                  <Textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>

                {submitted && (
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Message sent successfully!</span>
                  </div>
                )}

                <Button type="submit" className="w-full" size="lg">
                  <Send className="mr-2 h-4 w-4" />
                  {t("contact.submit")}
                </Button>
              </form>
            </GlowCard>
          </MagicCard>

          {/* Info */}
          <GlowCard className="p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-100 mb-6">
              {t("contact.infoTitle")}
            </h3>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="h-5 w-5 text-cyan-400" />
                  <span className="font-semibold text-slate-300">Email</span>
                </div>
                <a
                  href={`mailto:${sponsorEmail}`}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  {sponsorEmail}
                </a>
              </div>

              <Separator className="bg-slate-800" />

              <div>
                <p className="text-sm text-slate-400 mb-4">
                  {t("contact.infoSubtitle")}
                </p>
                <div className="flex gap-4">
                  <Send className="h-5 w-5 text-cyan-400" />
                  <span className="text-slate-300">
                    Telegram: @roboticssocson
                  </span>
                </div>
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}

