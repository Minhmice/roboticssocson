import type { MDXComponents } from "mdx/types";
import React from "react";
import { ArticleImage } from "@/components/resources/ArticleImage";
import { BootLink } from "@/components/shared/BootLink";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <h2
        className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mt-8 mb-4 border-b border-border/40 pb-2"
        {...props}
      >
        {children}
      </h2>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className="text-xl md:text-2xl font-bold tracking-tight text-foreground mt-8 mb-4 border-b border-border/40 pb-2"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className="text-lg md:text-xl font-semibold text-foreground mt-6 mb-3"
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4
        className="text-base md:text-lg font-semibold text-foreground mt-4 mb-2"
        {...props}
      >
        {children}
      </h4>
    ),
    p: ({ children, ...props }) => (
      <p className="text-base text-foreground/90 leading-relaxed my-4" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="list-disc list-inside space-y-1 my-4 text-foreground/90 pl-2" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal list-inside space-y-1 my-4 text-foreground/90 pl-2" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-relaxed" {...props}>
        {children}
      </li>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="border-l border-border pl-4 py-1 my-4 text-foreground bg-muted/20"
        {...props}
      >
        {children}
      </blockquote>
    ),
    code: ({ children, ...props }) => (
      <code
        className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground"
        {...props}
      >
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre
        className="overflow-x-auto rounded-xl bg-card border border-border p-4 my-4 font-mono text-sm text-foreground"
        {...props}
      >
        {children}
      </pre>
    ),
    a: ({ href, children, ...props }) => {
      const isInternal = href && ((href.startsWith("/") && !href.startsWith("//")) || href.startsWith("#"));
      if (isInternal) {
        return (
          <BootLink
            href={href}
            className="inline-flex min-h-11 items-center rounded-sm text-primary underline underline-offset-4 font-medium hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            {...props}
          >
            {children}
          </BootLink>
        );
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center rounded-sm text-primary underline underline-offset-4 font-medium hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          {...props}
        >
          {children}
        </a>
      );
    },
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto my-6" role="region" aria-label="Table" tabIndex={0}>
        <table className="w-full border-collapse border border-border text-sm" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th
        className="border border-border bg-muted/50 px-4 py-2 text-left font-semibold text-foreground"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="border border-border px-4 py-2 text-foreground/90" {...props}>
        {children}
      </td>
    ),
    hr: (props) => <hr className="my-8 border-border/60" {...props} />,
    img: (props) => <ArticleImage {...props} />,
    ...components,
  };
}
