"use client";

import React from "react";
import { CSS_EASE } from "@/lib/manual/motion";
import { ExternalLink } from "./ExternalLink";

const URL_REGEX = /(https?:\/\/[^\s<>"]+|www\.[^\s<>"]+)/g;
const TRAILING_PUNCTUATION = /[.,;:)]+$/;

/** Rule ids that exist in the manual: only these become links (avoids linking "R300" in prose that is not a rule). */
const RULE_REF = /(<[A-Z]{1,2}\d{2,3}>|\b[A-Z]{1,2}\d{3}\b)/g;

export function RefText({
  text,
  rules,
  lang = "vi",
  onNavigate,
}: {
  text: string;
  rules: ReadonlySet<string>;
  lang?: "vi" | "en";
  onNavigate: (id: string) => void;
}) {
  return (
    <>
      {text.split(URL_REGEX).map((part, i) => {
        if (i % 2 === 1) {
          const match = part.match(TRAILING_PUNCTUATION);
          const trailing = match ? match[0] : "";
          const cleanUrl = trailing ? part.slice(0, -trailing.length) : part;
          const href = cleanUrl.startsWith("www.") ? `https://${cleanUrl}` : cleanUrl;
          return (
            <React.Fragment key={i}>
              <ExternalLink href={href} display={cleanUrl} lang={lang} />
              {trailing}
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={i}>
            {part.split(RULE_REF).map((rulePart, j) => {
              const id = rulePart.replace(/[<>]/g, "");
              if (j % 2 === 1 && rules.has(id)) {
                return (
                  <a
                    key={j}
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(id);
                    }}
                    className="mx-0.5 inline-flex min-h-6 items-center rounded bg-primary/10 px-1.5 font-mono text-[0.8em] font-bold text-primary [@media(hover:hover)_and_(pointer:fine)]:hover:bg-primary/20 motion-safe:active:scale-[0.97] motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    style={{
                      transitionProperty: "background-color, transform",
                      transitionDuration: "160ms, 140ms",
                      transitionTimingFunction: CSS_EASE.out,
                    }}
                  >
                    {id}
                  </a>
                );
              }
              return <React.Fragment key={j}>{rulePart}</React.Fragment>;
            })}
          </React.Fragment>
        );
      })}
    </>
  );
}
