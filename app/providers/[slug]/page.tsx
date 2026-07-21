import { notFound } from "next/navigation";
import { ProviderProfile } from "@/components/provider-profile";
import { getProvider, providers } from "@/lib/providers";

export function generateStaticParams() {
  return providers.map((provider) => ({ slug: provider.slug }));
}

export default async function ProviderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const provider = getProvider(slug);
  if (!provider) notFound();
  return <ProviderProfile provider={provider} />;
}
