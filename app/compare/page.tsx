"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProviderComparison } from "@/components/provider-comparison";
import { providers } from "@/lib/providers";

function ComparisonFromSearchParams() {
  const searchParams = useSearchParams();
  const slugs = (searchParams.get("providers")?.split(",") ?? ["openai", "anthropic"]).slice(0, 4);
  const selected = slugs.map((slug) => providers.find((provider) => provider.slug === slug)).filter((provider): provider is (typeof providers)[number] => Boolean(provider));
  return <ProviderComparison selected={selected.length ? selected : providers.slice(0, 2)} />;
}

export default function ComparePage() {
  return (
    <Suspense fallback={<ProviderComparison selected={providers.slice(0, 2)} />}>
      <ComparisonFromSearchParams />
    </Suspense>
  );
}
