import { CalendarDays, ExternalLink } from "lucide-react";
import { type ModelLaunch, type Provider } from "@/lib/providers";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function launchValue(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return Date.UTC(year, month - 1, day);
}

function formatLaunchDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return `${monthNames[month - 1]} ${day}, ${year}`;
}

export function ModelLaunchTimeline({ provider, launches }: { provider: Provider; launches: ModelLaunch[] }) {
  const events = [...launches].sort((left, right) => left.date.localeCompare(right.date));
  const values = events.map((event) => launchValue(event.date));
  const min = Math.min(...values);
  const max = Math.max(...values);
  const padding = 48;
  const chartWidth = 1000;
  const usableWidth = chartWidth - padding * 2;
  const positionsByDate = new Map<string, number>();
  const countsByDate = new Map<string, number>();

  events.forEach((event) => countsByDate.set(event.date, (countsByDate.get(event.date) ?? 0) + 1));

  function eventPosition(event: ModelLaunch) {
    const value = launchValue(event.date);
    const baseX = min === max ? chartWidth / 2 : padding + ((value - min) / (max - min)) * usableWidth;
    const positionInDate = positionsByDate.get(event.date) ?? 0;
    positionsByDate.set(event.date, positionInDate + 1);
    const totalForDate = countsByDate.get(event.date) ?? 1;
    return { x: Number((baseX + (positionInDate - (totalForDate - 1) / 2) * 17).toFixed(2)), y: 60 + positionInDate * 14 };
  }

  const points = events.map((event) => ({ event, ...eventPosition(event) }));
  const yearTicks = [...new Set(events.map((event) => event.date.slice(0, 4)))];

  return (
    <section className="rounded-3xl border border-white/[.08] bg-[#0b1124]/72 p-6" aria-labelledby="launch-timeline-title">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-cyan-300">MODEL RELEASE HISTORY</p>
          <h2 id="launch-timeline-title" className="font-display mt-2 text-2xl font-semibold tracking-[-.04em]">Major model launches</h2>
        </div>
        <p className="max-w-sm text-xs leading-5 text-slate-500">Selected documented milestones for the {provider.name} model ecosystem.</p>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/[.07] bg-[#080e20]/75 px-2 py-2">
        <svg viewBox="0 0 1000 125" className="block h-auto w-full" role="img" aria-label={`Timeline of selected ${provider.name} model launches`}>
          <line x1={padding} x2={chartWidth - padding} y1="60" y2="60" stroke="rgba(148,163,184,.28)" strokeWidth="1" />
          {yearTicks.map((year) => {
            const date = events.find((event) => event.date.startsWith(year))?.date;
            if (!date) return null;
            const value = launchValue(date);
            const x = min === max ? chartWidth / 2 : padding + ((value - min) / (max - min)) * usableWidth;
            return <text key={year} x={x} y="112" textAnchor="middle" fill="#64748b" fontSize="12">{year}</text>;
          })}
          {points.map(({ event, x, y }) => <g key={`${event.date}-${event.label}`}>
            <line x1={x} x2={x} y1="60" y2={y} stroke={provider.colors.primary} strokeOpacity="0.55" strokeWidth="1" />
            <circle cx={x} cy={y} r="5" fill={provider.colors.primary} stroke="#080e20" strokeWidth="2" />
            <title>{`${event.label} · ${formatLaunchDate(event.date)}`}</title>
          </g>)}
        </svg>
      </div>

      <ol className="mt-5 grid gap-3 sm:grid-cols-2">
        {events.map((event) => <li key={`${event.date}-${event.label}`} className="rounded-xl border border-white/[.07] bg-white/[.025] p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-medium" style={{ color: provider.colors.primary }}><CalendarDays className="h-3.5 w-3.5" /> <time dateTime={event.date}>{formatLaunchDate(event.date)}</time></div>
            <a href={event.source} target="_blank" rel="noreferrer" className="shrink-0 text-slate-500 transition hover:text-cyan-200" aria-label={`Read the official ${event.label} release source`}><ExternalLink className="h-3.5 w-3.5" /></a>
          </div>
          <h3 className="font-display mt-3 text-base font-semibold text-slate-100">{event.label}</h3>
          <p className="mt-1 text-xs leading-5 text-slate-500">{event.detail}</p>
        </li>)}
      </ol>
    </section>
  );
}
