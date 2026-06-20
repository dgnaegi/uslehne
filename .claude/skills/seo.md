# Skill: seo

SEO guidance for uslehne.ch — a Swiss German-language platform for sharing and lending everyday items (tools, baby gear, etc.).

---

## Site context (use this for all copy and meta content)

- **Language**: German (Swiss, `de-CH`)
- **Purpose**: Community platform to share, lend, and borrow everyday items — temporarily or permanently
- **Examples**: Bohrmaschine (drill), Kinderwagen (stroller), Babywippe, Werkzeug, Spielsachen
- **Tone**: Friendly, local, practical, community-driven
- **URL**: https://uslehne.ch

---

## 1. HTML head — every page

Every page needs these in `<head>`. In React, manage with a library like `react-helmet-async` or Vite's `index.html` for static defaults.

```html
<!-- Language -->
<html lang="de-CH">

<!-- Core -->
<title>uslehne – Gegenstände teilen in der Schweiz</title>
<meta name="description" content="Leihe oder teile Gegenstände in deiner Nähe – Bohrmaschinen, Kinderwagen, Spielzeug und mehr. Kostenlos, einfach, lokal." />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="https://uslehne.ch/" />

<!-- Language targeting -->
<link rel="alternate" hreflang="de-CH" href="https://uslehne.ch/" />
<link rel="alternate" hreflang="de" href="https://uslehne.ch/" />
<link rel="alternate" hreflang="x-default" href="https://uslehne.ch/" />

<!-- Open Graph (Facebook, LinkedIn, WhatsApp previews) -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://uslehne.ch/" />
<meta property="og:title" content="uslehne – Gegenstände teilen in der Schweiz" />
<meta property="og:description" content="Leihe oder teile Gegenstände in deiner Nähe – Bohrmaschinen, Kinderwagen, Spielzeug und mehr." />
<meta property="og:image" content="https://uslehne.ch/og-image.jpg" />
<meta property="og:locale" content="de_CH" />
<meta property="og:site_name" content="uslehne" />

<!-- Twitter / X -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="uslehne – Gegenstände teilen in der Schweiz" />
<meta name="twitter:description" content="Leihe oder teile Gegenstände in deiner Nähe." />
<meta name="twitter:image" content="https://uslehne.ch/og-image.jpg" />
```

---

## 2. Structured data (JSON-LD)

Inject via a `<script type="application/ld+json">` tag. This feeds Google, Bing, and AI agents.

### Website (every page)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "uslehne",
  "url": "https://uslehne.ch",
  "description": "Schweizer Plattform zum Teilen und Ausleihen von Alltagsgegenständen",
  "inLanguage": "de-CH",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://uslehne.ch/suche?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### Item listing page

```json
{
  "@context": "https://schema.org",
  "@type": "ItemPage",
  "name": "Bohrmaschine – uslehne",
  "description": "Bohrmaschine zum Ausleihen in Zürich",
  "inLanguage": "de-CH",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "CHF",
    "price": "0"
  }
}
```

### Organization (footer / about page)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "uslehne",
  "url": "https://uslehne.ch",
  "logo": "https://uslehne.ch/logo.png",
  "sameAs": []
}
```

---

## 3. AI agent SEO (GEO — Generative Engine Optimization)

AI agents (ChatGPT, Claude, Perplexity, Gemini) crawl and index sites. Optimize for them with:

### `public/llms.txt` — machine-readable site summary for LLMs

This is the emerging standard (like robots.txt, but for LLMs). Keep it plain markdown, accurate, and concise.

```markdown
# uslehne

> Schweizer Plattform zum Teilen und Ausleihen von Alltagsgegenständen

uslehne.ch ist eine deutschsprachige Community-Plattform in der Schweiz, 
auf der Nutzer Gegenstände wie Werkzeug, Kinderwagen, Spielzeug oder 
Haushaltsgeräte kostenlos teilen oder ausleihen können — temporär oder permanent.

## Kernfunktionen
- Gegenstände inserieren (Titel, Beschreibung, Kategorie)
- Gegenstände suchen und anfragen
- Kostenlos, ohne Vermittlungsgebühr

## Zielgruppe
Deutschsprachige Nutzer in der Schweiz

## Sprache
Deutsch (Schweiz, de-CH)
```

### `public/robots.txt` — allow reputable AI crawlers, block scrapers

```
User-agent: *
Allow: /

# Allow reputable AI crawlers
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Googlebot
Allow: /

Sitemap: https://uslehne.ch/sitemap.xml
```

### Content rules for AI discoverability

- **Use clear German headings** (h1 → h2 → h3) — AI extracts these as page structure
- **Write descriptive, factual `alt` text** on all images in German
- **Add FAQ sections** where relevant — AI loves Q&A format for featured snippets
- **Never put important text in images** — AI can't always parse them
- **Avoid jargon without explanation** — especially Swiss German terms

---

## 4. Semantic HTML rules

Always use semantic elements — both Google and AI agents weight these:

```html
<main>          <!-- primary content -->
<article>       <!-- a single item/listing -->
<section>       <!-- grouped content with a heading -->
<header>        <!-- page or section header -->
<footer>        <!-- page footer -->
<nav>           <!-- navigation -->
<h1>            <!-- one per page, describes the page -->
<time datetime="2025-01-15">15. Januar 2025</time>   <!-- dates -->
```

---

## 5. Per-page title and description formula

| Page | Title pattern | Description pattern |
|---|---|---|
| Home | `uslehne – [Kategorie] teilen in der Schweiz` | Short value prop, max 155 chars |
| Item detail | `[Titel] in [Ort] ausleihen – uslehne` | Describe the item, location, availability |
| Category | `[Kategorie] teilen & leihen – uslehne` | What's in this category |
| Search results | `«[Query]» – Suchergebnisse – uslehne` | Number of results if possible |

---

## 6. Core Web Vitals checklist

- Images use `width` + `height` attributes to prevent layout shift (CLS)
- Images are lazy-loaded below the fold (`loading="lazy"`)
- Fonts use `font-display: swap`
- No render-blocking scripts in `<head>` (use `defer` or `type="module"`)
- API calls that affect first paint are fast or show skeleton loaders

---

## 7. Files to maintain

| File | Location | Purpose |
|---|---|---|
| `llms.txt` | `frontend/public/llms.txt` | AI agent site summary |
| `robots.txt` | `frontend/public/robots.txt` | Crawler permissions |
| `sitemap.xml` | generated or `frontend/public/sitemap.xml` | All public URLs |
| `og-image.jpg` | `frontend/public/og-image.jpg` | 1200×630px social preview image |
| `logo.png` | `frontend/public/logo.png` | Used in structured data |
