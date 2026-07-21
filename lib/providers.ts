export type Access = "API" | "Open models" | "API + open models";
export type ProviderCategory = "Frontier lab" | "Open-model lab" | "Enterprise AI";

export type Provider = {
  slug: string;
  name: string;
  shortName: string;
  category: ProviderCategory;
  access: Access;
  website: string;
  docs: string;
  headquarters: string;
  coordinates: [longitude: number, latitude: number];
  founded: string;
  overview: string;
  models: string[];
  colors: { primary: string; soft: string };
  openSource: boolean;
  chatUrl?: string;
  notes: string;
};

export type ModelLaunch = {
  date: string;
  label: string;
  detail: string;
  source: string;
};

export const providers: Provider[] = [
  { slug: "openai", name: "OpenAI", shortName: "OA", category: "Frontier lab", access: "API", website: "https://openai.com", docs: "https://developers.openai.com/", headquarters: "San Francisco, United States", coordinates: [-122.4194, 37.7749], founded: "2015", overview: "Builds general-purpose AI systems for text, reasoning, realtime voice, and image generation.", models: ["GPT-5.6", "GPT-5.5", "GPT Image", "o-series"], colors: { primary: "#10a37f", soft: "#10a37f20" }, openSource: false, chatUrl: "https://chatgpt.com", notes: "Browse the official model catalog for current capabilities, pricing, and deprecation status." },
  { slug: "anthropic", name: "Anthropic", shortName: "An", category: "Frontier lab", access: "API", website: "https://www.anthropic.com", docs: "https://docs.anthropic.com", headquarters: "San Francisco, United States", coordinates: [-122.4194, 37.7749], founded: "2021", overview: "Research and product company focused on reliable, steerable AI systems and the Claude model family.", models: ["Claude Sonnet 4.6", "Claude Opus 4.6", "Claude Code"], colors: { primary: "#d97757", soft: "#d9775720" }, openSource: false, chatUrl: "https://claude.ai", notes: "Use the official console and documentation for current models, rate limits, and pricing." },
  { slug: "google-deepmind", name: "Google DeepMind", shortName: "GD", category: "Frontier lab", access: "API", website: "https://deepmind.google", docs: "https://ai.google.dev/gemini-api/docs", headquarters: "London, United Kingdom", coordinates: [-0.1276, 51.5072], founded: "2010", overview: "Google’s AI research and product organization behind Gemini and a range of scientific AI work.", models: ["Gemini 3.5 Flash", "Gemini 3 Deep Think", "Gemma", "Veo"], colors: { primary: "#4285f4", soft: "#4285f420" }, openSource: true, chatUrl: "https://gemini.google.com", notes: "Gemini API documentation tracks stable and preview API versions separately." },
  { slug: "xai", name: "xAI", shortName: "x", category: "Frontier lab", access: "API", website: "https://x.ai", docs: "https://docs.x.ai", headquarters: "Palo Alto, United States", coordinates: [-122.143, 37.4419], founded: "2023", overview: "Develops Grok models and multimodal APIs for reasoning, search, voice, images, and code.", models: ["Grok 4.5", "Grok 4.3", "Grok Imagine Video 1.5", "Grok Build"], colors: { primary: "#d1d5db", soft: "#d1d5db20" }, openSource: false, chatUrl: "https://grok.com", notes: "The official xAI API includes model, modality, and pricing information." },
  { slug: "mistral", name: "Mistral AI", shortName: "Mi", category: "Open-model lab", access: "API + open models", website: "https://mistral.ai", docs: "https://docs.mistral.ai", headquarters: "Paris, France", coordinates: [2.3522, 48.8566], founded: "2023", overview: "European AI company offering frontier APIs alongside open and commercial language and multimodal models.", models: ["Robostral Navigate", "Mistral OCR 4", "Leanstral 1.5", "Magistral"], colors: { primary: "#ff7000", soft: "#ff700020" }, openSource: true, chatUrl: "https://chat.mistral.ai", notes: "Availability differs by model; consult the official docs and model cards before deployment." },
  { slug: "meta-ai", name: "Meta AI", shortName: "Me", category: "Open-model lab", access: "Open models", website: "https://ai.meta.com", docs: "https://ai.meta.com/llama/", headquarters: "Menlo Park, United States", coordinates: [-122.1826, 37.453], founded: "2013", overview: "Meta’s AI organization publishes Llama open models and supports deployment through a broad partner ecosystem.", models: ["Llama 4", "Llama 3.3", "Llama Guard", "Segment Anything"], colors: { primary: "#0866ff", soft: "#0866ff20" }, openSource: true, notes: "Llama availability and licensing are provided through Meta and authorized hosting partners." },
  { slug: "deepseek", name: "DeepSeek", shortName: "Ds", category: "Open-model lab", access: "API + open models", website: "https://www.deepseek.com", docs: "https://platform.deepseek.com/api-docs/", headquarters: "Hangzhou, China", coordinates: [120.1551, 30.2741], founded: "2023", overview: "Develops reasoning, code, and general-purpose models with API access and published open-weight releases.", models: ["DeepSeek-V4", "DeepSeek-V3.2", "DeepSeek-R1", "DeepSeek Coder"], colors: { primary: "#2563eb", soft: "#2563eb20" }, openSource: true, chatUrl: "https://chat.deepseek.com", notes: "Check the official platform for active API model IDs and current quotas." },
  { slug: "moonshot", name: "Moonshot AI", shortName: "Km", category: "Frontier lab", access: "API", website: "https://www.moonshot.cn", docs: "https://platform.moonshot.ai/docs", headquarters: "Beijing, China", coordinates: [116.4074, 39.9042], founded: "2023", overview: "Developer of the Kimi assistant and long-context language-model services.", models: ["Kimi K3", "Kimi K2.6", "Kimi K2.5"], colors: { primary: "#ec4899", soft: "#ec489920" }, openSource: false, chatUrl: "https://kimi.moonshot.cn", notes: "Official documentation is the source of truth for active Kimi models and integrations." },
  { slug: "qwen", name: "Alibaba Qwen", shortName: "Qw", category: "Open-model lab", access: "API + open models", website: "https://qwen.ai", docs: "https://qwen.readthedocs.io", headquarters: "Hangzhou, China", coordinates: [120.1551, 30.2741], founded: "2023", overview: "Alibaba’s Qwen team publishes multilingual, code, vision, audio, and reasoning model families.", models: ["Qwen 3.6 Plus", "Qwen3-Coder", "Qwen VL", "Qwen3"], colors: { primary: "#7c3aed", soft: "#7c3aed20" }, openSource: true, chatUrl: "https://chat.qwen.ai", notes: "Qwen’s official documentation and model cards explain licensing and deployment options." },
  { slug: "zhipu", name: "Zhipu AI", shortName: "GL", category: "Frontier lab", access: "API", website: "https://www.zhipuai.cn", docs: "https://open.bigmodel.cn/dev/api", headquarters: "Beijing, China", coordinates: [116.4074, 39.9042], founded: "2019", overview: "AI company behind the GLM model family, tools, and agent-oriented developer platform.", models: ["GLM-5.2", "GLM-5.1", "GLM-5V-Turbo", "CodeGeeX"], colors: { primary: "#06b6d4", soft: "#06b6d420" }, openSource: false, notes: "Use the official BigModel developer platform for model access and pricing details." },
  { slug: "cohere", name: "Cohere", shortName: "Co", category: "Enterprise AI", access: "API", website: "https://cohere.com", docs: "https://docs.cohere.com", headquarters: "Toronto, Canada", coordinates: [-79.3832, 43.6532], founded: "2019", overview: "Enterprise-focused AI company offering language, embedding, retrieval, and agent capabilities.", models: ["North Mini Code", "Command A+", "Command", "Rerank 4"], colors: { primary: "#f59e0b", soft: "#f59e0b20" }, openSource: false, notes: "Cohere documentation includes production integration and enterprise deployment guidance." },
  { slug: "ai21", name: "AI21 Labs", shortName: "A21", category: "Frontier lab", access: "API", website: "https://www.ai21.com", docs: "https://docs.ai21.com", headquarters: "Tel Aviv, Israel", coordinates: [34.7818, 32.0853], founded: "2017", overview: "Builds language models and enterprise AI systems, including the Jamba model family.", models: ["Jamba2", "Jamba", "Jurassic"], colors: { primary: "#8b5cf6", soft: "#8b5cf620" }, openSource: false, notes: "Check official docs for current model offerings and supported deployment patterns." },
  { slug: "nvidia", name: "NVIDIA AI", shortName: "Nv", category: "Enterprise AI", access: "API + open models", website: "https://www.nvidia.com/en-us/ai/", docs: "https://build.nvidia.com", headquarters: "Santa Clara, United States", coordinates: [-121.9552, 37.3541], founded: "1993", overview: "Provides accelerated AI infrastructure, model tooling, inference endpoints, and the Nemotron family.", models: ["Nemotron 3 Ultra", "Nemotron 3 Super", "Nemotron 3 Nano Omni", "NIM"], colors: { primary: "#76b900", soft: "#76b90020" }, openSource: true, notes: "NVIDIA Build and NIM provide official model and deployment information." },
  { slug: "ibm-watsonx", name: "IBM watsonx AI", shortName: "IBM", category: "Enterprise AI", access: "API + open models", website: "https://www.ibm.com/watsonx", docs: "https://www.ibm.com/docs/en/watsonx", headquarters: "Armonk, United States", coordinates: [-73.7146, 41.1265], founded: "1911", overview: "Enterprise AI platform with governed model operations and the Granite family of open foundation models.", models: ["Granite 4.1", "Granite 4.0", "Granite Guardian", "InstructLab"], colors: { primary: "#0f62fe", soft: "#0f62fe20" }, openSource: true, notes: "watsonx documentation covers model governance, deployment, and API workflows." },
  { slug: "amazon-nova", name: "Amazon Nova", shortName: "AN", category: "Enterprise AI", access: "API", website: "https://aws.amazon.com/ai/generative-ai/nova/", docs: "https://docs.aws.amazon.com/bedrock/", headquarters: "Seattle, United States", coordinates: [-122.3321, 47.6062], founded: "2024", overview: "Amazon’s Nova model family is available through AWS services for generative AI workloads.", models: ["Nova 2 Lite", "Nova 2 Pro", "Nova 2 Sonic", "Nova Embeddings"], colors: { primary: "#ff9900", soft: "#ff990020" }, openSource: false, notes: "AWS Bedrock documentation is the authoritative source for regional and model availability." },
  { slug: "microsoft-phi", name: "Microsoft AI", shortName: "Ms", category: "Open-model lab", access: "API + open models", website: "https://www.microsoft.com/ai", docs: "https://learn.microsoft.com/azure/ai-foundry/", headquarters: "Redmond, United States", coordinates: [-122.1215, 47.6739], founded: "1975", overview: "Builds AI products, Azure AI services, and the small language model Phi family.", models: ["Phi-4-reasoning-vision", "Phi-4-reasoning", "Phi-4", "Azure AI Foundry"], colors: { primary: "#00a4ef", soft: "#00a4ef20" }, openSource: true, notes: "Azure AI Foundry documentation provides hosted model and deployment details." },
];

