"use client";

import { geoEqualEarth, geoPath } from "d3-geo";
import { useState } from "react";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import worldAtlas from "world-atlas/countries-110m.json";
import { providers, type Provider } from "@/lib/providers";

const mapSize = { width: 1000, height: 480 };

const topology = worldAtlas as unknown as Topology<{ countries: GeometryCollection }>;
const countries = feature(topology, topology.objects.countries).features;
const projection = geoEqualEarth().fitSize([mapSize.width, mapSize.height], { type: "Sphere" });
const path = geoPath(projection);

const markerOffsets: Record<string, [number, number]> = {
  openai: [-16, 15],
  anthropic: [0, -16],
  xai: [17, 15],
  "meta-ai": [27, -2],
  nvidia: [26, 25],
  "amazon-nova": [-4, -17],
  "microsoft-phi": [18, -16],
  cohere: [-12, -16],
  "ibm-watsonx": [6, 16],
  "google-deepmind": [-10, -13],
  mistral: [15, 12],
  ai21: [0, 0],
  moonshot: [-14, -16],
  zhipu: [13, -4],
  deepseek: [-12, 14],
  qwen: [15, 17],
};

const categoryStyle: Record<Provider["category"], { fill: string; ring: string }> = {
  "Frontier lab": { fill: "#a78bfa", ring: "#ddd6fe" },
  "Open-model lab": { fill: "#2dd4bf", ring: "#99f6e4" },
  "Enterprise AI": { fill: "#60a5fa", ring: "#bfdbfe" },
};

function getMarkerPosition(provider: Provider) {
  const point = projection(provider.coordinates);
  if (!point) return undefined;

  const [offsetX, offsetY] = markerOffsets[provider.slug] ?? [0, 0];
  const [x, y] = point;
  return { x: Number((x + offsetX).toFixed(2)), y: Number((y + offsetY).toFixed(2)) };
}

function MapMarker({ provider, isActive, onShow, onHide }: { provider: Provider; isActive: boolean; onShow: (provider: Provider) => void; onHide: () => void }) {
  const position = getMarkerPosition(provider);
  if (!position) return null;

  const style = categoryStyle[provider.category];

  return (
    <g transform={`translate(${position.x} ${position.y})`}>
      <a
        href={provider.website}
        target="_blank"
        rel="noreferrer"
        aria-label={`${provider.name}, ${provider.headquarters}. Visit official website`}
        className="group outline-none"
        onMouseEnter={() => onShow(provider)}
        onMouseLeave={onHide}
        onFocus={() => onShow(provider)}
        onBlur={onHide}
      >
        <title>{`${provider.name} · ${provider.headquarters} — open official website`}</title>
        <circle r="10" fill="transparent" />
        <circle r={isActive ? "7" : "5.5"} fill={style.fill} stroke="#050816" strokeWidth="2" className="transition-all" />
        <circle r={isActive ? "10.5" : "8.5"} fill="none" stroke={style.ring} strokeWidth="1" opacity={isActive ? "1" : "0.45"} className="transition-all" />
      </a>
    </g>
  );
}

