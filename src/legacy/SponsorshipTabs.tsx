"use client";

import { Building2, User } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Stepper, Step } from "./Stepper";
import { cn } from "@/lib/utils";

interface SponsorshipTabsProps {
  corporateSteps: Step[];
  personalSteps: Step[];
  locale?: "vi" | "en";
  className?: string;
}

export function SponsorshipTabs({
  corporateSteps,
  personalSteps,
  locale = "vi",
  className,
}: SponsorshipTabsProps) {
  const labels = {
    corporate: locale === "vi" ? "Doanh nghiệp" : "Corporate",
    personal: locale === "vi" ? "Cá nhân" : "Personal",
    corporateDesc:
      locale === "vi"
        ? "Quy trình 6 bước cho doanh nghiệp tài trợ"
        : "6-step process for corporate sponsorship",
    personalDesc:
      locale === "vi"
        ? "Quy trình 4 bước cho cá nhân ủng hộ"
        : "4-step process for personal donation",
  };

  return (
    <Tabs
      defaultValue="corporate"
      className={cn("w-full", className)}
    >
      {/* Tab List */}
      <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-card/50 border border-border">
        <TabsTrigger
          value="corporate"
          className={cn(
            "flex items-center gap-2 px-4 py-3 sm:px-6 sm:py-4",
            "data-[state=active]:bg-primary/10",
            "data-[state=active]:text-primary",
            "data-[state=active]:border-primary/50",
            "data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20",
            "transition-all duration-300"
          )}
        >
          <Building2 className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="text-sm sm:text-base font-semibold">
            {labels.corporate}
          </span>
        </TabsTrigger>
        <TabsTrigger
          value="personal"
          className={cn(
            "flex items-center gap-2 px-4 py-3 sm:px-6 sm:py-4",
            "data-[state=active]:bg-primary/10",
            "data-[state=active]:text-primary",
            "data-[state=active]:border-primary/50",
            "data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20",
            "transition-all duration-300"
          )}
        >
          <User className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="text-sm sm:text-base font-semibold">
            {labels.personal}
          </span>
        </TabsTrigger>
      </TabsList>

      {/* Corporate Tab Content */}
      <TabsContent value="corporate" className="mt-6 sm:mt-8">
        <div className="mb-6">
          <p className="text-sm sm:text-base text-muted-foreground text-center">
            {labels.corporateDesc}
          </p>
        </div>
        <Stepper steps={corporateSteps} />
      </TabsContent>

      {/* Personal Tab Content */}
      <TabsContent value="personal" className="mt-6 sm:mt-8">
        <div className="mb-6">
          <p className="text-sm sm:text-base text-muted-foreground text-center">
            {labels.personalDesc}
          </p>
        </div>
        <Stepper steps={personalSteps} />
      </TabsContent>
    </Tabs>
  );
}