export const inferencePlatforms = [
  { name: "OpenRouter", description: "One API for a broad model catalog", website: "https://openrouter.ai", access: "Multi-provider routing" },
  { name: "Together AI", description: "Inference and fine-tuning for open models", website: "https://www.together.ai", access: "Open-model inference" },
  { name: "Fireworks AI", description: "Fast managed inference for open models", website: "https://fireworks.ai", access: "Serverless inference" },
  { name: "GroqCloud", description: "Low-latency inference on LPUs", website: "https://groq.com", access: "High-speed inference" },
  { name: "Hugging Face Inference", description: "Hosted inference across a large model ecosystem", website: "https://huggingface.co/inference-api", access: "Model hosting" },
  { name: "Replicate", description: "Run community and open-source models by API", website: "https://replicate.com", access: "Hosted community models" },
  { name: "Cerebras Inference", description: "High-speed inference platform", website: "https://www.cerebras.ai", access: "Fast inference" },
  { name: "Cloudflare Workers AI", description: "Edge-hosted AI inference", website: "https://developers.cloudflare.com/workers-ai/", access: "Edge inference" },
];

export const openModelCreators = ["Meta AI · Llama", "Mistral AI · Mistral & Magistral", "DeepSeek · DeepSeek", "Alibaba Qwen · Qwen", "Google · Gemma", "Microsoft · Phi", "Nous Research · Hermes", "01.AI · Yi", "Allen AI · OLMo", "Databricks · DBRX"];

