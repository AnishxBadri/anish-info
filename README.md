# anish.info

Personal site: essays, a book library, and an index of everything. Built with Astro 7, no client framework. The layout follows the three-column design in the Paper file "anish.info": left rail for navigation, a 640px reading column, and a right margin for notes and drawings.

```sh
npm install
npm run dev      # http://localhost:4321, drafts visible
npm run build    # type-checks, then builds to dist/ (drafts excluded)
```

## Pages

| Route             | Source                              |
| ----------------- | ----------------------------------- |
| `/`               | `src/pages/index.astro`             |
| `/index`          | `src/pages/index/index.astro`       |
| `/writing`        | `src/pages/writing/index.astro`     |
| `/writing/<slug>` | `src/content/essays/<slug>.mdx`     |
| `/library`        | `src/pages/library/index.astro`     |
| `/library/<slug>` | `src/content/books/<slug>.md`       |
| `/rss.xml`        | essays feed                         |

Bio, email, socials, projects and the Substack URL live in `src/consts.ts`.

## Writing an essay

Add `src/content/essays/my-essay.mdx`:

```mdx
---
title: My essay
description: One sentence for the list page and link previews.
pubDate: 2026-10-01
topic: Tools               # optional label above the title
substackUrl: https://...   # optional, links to the newsletter copy
draft: true                # visible in dev only; remove to publish
---

Text with a numbered side note.<Sidenote>Shows in the margin, level with this line.</Sidenote>

<MarginNote>
  <img src="/sketches/my-drawing.svg" alt="What the drawing shows" />
  A caption or aside, placed next to the paragraph below it.
</MarginNote>

The paragraph the margin note sits beside.

<PullQuote>One line worth pulling out.</PullQuote>

<Figure src="/sketches/diagram.svg" alt="..." caption="Fig. 2 ..." size="wide" wash />

<BookRef id="working-in-public" />
```

These components need no import:

- `Sidenote`: numbered note. Write it inline, right after the word it belongs to.
- `MarginNote`: unnumbered margin content (drawings, asides). Put it on its own line before the paragraph it belongs beside.
- `Figure`: `size="main" | "wide" | "margin"`. Add `wash` for a paper-toned backdrop behind scanned drawings.
- `PullQuote`: large sans-serif line.
- `BookRef`: margin card linking to a book. The book's page then shows "Mentioned in" with a link back to the essay.

Put drawings in `public/sketches/`. On narrow screens, everything in the margin moves inline under its paragraph.

## Adding a book

Add `src/content/books/<slug>.md`. The body is your review, excerpt, or notes.

```md
---
title: The Dream Machine
author: M. Mitchell Waldrop
status: read            # read | reading | want
kind: review            # review | excerpt | notes; leave out if there's no write-up
started: 2026-08-02
finished: 2026-09-14
oneLine: One-sentence summary shown at the top.
pages: 528
currentPage: 120        # for status: reading; shows a progress bar
format: Paperback
reread: Yes
cover: ./covers/dream-machine.jpg   # optional real cover
coverColor: "#B8432F"   # without a cover image, a typographic cover is drawn
coverInk: "#F7F1E4"
coverStyle: serif       # serif | sans | italic
marks:
  - page: 112
    note: A pencil mark, shown in the margin.
---

What I thought...
```

A book gets its own page only if it has a `kind` or some body text. Otherwise it just shows on the shelf.

## Newsletter

Set `SUBSTACK_URL` in `src/consts.ts`. The Index page then lists your latest Substack posts, fetched from the feed at build time, and essays show a subscribe link. If the feed can't be reached, the build still succeeds and the list is left empty.

## Sample content

Everything in `src/content/` right now is a placeholder marked `draft: true`. It shows in `npm run dev` so you can see the layout, and is never built for production. Replace it or delete it.

## Deploy

`netlify.toml` builds with `npm run build` and publishes `dist/`. Set `site` in `astro.config.mjs` to the real domain.
