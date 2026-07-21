"use client";

import { useState } from "react";
import { ExternalLink, HardDrive, ServerCog } from "lucide-react";

type PublishedModelSpec = {
  name: string;
  provider: string;
  parametersB: number;
  activeParametersB?: number;
  source: string;
};

type BubbleAnchor = {
  x: number;
  y: number;
};

const specs: PublishedModelSpec[] = [
  { name: "Mistral 7B", provider: "Mistral AI", parametersB: 7.3, source: "https://mistral.ai/news/announcing-mistral-7b/" },
  { name: "Llama 3.1 8B", provider: "Meta AI", parametersB: 8, source: "https://ai.meta.com/blog/meta-llama-3-1/" },
  { name: "Phi-4", provider: "Microsoft", parametersB: 14, source: "https://www.microsoft.com/en-us/research/uploads/prod/2025/01/WEF-2025_Leave-Behind_Phi-4.pdf" },
  { name: "Phi-4 Reasoning Vision", provider: "Microsoft", parametersB: 15, source: "https://www.microsoft.com/en-us/research/blog/phi-4-reasoning-vision-and-the-lessons-of-training-a-multimodal-reasoning-model/" },
  { name: "Gemma 3 27B", provider: "Google", parametersB: 27, source: "https://developers.googleblog.com/en/introducing-gemma3/" },
  { name: "North Mini Code", provider: "Cohere", parametersB: 30, activeParametersB: 3, source: "https://cohere.com/blog/north-mini-code" },
  { name: "Granite 4.1 30B", provider: "IBM", parametersB: 30, source: "https://research.ibm.com/blog/granite-4-1-ai-foundation-models" },
  { name: "Nemotron 3 Nano Omni", provider: "NVIDIA", parametersB: 30, activeParametersB: 3, source: "https://blogs.nvidia.com/blog/nemotron-3-nano-omni-multimodal-ai-agents/" },
  { name: "Granite 4.0 H Small", provider: "IBM", parametersB: 32, activeParametersB: 9, source: "https://www.ibm.com/think/news/hybrid-thinking-inside-architecture-granite-4-0" },
  { name: "Jamba 2 Mini", provider: "AI21 Labs", parametersB: 52, activeParametersB: 12, source: "https://www.ai21.com/blog/introducing-jamba2/" },
  { name: "Llama 3.1 70B", provider: "Meta AI", parametersB: 70, source: "https://ai.meta.com/blog/meta-llama-3-1/" },
  { name: "Llama 4 Scout", provider: "Meta AI", parametersB: 109, activeParametersB: 17, source: "https://ai.meta.com/blog/llama-4-multimodal-intelligence/" },
  { name: "Nemotron 3 Super", provider: "NVIDIA", parametersB: 120, activeParametersB: 12, source: "https://blogs.nvidia.com/blog/nemotron-3-super-agentic-ai/" },
  { name: "Qwen3 235B-A22B", provider: "Alibaba Qwen", parametersB: 235, activeParametersB: 22, source: "https://github.com/QwenLM/Qwen3" },
  { name: "Llama 3.1 405B", provider: "Meta AI", parametersB: 405, source: "https://ai.meta.com/blog/meta-llama-3-1/" },
  { name: "Llama 4 Maverick", provider: "Meta AI", parametersB: 400, activeParametersB: 17, source: "https://ai.meta.com/blog/llama-4-multimodal-intelligence/" },
  { name: "DeepSeek-V3", provider: "DeepSeek", parametersB: 671, activeParametersB: 37, source: "https://api-docs.deepseek.com/news/news1226/" },
  { name: "Kimi K3", provider: "Moonshot AI", parametersB: 2800, source: "https://www.kimi.com/help/agent/agent-overview" },
];

const bubbleAnchors: BubbleAnchor[] = [
  { x: 27, y: 14 },
  { x: 7, y: 34 },
  { x: 7, y: 48 },
  { x: 28, y: 64 },
  { x: 8, y: 76 },
  { x: 71, y: 86 },
  { x: 27, y: 90 },
  { x: 44, y: 89 },
  { x: 17, y: 89 },
  { x: 35, y: 78 },
  { x: 17, y: 27 },
  { x: 18, y: 66 },
  { x: 48, y: 49 },
  { x: 36, y: 50 },
  { x: 43, y: 22 },
  { x: 64, y: 20 },
  { x: 57, y: 71 },
  { x: 82, y: 46 },
];

const bubbleLabels: Record<string, string> = {
  "Phi-4 Reasoning Vision": "Phi-4 Vision",
  "Granite 4.1 30B": "Granite 4.1",
  "Nemotron 3 Nano Omni": "Nano Omni",
  "Granite 4.0 H Small": "Granite 4.0",
  "Jamba 2 Mini": "Jamba 2",
  "Llama 3.1 8B": "Llama 8B",
  "Llama 3.1 70B": "Llama 70B",
  "Llama 3.1 405B": "Llama 405B",
  "Llama 4 Maverick": "Maverick",
  "Llama 4 Scout": "Scout",
  "Nemotron 3 Super": "Super",
  "North Mini Code": "North Mini",
  "Qwen3 235B-A22B": "Qwen3",
  "DeepSeek-V3": "DeepSeek V3",
};

