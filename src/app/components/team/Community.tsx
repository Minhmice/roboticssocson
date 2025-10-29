"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedCard, AnimatedGrid } from "@/components/shared/AnimatedComponents";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { CTAButton } from "@/components/shared/CTAButton";
import { communityEvents } from "@/data/community";
import { Calendar, CheckCircle2, Clock } from "lucide-react";

export default function CommunitySection() {
  const { t } = useLanguage();

  return (
    <section id="community" className="relative py-16 md:py-24 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
        <SectionHeader
          badge={t("community.badge")}
          title={t("community.title")}
          subtitle={t("community.subtitle")}
          align="center"
        />

        {/* Events timeline */}
        <AnimatedGrid className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
          {communityEvents.map((event, idx) => (
            <AnimatedCard key={idx} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <Badge
                  variant={event.status === "completed" ? "default" : "secondary"}
                  className="flex items-center gap-2"
                >
                  {event.status === "completed" ? (
                    <CheckCircle2 className="h-3 w-3" />
                  ) : (
                    <Clock className="h-3 w-3" />
                  )}
                  {event.status === "completed" ? "Completed" : "Upcoming"}
                </Badge>
              </div>

              <h3 className="text-lg font-semibold text-slate-100 mb-2">
                {event.title}
              </h3>

              <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                <Calendar className="h-4 w-4" />
                <span>{event.date}</span>
              </div>

              <p className="text-sm text-slate-500 mb-2">{event.location}</p>

              {event.description && (
                <p className="text-sm text-slate-400 leading-relaxed">
                  {event.description}
                </p>
              )}

              {event.participants && (
                <Badge variant="outline" className="mt-3 text-xs">
                  {event.participants}
                </Badge>
              )}
            </AnimatedCard>
          ))}
        </AnimatedGrid>

        {/* Callout CTA */}
        <div className="mt-12">
          <AnimatedCard className="p-8 text-center">
            <h3 className="text-xl font-bold text-slate-100 mb-3">
              {t("community.inviteUs")}
            </h3>
            <p className="text-slate-400 mb-6">
              {t("community.inviteUsSubtitle")}
            </p>
            <CTAButton
              label={t("contact.submit")}
              variant="primary"
              href="/contact"
            />
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
}

