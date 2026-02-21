"use client";

import { BuilderComponent } from "@builder.io/react";
import Link from "next/link";
import type { BuilderContent } from "@builder.io/sdk";

interface BuilderPageRendererProps {
  content: BuilderContent | null;
}

export default function BuilderPageRenderer({ content }: BuilderPageRendererProps) {
  const apiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY;

  if (!content || !apiKey) {
    return null;
  }

  return (
    <BuilderComponent
      content={content}
      apiKey={apiKey}
      model="page"
      renderLink={(props) => {
        if (props.href && !props.href.startsWith("http") && !props.href.startsWith("//")) {
          return <Link {...props} href={props.href} />;
        }
        return <a {...props} />;
      }}
    />
  );
}
