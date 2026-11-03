"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { parseEnum } from "./enum-parse";
import { RefText } from "./RefText";

interface RichTextProps {
  text: string;
  rules: ReadonlySet<string>;
  lang?: "vi" | "en";
  onNavigate: (id: string) => void;
}


export function RichText({ text, rules, lang = "vi", onNavigate }: RichTextProps) {
  if (!text) return null;

  const nodes = parseEnum(text);
  if (nodes.length === 0) {
    return <RefText text={text} rules={rules} lang={lang} onNavigate={onNavigate} />;
  }

  const leadIn = nodes[0]?.leadIn;

  return (
    <>
      {leadIn ? (
        <p className="m-0 mb-2">
          <RefText text={leadIn} rules={rules} lang={lang} onNavigate={onNavigate} />
        </p>
      ) : null}
      <ol className="m-0 list-none space-y-1.5 p-0">
        {nodes.map((item, idx) => {
          const capOrNum = /^[A-Z0-9]/.test(item.marker);
          return (
            <li
              key={idx}
              className="grid grid-cols-[2rem_minmax(0,1fr)] items-start"
            >
              <span
                className={cn(
                  "text-left tabular-nums",
                  capOrNum
                    ? "font-semibold text-primary"
                    : "font-medium text-primary/80"
                )}
              >
                {item.marker}
              </span>
              <div className="min-w-0">
                <RefText
                  text={item.text}
                  rules={rules}
                  lang={lang}
                  onNavigate={onNavigate}
                />
                {item.children && item.children.length > 0 ? (
                  <ol className="mt-1 list-none space-y-1 p-0">
                    {item.children.map((child, cIdx) => (
                      <li
                        key={cIdx}
                        className="grid grid-cols-[2rem_minmax(0,1fr)] items-start"
                      >
                        <span className="text-left font-medium text-primary/80 tabular-nums">
                          {child.marker}
                        </span>
                        <div className="min-w-0">
                          <RefText
                            text={child.text}
                            rules={rules}
                            lang={lang}
                            onNavigate={onNavigate}
                          />
                        </div>
                      </li>
                    ))}
                  </ol>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}