export function ProviderWorldMap() {
  const [activeProvider, setActiveProvider] = useState<Provider | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Provider["category"] | null>(null);
  const visibleProviders = selectedCategory ? providers.filter((provider) => provider.category === selectedCategory) : providers;
  const activePosition = activeProvider ? getMarkerPosition(activeProvider) : undefined;
  const activeCity = activeProvider?.headquarters.split(",")[0];
  const tooltipX = activePosition ? Math.min(Math.max(activePosition.x + 16, 12), 704) : 0;
  const tooltipY = activePosition ? Math.max(activePosition.y - 64, 12) : 0;

  function toggleCategory(category: Provider["category"]) {
    setSelectedCategory((current) => current === category ? null : category);
    setActiveProvider(null);
  }

  return (
    <section id="map" className="relative z-10 mx-auto max-w-7xl scroll-mt-8 px-5 pb-24 lg:px-8" aria-labelledby="world-map-title">
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-cyan-300">GLOBAL AI LANDSCAPE</p>
          <h2 id="world-map-title" className="font-display mt-2 text-3xl font-semibold tracking-[-.04em]">Where the model labs are based</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Each marker represents a provider&apos;s headquarters or principal office. Hover or focus a marker for details, then select it to visit the official website.</p>
        </div>
        <div className="flex flex-wrap gap-2" aria-label="Filter map locations by organization type">
          {Object.entries(categoryStyle).map(([category, style]) => {
            const isSelected = selectedCategory === category;
            return <button key={category} type="button" onClick={() => toggleCategory(category as Provider["category"])} aria-pressed={isSelected} className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[11px] font-medium transition ${isSelected ? "border-white/25 bg-white/[.1] text-white" : "border-white/[.08] bg-white/[.025] text-slate-400 hover:border-white/[.16] hover:text-slate-200"}`}><span className="h-2 w-2 rounded-full" style={{ background: style.fill }} />{category}</button>;
          })}
        </div>
      </div>

      {selectedCategory && <p className="mb-4 text-xs text-cyan-200">Showing {visibleProviders.length} {selectedCategory.toLowerCase()}{visibleProviders.length === 1 ? "" : "s"}. Select the active filter again to show every provider.</p>}

      <div className="overflow-hidden rounded-[28px] border border-white/[.1] bg-[#090f20] shadow-[0_20px_60px_rgba(0,0,0,.2)]">
        <svg viewBox={`0 0 ${mapSize.width} ${mapSize.height}`} className="block h-auto w-full" role="img" aria-labelledby="world-map-title world-map-description">
          <desc id="world-map-description">A world map showing headquarters and principal office locations for the AI model providers in the Fusion AI directory. Hover or focus a marker to see its city and model families. Every marker is a link to the provider&apos;s official website.</desc>
          <defs>
            <radialGradient id="map-glow" cx="50%" cy="20%" r="75%">
              <stop offset="0%" stopColor="#1e2b58" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#070b18" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width={mapSize.width} height={mapSize.height} fill="#080e1c" />
          <rect width={mapSize.width} height={mapSize.height} fill="url(#map-glow)" />
          <path d={path({ type: "Sphere" }) ?? undefined} fill="none" stroke="rgba(148,163,184,.18)" strokeWidth="1" />
          <g fill="#13203a" stroke="rgba(148,163,184,.2)" strokeWidth="0.7">
            {countries.map((country, index) => <path key={country.id ?? index} d={path(country) ?? undefined} />)}
          </g>
          <g>{visibleProviders.map((provider) => <MapMarker key={provider.slug} provider={provider} isActive={activeProvider?.slug === provider.slug} onShow={setActiveProvider} onHide={() => setActiveProvider(null)} />)}</g>
          {activeProvider && activePosition && <g transform={`translate(${tooltipX} ${tooltipY})`} pointerEvents="none" aria-live="polite">
            <rect width="284" height="54" rx="9" fill="#070d1d" stroke="rgba(186,230,253,.38)" strokeWidth="1" />
            <text x="12" y="20" fill="#f8fafc" fontSize="12" fontWeight="600">{activeProvider.name}<tspan fill="#94a3b8" fontWeight="400">{` · ${activeCity}`}</tspan></text>
            <text x="12" y="39" fill="#a5b4fc" fontSize="10.5">{activeProvider.models.slice(0, 3).join(" · ")}</text>
          </g>}
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
        {visibleProviders.map((provider) => <a key={provider.slug} href={provider.website} target="_blank" rel="noreferrer" className="transition hover:text-cyan-200">{provider.name} <span className="text-slate-700">·</span> {provider.headquarters.split(",")[0]}</a>)}
      </div>
    </section>
  );
}
