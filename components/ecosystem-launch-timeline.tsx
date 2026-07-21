"use client";

import { useMemo, useState } from "react";
import { CalendarDays, ExternalLink } from "lucide-react";
import { modelLaunches, providers, type ModelLaunch, type Provider } from "@/lib/providers";

type EcosystemEvent = ModelLaunch & { id: string; provider: Provider };

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function dateValue(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return Date.UTC(year, month - 1, day);
}

function formatDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return `${monthNames[month - 1]} ${day}, ${year}`;
}

export function EcosystemLaunchTimeline() {
  const timelineStartDate = "2023-01-01";
  const events = useMemo(() => providers.flatMap((provider) => modelLaunches[provider.slug].filter((event) => event.date >= timelineStartDate).map((event) => ({ ...event, id: `${provider.slug}-${event.date}-${event.label}`, provider }))).sort((left, right) => left.date.localeCompare(right.date)), []);
  const latestEvent = events[events.length - 1];
  const [selectedId, setSelectedId] = useState(() => latestEvent?.id ?? "");
  const selected = events.find((event) => event.id === selectedId) ?? latestEvent;

  if (!selected) return null;

  const start = dateValue(timelineStartDate);
  const end = dateValue(latestEvent?.date ?? events[0].date);
  const years = Array.from({ length: Number((latestEvent?.date ?? events[0].date).slice(0, 4)) - Number(timelineStartDate.slice(0, 4)) + 1 }, (_, index) => Number(timelineStartDate.slice(0, 4)) + index);
  const width = 1240;
  const labelWidth = 190;
  const timelineStart = 224;
  const timelineEnd = 1184;
  const rowHeight = 38;
  const height = 84 + providers.length * rowHeight;
  const timelineWidth = timelineEnd - timelineStart;
  const xForDate = (date: string) => {
    const ratio = start === end ? 0.5 : (dateValue(date) - start) / (end - start);
    return Number((timelineStart + ratio * timelineWidth).toFixed(2));
  };

  return (
    <section id="timeline" className="relative z-10 mx-auto max-w-7xl scroll-mt-8 px-5 pb-24 lg:px-8" aria-labelledby="ecosystem-timeline-title">
      <div className="rounded-[30px] border border-white/[.1] bg-[#0b1124]/76 p-5 shadow-2xl sm:p-8">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-cyan-300">ECOSYSTEM HISTORY</p>
            <h2 id="ecosystem-timeline-title" className="font-display mt-2 text-3xl font-semibold tracking-[-.04em]">Every documented model launch, in one view.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">A consolidated lane for each provider, showing documented model releases from January 2023 through the latest confirmed update.</p>
          </div>
          <p className="text-xs leading-5 text-slate-500">{events.length} documented releases · 2023–{latestEvent?.date.slice(0, 4)}</p>
        </div>

        <div className="mt-6 rounded-2xl border border-white/[.07] bg-[#080e20]/75 p-2 sm:p-4">
          <div className="overflow-x-auto pb-1">
            <svg viewBox={`0 0 ${width} ${height}`} className="block min-w-[780px]" role="img" aria-label="Consolidated timeline of documented AI model releases by provider">
              <title>AI model release timeline</title>
              <desc>Each horizontal lane represents one provider. Dots show documented model releases from 2023 onward; selecting a dot reveals its model name, version, detail, and official source.</desc>
              {years.map((year) => {
                const x = xForDate(`${year}-01-01`);
                return <g key={year}><line x1={x} x2={x} y1="48" y2={height - 18} stroke="rgba(148,163,184,.13)" strokeWidth="1"/><text x={x} y="28" textAnchor="middle" fill="#94a3b8" fontSize="13">{year}</text></g>;
              })}
              {providers.map((provider, index) => {
                const y = 64 + index * rowHeight;
                return <g key={provider.slug}><line x1={timelineStart} x2={timelineEnd} y1={y} y2={y} stroke="rgba(148,163,184,.18)" strokeWidth="1"/><text x={labelWidth} y={y + 4} textAnchor="end" fill="#cbd5e1" fontSize="13">{provider.name}</text>{events.filter((event) => event.provider.slug === provider.slug).map((event) => {
                  const isSelected = event.id === selected.id;
                  const x = xForDate(event.date);
                  return <g key={event.id}><circle cx={x} cy={y} r={isSelected ? 7 : 5} fill={provider.colors.primary} stroke="#080e20" strokeWidth={isSelected ? 3 : 2} pointerEvents="none"><title>{`${provider.name} · ${event.label} · ${formatDate(event.date)}`}</title></circle><foreignObject x={x - 11} y={y - 11} width="22" height="22"><button type="button" title={`${provider.name} · ${event.label}`} aria-label={`${provider.name}: ${event.label}, ${formatDate(event.date)}`} aria-pressed={isSelected} className="block h-[22px] w-[22px] rounded-full bg-transparent focus:outline-none focus:ring-2 focus:ring-white/90" onClick={() => setSelectedId(event.id)} onFocus={() => setSelectedId(event.id)} onMouseEnter={() => setSelectedId(event.id)}><span className="sr-only">{`${provider.name}: ${event.label}, ${formatDate(event.date)}`}</span></button></foreignObject></g>;
                })}</g>;
              })}
            </svg>
          </div>
        </div>

        <div className="mt-5 flex flex-col justify-between gap-4 rounded-2xl border border-cyan-400/30 bg-gradient-to-r from-cyan-400/[.14] via-violet-500/[.1] to-transparent p-4 shadow-[0_0_42px_rgba(6,182,212,.08)] sm:flex-row sm:items-center">
          <div className="min-w-0">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/[.09] px-2 py-1 text-[10px] font-semibold uppercase tracking-[.13em] text-cyan-100"><span className="h-1.5 w-1.5 rounded-full bg-cyan-200"/>Selected release details</div>
            <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: selected.provider.colors.primary }}><CalendarDays className="h-3.5 w-3.5"/><time dateTime={selected.date}>{formatDate(selected.date)}</time><span className="text-slate-600">·</span><span className="text-slate-300">{selected.provider.name}</span></div>
            <p className="mt-3 text-[10px] font-semibold uppercase tracking-[.13em] text-slate-500">Model &amp; version</p>
            <h3 className="font-display mt-1 text-lg font-semibold text-slate-100">{selected.label}</h3>
            <p className="mt-1 text-sm text-slate-400">{selected.detail}</p>
          </div>
          <a href={selected.source} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-white/10 bg-[#0b1124]/80 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-cyan-400/25 hover:text-cyan-100">Official source <ExternalLink className="h-3.5 w-3.5" /></a>
        </div>
      </div>
    </section>
  );
}
