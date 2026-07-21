# Fusion AI

Fusion AI is an independent, dark-first information directory for the GenAI model ecosystem. It helps visitors discover foundation-model organizations, open-model creators, and AI inference platforms through verified official links and side-by-side comparison.

## Included experience

- Searchable, filterable directory of 16 leading foundation-model organizations.
- Official provider profile pages with model families, access type, source links, and direct documentation links.
- Provider launch timelines with selected major model milestones and links to official release sources.
- Working multi-provider comparison view with shareable URL parameters.
- Interactive world map of headquarters and principal offices; every marker opens the provider's official website.
- Open-model creator and inference-platform sections with direct official websites.
- Keyboard-friendly controls, reduced-motion support, and WCAG-aware contrast.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The provider directory is at `/`, provider profiles are available at `/providers/[slug]`, and comparisons use `/compare?providers=openai,anthropic`.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create the production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | Run strict TypeScript validation |

## GitHub Pages

Fusion AI can be published as a static GitHub Pages site. The included workflow builds the Next.js static export and deploys the generated `out/` directory whenever `main` changes.

After the workflow is pushed, open **GitHub repository Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**. The site will be available at `https://sonu84it.github.io/fusion-ai/` after the first workflow run completes.

## Architecture

```text
app/
  providers/[slug]/       Provider profile route
  compare/page.tsx        Provider comparison route
  page.tsx                Provider directory route
components/
  provider-directory.tsx  Search, filter, and comparison selection
  provider-world-map.tsx  Accessible, linked provider headquarters map
  provider-profile.tsx    Provider reference profile
  provider-comparison.tsx Side-by-side provider comparison
lib/providers.ts          Curated provider and platform directory data
```

## Curation policy

Provider cards avoid copied pricing, benchmark, or context-window claims because these values change frequently. Every card links to the organization&apos;s official website and documentation so visitors can validate the latest details at the source. The directory is a reference guide, not a model broker or chat product.

## Design principles

The interface uses `#050816` as its base, layered slate surfaces, violet/blue/cyan/pink signal colors, 16–28px radii, and compact **Space Grotesk + Inter** typography. Motion is decorative but never necessary to understand or operate the product; the global reduced-motion media query disables it for users who prefer it.