export const modelLaunches: Record<Provider["slug"], ModelLaunch[]> = {
  openai: [
    { date: "2023-03-14", label: "GPT-4", detail: "Multimodal GPT-4 research release", source: "https://openai.com/index/gpt-4-research/" },
    { date: "2024-05-13", label: "GPT-4o", detail: "Native multimodal flagship model", source: "https://openai.com/index/hello-gpt-4o/" },
    { date: "2024-09-12", label: "o1", detail: "Reasoning-model preview", source: "https://openai.com/index/introducing-openai-o1-preview/" },
    { date: "2025-03-25", label: "4o image generation", detail: "Native image generation in GPT-4o", source: "https://openai.com/index/introducing-4o-image-generation/" },
    { date: "2026-04-23", label: "GPT-5.5", detail: "Next-generation GPT model release", source: "https://openai.com/index/introducing-gpt-5-5/" },
    { date: "2026-07-09", label: "GPT-5.6", detail: "GPT-5.6 model family general availability", source: "https://openai.com/index/gpt-5-6/" },
  ],
  anthropic: [
    { date: "2023-03-14", label: "Claude", detail: "First public Claude announcement", source: "https://www.anthropic.com/news/introducing-claude" },
    { date: "2024-03-04", label: "Claude 3", detail: "Opus, Sonnet, and Haiku family", source: "https://www.anthropic.com/news/claude-3-family" },
    { date: "2024-06-20", label: "Claude 3.5 Sonnet", detail: "Upgraded Sonnet model family", source: "https://www.anthropic.com/news/claude-3-5-sonnet" },
    { date: "2025-02-24", label: "Claude Code", detail: "Agentic coding command-line tool", source: "https://www.anthropic.com/news/claude-3-7-sonnet" },
    { date: "2026-02-05", label: "Claude Opus 4.6", detail: "Frontier Claude model with a 1M-token context beta", source: "https://www.anthropic.com/news/claude-opus-4-6" },
    { date: "2026-02-17", label: "Claude Sonnet 4.6", detail: "Frontier Claude model for coding, agents, and professional work", source: "https://www.anthropic.com/news" },
  ],
  "google-deepmind": [
    { date: "2023-12-06", label: "Gemini 1.0", detail: "First Gemini multimodal model family", source: "https://blog.google/technology/ai/google-gemini-ai/" },
    { date: "2024-02-21", label: "Gemma", detail: "Open model family release", source: "https://blog.google/technology/developers/gemma-open-models/" },
    { date: "2024-05-14", label: "Veo", detail: "Generative video model announcement", source: "https://deepmind.google/discover/blog/veo-our-most-capable-generative-video-model/" },
    { date: "2024-08-14", label: "Imagen 3", detail: "Latest Imagen image-generation model", source: "https://blog.google/technology/ai/google-imagen-3/" },
    { date: "2025-11-18", label: "Gemini 3", detail: "Third-generation Gemini model release", source: "https://blog.google/products-and-platforms/products/gemini/gemini-3-collection/" },
    { date: "2026-05-19", label: "Gemini 3.5 Flash", detail: "Flash model for agents and coding", source: "https://blog.google/products-and-platforms/products/search/search-io-2026/" },
  ],
  xai: [
    { date: "2023-11-03", label: "Grok", detail: "First public Grok announcement", source: "https://x.ai/news/grok" },
    { date: "2024-03-28", label: "Grok-1.5", detail: "Long-context and reasoning update", source: "https://x.ai/news/grok-1.5v" },
    { date: "2024-08-13", label: "Grok-2", detail: "Text and vision beta release", source: "https://x.ai/news/grok-2" },
    { date: "2025-02-19", label: "Grok 3", detail: "Reasoning-agent model preview", source: "https://x.ai/news/grok-3" },
    { date: "2026-06-17", label: "Grok 4.3", detail: "General availability of the Grok 4.3 model", source: "https://x.ai/news/grok-amazon-bedrock" },
    { date: "2026-07-16", label: "Grok 4.5", detail: "Latest Grok model release", source: "https://x.ai/news/grok-4-5" },
  ],
  mistral: [
    { date: "2023-09-27", label: "Mistral 7B", detail: "First open-weight Mistral model", source: "https://mistral.ai/news/announcing-mistral-7b" },
    { date: "2024-05-29", label: "Codestral", detail: "Code-generation model", source: "https://mistral.ai/news/codestral/" },
    { date: "2024-09-11", label: "Pixtral 12B", detail: "Multimodal open model", source: "https://mistral.ai/news/pixtral-12b/" },
    { date: "2025-06-10", label: "Magistral", detail: "Reasoning model family", source: "https://mistral.ai/news/magistral/" },
    { date: "2026-06-23", label: "Mistral OCR 4", detail: "Document-intelligence model release", source: "https://mistral.ai/news/" },
    { date: "2026-07-08", label: "Robostral Navigate", detail: "Mistral’s first model for embodied navigation", source: "https://mistral.ai/news/" },
  ],
  "meta-ai": [
    { date: "2023-07-18", label: "Llama 2", detail: "Open model release", source: "https://ai.meta.com/blog/llama-2/" },
    { date: "2024-04-18", label: "Llama 3", detail: "Next-generation open LLM", source: "https://ai.meta.com/blog/meta-llama-3/" },
    { date: "2024-07-23", label: "Llama 3.1", detail: "405B open model family", source: "https://ai.meta.com/blog/meta-llama-3-1/" },
    { date: "2024-09-25", label: "Llama 3.2", detail: "Vision and edge-focused family", source: "https://ai.meta.com/blog/llama-3-2-connect-2024-vision-edge-mobile-devices/" },
    { date: "2025-04-05", label: "Llama 4", detail: "Scout and Maverick multimodal model release", source: "https://ai.meta.com/blog/llama-4-multimodal-intelligence/" },
  ],
  deepseek: [
    { date: "2023-11-02", label: "DeepSeek Coder", detail: "Code model family release", source: "https://github.com/deepseek-ai/DeepSeek-Coder" },
    { date: "2024-05-06", label: "DeepSeek-V2", detail: "Mixture-of-experts model release", source: "https://github.com/deepseek-ai/DeepSeek-V2" },
    { date: "2024-12-26", label: "DeepSeek-V3", detail: "General-purpose MoE model release", source: "https://github.com/deepseek-ai/DeepSeek-V3" },
    { date: "2025-01-20", label: "DeepSeek-R1", detail: "Reasoning model family release", source: "https://github.com/deepseek-ai/DeepSeek-R1" },
    { date: "2025-12-01", label: "DeepSeek-V3.2", detail: "Updated chat and reasoning model family", source: "https://api-docs.deepseek.com/updates/" },
    { date: "2026-04-24", label: "DeepSeek-V4", detail: "V4-Pro and V4-Flash API release", source: "https://api-docs.deepseek.com/updates/" },
  ],
  moonshot: [
    { date: "2023-10-09", label: "Kimi", detail: "Moonshot’s long-context assistant launch", source: "https://www.moonshot.cn" },
    { date: "2024-03-18", label: "Kimi Chat", detail: "Expanded long-context assistant capabilities", source: "https://www.moonshot.cn" },
    { date: "2025-07-11", label: "Kimi K2", detail: "Open agentic model family", source: "https://moonshotai.github.io/Kimi-K2/" },
    { date: "2026-04-20", label: "Kimi K2.6", detail: "Open model update for coding and Agent Swarm", source: "https://www.kimi.com/help/agent/agent-overview" },
    { date: "2026-07-16", label: "Kimi K3", detail: "Open 3T-class model with native vision and 1M-token context", source: "https://www.kimi.com/help/agent/agent-overview" },
  ],
  qwen: [
    { date: "2023-09-07", label: "Qwen", detail: "First open Qwen language models", source: "https://github.com/QwenLM/Qwen" },
    { date: "2024-06-06", label: "Qwen2", detail: "Second-generation Qwen model family", source: "https://github.com/QwenLM/Qwen2" },
    { date: "2024-09-19", label: "Qwen2.5", detail: "Expanded Qwen2.5 model family", source: "https://github.com/QwenLM/Qwen2.5" },
    { date: "2025-04-29", label: "Qwen3", detail: "Qwen3 model series release", source: "https://github.com/QwenLM/Qwen3" },
    { date: "2026-01-30", label: "Qwen3-Coder", detail: "Open coding model powering Qwen Code", source: "https://qwenlm.github.io/qwen-code-docs/en/blog/thinks-like-a-programmer/" },
    { date: "2026-04-08", label: "Qwen 3.6 Plus", detail: "Qwen 3.6 Plus model launch", source: "https://qwenlm.github.io/qwen-code-docs/en/blog/updates/weekly-update-2026-04-09/" },
  ],
  zhipu: [
    { date: "2022-09-06", label: "CodeGeeX", detail: "Multilingual code-generation model", source: "https://github.com/zhipu-ai/codegeex" },
    { date: "2024-01-16", label: "GLM-4", detail: "GLM-4 model and platform release", source: "https://open.bigmodel.cn" },
    { date: "2024-10-25", label: "AutoGLM", detail: "Agent-oriented GLM product milestone", source: "https://www.zhipuai.cn" },
    { date: "2026-04-07", label: "GLM-5.1", detail: "Long-horizon agent model release", source: "https://docs.z.ai/release-notes/new-released" },
    { date: "2026-06-16", label: "GLM-5.2", detail: "Flagship model with a 1M-token context", source: "https://z.ai/blog/glm-5.2" },
  ],
  cohere: [
    { date: "2023-03-07", label: "Command", detail: "Enterprise language model family", source: "https://cohere.com/blog/command" },
    { date: "2023-11-02", label: "Embed v3", detail: "Embedding model release", source: "https://cohere.com/blog/introducing-embed-v3" },
    { date: "2024-03-11", label: "Command R", detail: "RAG-optimized model family", source: "https://cohere.com/blog/command-r" },
    { date: "2024-04-16", label: "Rerank 3", detail: "Reranking model family", source: "https://cohere.com/blog/rerank-3" },
    { date: "2026-05-20", label: "Command A+", detail: "Open enterprise model for sovereign critical infrastructure", source: "https://cohere.com/newsroom" },
    { date: "2026-06-09", label: "North Mini Code", detail: "Open agentic coding model for developers", source: "https://cohere.com/blog/north-mini-code" },
  ],
  ai21: [
    { date: "2021-08-11", label: "Jurassic-1", detail: "AI21’s first large language model family", source: "https://www.ai21.com/blog/announcing-jurassic-1" },
    { date: "2023-11-09", label: "Jamba-Instruct", detail: "Enterprise model platform milestone", source: "https://docs.ai21.com" },
    { date: "2024-03-28", label: "Jamba", detail: "Hybrid SSM-transformer model release", source: "https://www.ai21.com/blog/announcing-jamba" },
    { date: "2026-01-08", label: "Jamba2", detail: "Open model family for enterprise reliability and efficiency", source: "https://www.ai21.com/blog/introducing-jamba2/" },
  ],
  nvidia: [
    { date: "2019-11-18", label: "NeMo", detail: "NVIDIA conversational AI toolkit", source: "https://developer.nvidia.com/nemo-framework" },
    { date: "2024-03-18", label: "NIM", detail: "Inference microservices launch", source: "https://blogs.nvidia.com/blog/nvidia-nim-microservices/" },
    { date: "2024-04-17", label: "Nemotron-4", detail: "Open synthetic-data generation models", source: "https://developer.nvidia.com/blog/nvidia-releases-nemotron-4-340b-family-of-models-for-generating-synthetic-data/" },
    { date: "2026-03-11", label: "Nemotron 3 Super", detail: "Open model for complex agentic systems", source: "https://blogs.nvidia.com/blog/nemotron-3-super-agentic-ai/" },
    { date: "2026-04-28", label: "Nemotron 3 Nano Omni", detail: "Open model for vision, audio, and language agents", source: "https://blogs.nvidia.com/blog/nemotron-3-nano-omni-multimodal-ai-agents/" },
    { date: "2026-06-04", label: "Nemotron 3 Ultra", detail: "Open model for long-running agents", source: "https://blogs.nvidia.com/blog/nvidia-gtc-taipei-computex-2026-news/" },
  ],
  "ibm-watsonx": [
    { date: "2023-09-07", label: "Granite", detail: "IBM foundation model family", source: "https://research.ibm.com/blog/granite-code-models" },
    { date: "2024-05-07", label: "InstructLab", detail: "Open collaborative model-customization project", source: "https://research.ibm.com/blog/instruct-lab" },
    { date: "2024-10-21", label: "Granite 3.0", detail: "Third-generation Granite models", source: "https://research.ibm.com/blog/ibm-the-short-oct-22" },
    { date: "2025-10-25", label: "Granite 4.0", detail: "Hybrid Mamba-2 and transformer model family", source: "https://www.ibm.com/granite/docs/models/granite" },
    { date: "2026-04-29", label: "Granite 4.1", detail: "Language, vision, speech, embedding, and guardian models", source: "https://research.ibm.com/blog/granite-4-1-ai-foundation-models" },
  ],
  "amazon-nova": [
    { date: "2024-12-03", label: "Nova Micro", detail: "Text-only Nova understanding model", source: "https://aws.amazon.com/blogs/aws/introducing-amazon-nova-frontier-intelligence-and-industry-leading-price-performance/" },
    { date: "2024-12-03", label: "Nova Lite", detail: "Low-cost multimodal Nova model", source: "https://aws.amazon.com/blogs/aws/introducing-amazon-nova-frontier-intelligence-and-industry-leading-price-performance/" },
    { date: "2024-12-03", label: "Nova Pro", detail: "Flagship multimodal Nova model", source: "https://aws.amazon.com/blogs/aws/introducing-amazon-nova-frontier-intelligence-and-industry-leading-price-performance/" },
    { date: "2025-12-02", label: "Nova 2", detail: "Second-generation Nova model family", source: "https://docs.aws.amazon.com/nova/" },
    { date: "2026-06-01", label: "Nova 2 Lite", detail: "Reasoning model for high-volume, cost-sensitive work", source: "https://aws.amazon.com/nova/models/" },
  ],
  "microsoft-phi": [
    { date: "2023-06-01", label: "Phi-1", detail: "Small language model for code", source: "https://www.microsoft.com/en-us/research/publication/textbooks-are-all-you-need/" },
    { date: "2023-12-12", label: "Phi-2", detail: "2.7B small language model", source: "https://www.microsoft.com/en-us/research/publication/phi-2-the-surprising-power-of-small-language-models/" },
    { date: "2024-04-23", label: "Phi-3", detail: "Phi-3 small language model family", source: "https://azure.microsoft.com/en-us/blog/introducing-phi-3-redefining-whats-possible-with-slms/" },
    { date: "2025-01-01", label: "Phi-4", detail: "14B small language model for complex reasoning", source: "https://www.microsoft.com/en-us/research/uploads/prod/2025/01/WEF-2025_Leave-Behind_Phi-4.pdf" },
    { date: "2026-03-04", label: "Phi-4-reasoning-vision", detail: "Open-weight multimodal reasoning model", source: "https://www.microsoft.com/en-us/research/blog/phi-4-reasoning-vision-and-the-lessons-of-training-a-multimodal-reasoning-model/" },
  ],
};

export function getProvider(slug: string) {
  return providers.find((provider) => provider.slug === slug);
}
