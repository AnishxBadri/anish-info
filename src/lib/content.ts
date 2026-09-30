import { type CollectionEntry, getCollection } from "astro:content";

export type Essay = CollectionEntry<"essays">;
export type Book = CollectionEntry<"books">;

const showDrafts = import.meta.env.DEV;

/** Published essays, newest first. Drafts are included only in dev. */
export async function getEssays(): Promise<Essay[]> {
  const essays = await getCollection("essays", ({ data }) => showDrafts || !data.draft);
  return essays.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Books, newest first: currently reading, then read (by finish date), then want-to-read. */
export async function getBooks(): Promise<Book[]> {
  const books = await getCollection("books", ({ data }) => showDrafts || !data.draft);
  const rank = { reading: 0, read: 1, want: 2 } as const;
  return books.sort((a, b) => {
    const byStatus = rank[a.data.status] - rank[b.data.status];
    if (byStatus !== 0) return byStatus;
    return bookDate(b).valueOf() - bookDate(a).valueOf();
  });
}

export function bookDate(book: Book): Date {
  return book.data.finished ?? book.data.started ?? new Date(0);
}

export function readingMinutes(body: string | undefined): number {
  const words = (body ?? "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

const BOOK_REF = /<BookRef\s+id=["']([^"']+)["']/g;

/** Book ids referenced with <BookRef id="..."/> in an essay body. */
export function bookIdsIn(essay: Essay): string[] {
  return [...(essay.body ?? "").matchAll(BOOK_REF)].map((m) => m[1]);
}

/** Essays that reference the given book. */
export async function essaysMentioning(bookId: string): Promise<Essay[]> {
  const essays = await getEssays();
  return essays.filter((essay) => bookIdsIn(essay).includes(bookId));
}

export const KIND_LABEL = {
  review: "Review",
  excerpt: "Excerpt",
  notes: "Notes",
} as const;

export function bookLabel(book: Book): string {
  if (book.data.status === "want") return "Want to read";
  if (book.data.status === "reading") return "Reading now";
  return book.data.kind ? KIND_LABEL[book.data.kind] : "Read";
}

export function shortMonth(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

/** Whether a book gets its own page (it has a write-up or at least a kind set). */
export function hasPage(book: Book): boolean {
  return Boolean(book.data.kind) || Boolean(book.body?.trim());
}