function storageGb(parametersB: number, bytesPerParameter: number) {
  return parametersB * bytesPerParameter;
}

function formatGb(value: number) {
  return value >= 1000 ? `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)} TB` : `${value.toFixed(value < 10 ? 1 : 0)} GB`;
}

function logScale(value: number, start: number, end: number, ceiling: number) {
  const min = Math.log10(1);
  const max = Math.log10(ceiling);
  return Number((start + ((Math.log10(Math.max(1, value)) - min) / (max - min)) * (end - start)).toFixed(2));
}

function parameterLabel(spec: PublishedModelSpec) {
  return spec.activeParametersB
    ? `${spec.parametersB}B total / ${spec.activeParametersB}B active`
    : `${spec.parametersB}B total`;
}

function bubbleDiameter(value: number, min: number, max: number) {
  const minRoot = Math.sqrt(min);
  const maxRoot = Math.sqrt(max);
  const valueRoot = Math.sqrt(value);
  return Number((7.2 + ((valueRoot - minRoot) / (maxRoot - minRoot)) * 15).toFixed(2));
}

export function OpenModelSizing() {
  const width = 1180;
  const left = 215;
  const right = 1140;
  const top = 52;
  const memoryHeight = top + specs.length * 34 + 44;
  const memoryTicks = [1, 10, 100, 1000, 10000, 100000];
  const fp16Storage = specs.map((spec) => storageGb(spec.parametersB, 2));
  const minimumFp16Storage = Math.min(...fp16Storage);
  const maximumFp16Storage = Math.max(...fp16Storage);
  const [selectedName, setSelectedName] = useState("Kimi K3");
  const selectedIndex = specs.findIndex((spec) => spec.name === selectedName);
  const selectedSpec = specs[selectedIndex] ?? specs[specs.length - 1];
  const selectedFp16Storage = fp16Storage[selectedIndex] ?? fp16Storage[fp16Storage.length - 1];

  return (
    <section id="sizing" className="relative z-10 mx-auto max-w-7xl scroll-mt-8 px-5 pb-24 lg:px-8" aria-labelledby="sizing-title">
      <div className="rounded-[30px] border border-white/[.1] bg-[#0b1124]/76 p-5 shadow-2xl sm:p-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-violet-300">OPEN-MODEL DEPLOYMENT GUIDE</p>
          <h2 id="sizing-title" className="font-display mt-2 text-3xl font-semibold tracking-[-.04em]">What parameter scale means for storage and memory.</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">These are reproducible weight-only calculations from published parameter counts—not vendor benchmark claims. For mixture-of-experts (MoE) models, bars use total weights while the listed active scale describes per-token computation. Actual serving memory also depends on the runtime, context length, batch size, KV cache, and hardware.</p>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <section className="rounded-2xl border border-white/[.08] bg-[#080e20]/65 p-4 sm:p-5" aria-labelledby="storage-title">
            <div className="flex items-start gap-3"><span className="mt-0.5 rounded-lg bg-violet-400/10 p-2 text-violet-200"><HardDrive className="h-4 w-4" /></span><div><h3 id="storage-title" className="font-display text-xl font-semibold">Parameter count vs. download size</h3><p className="mt-1 text-xs leading-5 text-slate-500">A free-form model field: bubble area represents approximate FP16 / BF16 model weights. Hover, focus, or select a model for its precise value.</p></div></div>
            <div className="mt-5"><div className="relative aspect-[12/7] w-full overflow-hidden rounded-2xl border border-violet-300/[.12] bg-[radial-gradient(circle_at_55%_38%,rgba(124,58,237,.16),transparent_42%),linear-gradient(135deg,rgba(15,23,42,.78),rgba(5,8,22,.95))] p-3" role="group" aria-label="Free-form bubble chart of model sizes. Bubble area is based on approximate FP16 and BF16 weight storage.">{specs.map((spec, index) => { const value = fp16Storage[index]; const diameter = bubbleDiameter(value, minimumFp16Storage, maximumFp16Storage); const anchor = bubbleAnchors[index]; const isSelected = spec.name === selectedSpec.name; const label = bubbleLabels[spec.name] ?? spec.name; const showValue = diameter >= 14; const labelSize = Math.max(9, Math.min(25, diameter * 1.3)); return <button key={spec.name} type="button" aria-pressed={isSelected} aria-label={`${spec.name}. ${parameterLabel(spec)}. FP16 or BF16 weights approximately ${formatGb(value)}.`} onClick={() => setSelectedName(spec.name)} onFocus={() => setSelectedName(spec.name)} onMouseEnter={() => setSelectedName(spec.name)} className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border text-center font-medium leading-tight text-white transition duration-200 motion-reduce:transition-none hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-[#080e20]" style={{ left: `${anchor.x}%`, top: `${anchor.y}%`, width: `${diameter}%`, aspectRatio: "1", borderColor: isSelected ? "rgba(103,232,249,.95)" : "rgba(167,139,250,.7)", background: isSelected ? "radial-gradient(circle at 34% 28%, rgba(255,255,255,.28), rgba(124,58,237,.7) 38%, rgba(31,41,55,.96) 100%)" : "radial-gradient(circle at 34% 28%, rgba(255,255,255,.18), rgba(124,58,237,.48) 40%, rgba(15,23,42,.96) 100%)", boxShadow: isSelected ? "0 0 0 2px rgba(6,182,212,.18), 0 0 32px rgba(124,58,237,.6), inset 0 0 20px rgba(255,255,255,.1)" : "0 0 20px rgba(124,58,237,.3), inset 0 0 14px rgba(255,255,255,.08)" }}><span className="px-1.5" style={{ fontSize: `clamp(8px, ${diameter * 0.12}vw, ${labelSize}px)` }}>{label}</span>{showValue ? <span className="mt-0.5 text-[8px] text-violet-100/90 sm:text-xs">{formatGb(value)}</span> : null}</button>; })}</div></div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400"><span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-violet-400" />Bubble area: FP16 / BF16 weights</span><span aria-live="polite" className="rounded-full border border-cyan-300/20 bg-cyan-400/[.06] px-2.5 py-1 text-cyan-100">Selected: {selectedSpec.name} · {parameterLabel(selectedSpec)} · {formatGb(selectedFp16Storage)}</span></div>
          </section>

          <section className="rounded-2xl border border-white/[.08] bg-[#080e20]/65 p-4 sm:p-5" aria-labelledby="memory-title">
            <div className="flex items-start gap-3"><span className="mt-0.5 rounded-lg bg-cyan-400/10 p-2 text-cyan-200"><ServerCog className="h-4 w-4" /></span><div><h3 id="memory-title" className="font-display text-xl font-semibold">Inference vs. training memory envelope</h3><p className="mt-1 text-xs leading-5 text-slate-500">INT4 weights for inference compared with a rule-of-thumb mixed-precision Adam training footprint (≈16 bytes per parameter).</p></div></div>
            <div className="mt-5 overflow-x-auto"><svg viewBox={`0 0 ${width} ${memoryHeight}`} className="block min-w-[760px]" role="img" aria-label="Bar chart comparing estimated INT4 inference memory and mixed precision Adam training memory"><title>Inference and training memory estimates</title><desc>Inference uses INT4 weights only. Training estimate is a rule of thumb that includes weights, gradients, master weights, and optimizer state. MoE bars use total weights.</desc>{memoryTicks.map((tick) => { const x = logScale(tick, left, right, 100000); return <g key={tick}><line x1={x} x2={x} y1="34" y2={memoryHeight - 28} stroke="rgba(148,163,184,.14)"/><text x={x} y="20" textAnchor="middle" fill="#94a3b8" fontSize="12">{tick >= 1000 ? `${tick / 1000} TB` : `${tick} GB`}</text></g>; })}{specs.map((spec, index) => { const y = top + index * 34; const inference = storageGb(spec.parametersB, 0.5); const training = storageGb(spec.parametersB, 16); const inferenceEnd = logScale(inference, left, right, 100000); const trainingEnd = logScale(training, left, right, 100000); return <g key={spec.name}><text x={left - 12} y={y + 17} textAnchor="end" fill="#cbd5e1" fontSize="13">{spec.name}</text><rect x={left} y={y} width={Math.max(2, inferenceEnd - left)} height="9" rx="4.5" fill="#06b6d4"><title>{`${spec.name} (${parameterLabel(spec)}): INT4 inference weights ≈ ${formatGb(inference)}`}</title></rect><rect x={left} y={y + 12} width={Math.max(2, trainingEnd - left)} height="9" rx="4.5" fill="#ec4899"><title>{`${spec.name} (${parameterLabel(spec)}): mixed-precision Adam training estimate ≈ ${formatGb(training)}`}</title></rect></g>; })}</svg></div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-slate-400"><span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-cyan-400" />INT4 inference weights</span><span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-pink-400" />Mixed-precision Adam training estimate</span></div>
          </section>
        </div>

        <div className="mt-6 rounded-2xl border border-white/[.08] bg-white/[.025] p-4 text-xs leading-5 text-slate-500">Published parameter-count sources: {specs.map((spec, index) => <span key={spec.name}><a href={spec.source} target="_blank" rel="noreferrer" className="font-medium text-slate-300 hover:text-cyan-200">{spec.name}<ExternalLink className="ml-1 inline h-3 w-3" /></a>{index < specs.length - 1 ? " · " : ""}</span>)}.</div>
      </div>
    </section>
  );
}
