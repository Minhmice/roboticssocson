import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlowCard } from "@/components/ui/GlowCard";
import { Metric } from "@/components/ui/Metric";
import { CTAButton } from "@/components/ui/CTAButton";
import { Timeline } from "@/components/ui/Timeline";
import { PackageCard } from "@/components/ui/PackageCard";
import { Trophy, Users, Calendar, Activity } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 md:px-6">
        <SectionHeader
          title="Năng động - Sáng tạo - Không ngừng khám phá"
          subtitle="Team robotics Sóc Sơn theo đuổi đỉnh cao công nghệ"
          badge="Robotics Sóc Sơn"
          align="center"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-4">
          <Metric value="15" label="Team Members" icon={Users} />
          <Metric value="4" label="Top Rankings" icon={Trophy} />
          <Metric value="3" label="Years Active" icon={Calendar} />
          <Metric value="100+" label="Events" icon={Activity} />
        </div>

        <div className="mt-12 flex justify-center gap-4">
          <CTAButton
            label="Trở thành Nhà Tài Trợ"
            variant="primary"
            href="/sponsorship"
          />
          <CTAButton
            label="Tải Pitch Deck"
            variant="secondary"
            href="/pitch-deck.pdf"
          />
        </div>
      </section>

      {/* Achievements Section */}
      <section className="container mx-auto px-4 py-16 md:px-6">
        <SectionHeader
          title="Thành Tích"
          subtitle="Những dấu ấn của đội qua các mùa giải"
          badge="Achievements"
          align="center"
        />

        <Timeline
          items={[
            {
              year: "2024",
              title: "Top 4 — Vietnam Robotics Challenge",
              description: "66 teams tham gia",
              status: "done",
            },
            {
              year: "2024–2025",
              title: "Top 8 — Vietnam Open Robotics Challenge",
              status: "done",
            },
            {
              year: "2024–2025",
              title: "Top 11 — FTC Vietnam",
              description: "Vòng loại quốc gia",
              status: "done",
            },
            {
              year: "2025",
              title: "Hạng 1 & Á quân — Motions In Fire",
              description: "STEAMese Festival",
              status: "done",
            },
          ]}
        />
      </section>

      {/* Sponsorship Packages Section */}
      <section className="container mx-auto px-4 py-16 md:px-6">
        <SectionHeader
          title="Gói Tài Trợ"
          subtitle="Đồng hành cùng Robotics Sóc Sơn"
          badge="Sponsorship"
          align="center"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <PackageCard
            tier="Bronze"
            price="$200 - $500"
            benefits={[
              "Logo on team banner",
              "Social media mention",
              "Quarterly updates",
            ]}
            ctaLabel="Discuss"
          />
          <PackageCard
            tier="Silver"
            price="$500 - $1,000"
            benefits={[
              "All Bronze benefits",
              "Logo on robot",
              "Feature in sponsorship page",
            ]}
            ctaLabel="Discuss"
          />
          <PackageCard
            tier="Gold"
            price="$1,000 - $2,000"
            highlight
            benefits={[
              "All Silver benefits",
              "Monthly reports",
              "Event mentions",
              "Brand visibility",
            ]}
            ctaLabel="Contact Now"
          />
          <PackageCard
            tier="Platinum"
            price="$2,000+"
            benefits={[
              "All Gold benefits",
              "Executive sponsorship",
              "Exclusive content",
              "Strategic partnership",
            ]}
            ctaLabel="Contact Us"
          />
        </div>
      </section>
    </div>
  );
}
