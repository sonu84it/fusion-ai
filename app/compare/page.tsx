import { ProviderComparison } from "@/components/provider-comparison";
import { providers } from "@/lib/providers";

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ providers?: string }> }) {
  const params = await searchParams;
  const slugs = (params.providers?.split(",") ?? ["openai", "anthropic"]).slice(0, 4);
  const selected = slugs.map((slug) => providers.find((provider) => provider.slug === slug)).filter((provider): provider is (typeof providers)[number] => Boolean(provider));
  return <ProviderComparison selected={selected.length ? selected : providers.slice(0, 2)} />;
}
