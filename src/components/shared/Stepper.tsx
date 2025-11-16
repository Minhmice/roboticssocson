"use client";

import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  title: string;
  content: string;
  details: string[];
  purpose: string;
}

interface StepperProps {
  steps: Step[];
  currentStep?: number;
  orientation?: "vertical" | "horizontal";
  className?: string;
}

export function Stepper({
  steps,
  currentStep = 1,
  orientation = "vertical",
  className,
}: StepperProps) {
  const isVertical = orientation === "vertical";

  return (
    <div
      className={cn(
        "w-full",
        isVertical ? "space-y-4 sm:space-y-6" : "flex gap-4",
        className
      )}
    >
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;
        const isPending = stepNumber > currentStep;

        return (
          <div
            key={stepNumber}
            className={cn(
              "relative",
              isVertical ? "w-full" : "flex-1",
              "transition-all duration-300"
            )}
          >
            {/* Connector Line (not for last item in vertical, not for horizontal) */}
            {isVertical && index < steps.length - 1 && (
              <div
                className={cn(
                  "absolute left-[20px] sm:left-[24px] top-12 sm:top-14 w-0.5 h-[calc(100%+0.5rem)] sm:h-[calc(100%+1rem)]",
                  "transition-colors duration-500",
                  isCompleted || isActive
                    ? "bg-primary/40"
                    : "bg-border"
                )}
              />
            )}

            {/* Step Container */}
            <div
              className={cn(
                "relative rounded-xl border transition-all duration-300",
                "p-4 sm:p-6",
                isActive &&
                  "border-primary/50 bg-primary/5 shadow-lg shadow-primary/10",
                isCompleted &&
                  "border-primary/30 bg-card hover:bg-primary/5",
                isPending && "border-border bg-card/50 opacity-80"
              )}
            >
              {/* Step Header */}
              <div className="flex items-start gap-3 sm:gap-4 mb-4">
                {/* Step Number/Icon */}
                <div
                  className={cn(
                    "flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full",
                    "flex items-center justify-center",
                    "font-bold text-base sm:text-lg",
                    "transition-all duration-300",
                    "border-2",
                    isActive &&
                      "border-primary bg-primary/20 text-primary shadow-lg shadow-primary/30",
                    isCompleted &&
                      "border-primary bg-primary text-primary-foreground",
                    isPending &&
                      "border-border bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    stepNumber
                  )}
                </div>

                {/* Step Title */}
                <div className="flex-1 pt-1 sm:pt-2">
                  <h3
                    className={cn(
                      "text-base sm:text-lg md:text-xl font-bold mb-1",
                      "transition-colors duration-300",
                      isActive && "text-primary",
                      isCompleted && "text-foreground",
                      isPending && "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={cn(
                      "text-xs sm:text-sm",
                      "transition-colors duration-300",
                      isActive && "text-foreground",
                      isCompleted && "text-muted-foreground",
                      isPending && "text-muted-foreground/70"
                    )}
                  >
                    {step.content}
                  </p>
                </div>
              </div>

              {/* Step Details */}
              {step.details && step.details.length > 0 && (
                <div className="ml-0 sm:ml-16 mb-4 space-y-2">
                  <h4 className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    Chi tiết triển khai
                  </h4>
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
                      >
                        <span
                          className={cn(
                            "flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5 sm:mt-2",
                            isActive && "bg-primary",
                            isCompleted && "bg-primary/60",
                            isPending && "bg-border"
                          )}
                        />
                        <span className="flex-1">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Step Purpose */}
              {step.purpose && (
                <div
                  className={cn(
                    "ml-0 sm:ml-16 p-3 sm:p-4 rounded-lg",
                    "border-l-2 transition-colors duration-300",
                    isActive &&
                      "bg-primary/5 border-primary",
                    isCompleted &&
                      "bg-muted/50 border-primary/40",
                    isPending && "bg-muted/30 border-border"
                  )}
                >
                  <h4 className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Mục đích
                  </h4>
                  <p
                    className={cn(
                      "text-xs sm:text-sm leading-relaxed",
                      isActive && "text-foreground",
                      isCompleted && "text-muted-foreground",
                      isPending && "text-muted-foreground/70"
                    )}
                  >
                    {step.purpose}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

