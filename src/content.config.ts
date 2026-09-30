import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Long-form essays. Written in MDX so drawings, sidenotes and book references
// can sit in the margin. Published here first, then sent out through Substack.
const essays = defineCollection({
  loader: glob({ base: "./src/content/essays", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // Small label above the title, e.g. "Tools".
    topic: z.string().optional(),
    // Link to the Substack copy of this essay, if it was sent as a newsletter.
    substackUrl: z.url().optional(),
    // Drafts render in `astro dev` but are left out of production builds.
    draft: z.boolean().default(false),
  }),
});

// One file per book. The body is the review, excerpt, or notes.
const books = defineCollection({
  loader: glob({ base: "./src/content/books", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      author: z.string(),
      status: z.enum(["read", "reading", "want"]).default("read"),
      // What the page holds. Leave empty for books with no write-up yet.
      kind: z.enum(["review", "excerpt", "notes"]).optional(),
      started: z.coerce.date().optional(),
      finished: z.coerce.date().optional(),
      // One-sentence summary shown at the top of the page.
      oneLine: z.string().optional(),
      pages: z.number().int().positive().optional(),
      currentPage: z.number().int().nonnegative().optional(),
      format: z.string().optional(),
      reread: z.string().optional(),
      // A real cover image. Without one, a typographic cover is drawn from the
      // three fields below.
      cover: image().optional(),
      coverColor: z.string().default("#2F4A3A"),
      coverInk: z.string().default("#F2EEE3"),
      coverStyle: z.enum(["serif", "sans", "italic"]).default("serif"),
      // Pencil marks: page-anchored notes shown in the margin.
      marks: z
        .array(z.object({ page: z.number().int().optional(), note: z.string() }))
        .default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { essays, books };
