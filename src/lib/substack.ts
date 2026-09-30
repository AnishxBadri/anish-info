export interface NewsletterPost {
  title: string;
  link: string;
  date?: Date;
}

const decode = (s: string) =>
  s
    .replace(/^<!\[CDATA\[|\]\]>$/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .trim();

const tag = (xml: string, name: string) => {
  const m = xml.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]) : undefined;
};

/**
 * Latest posts from a Substack's RSS feed, fetched at build time.
 * Returns [] if no URL is set or the feed can't be reached, so a build never
 * fails because Substack is down.
 */
export async function getNewsletterPosts(substackUrl: string, limit = 5): Promise<NewsletterPost[]> {
  if (!substackUrl) return [];
  try {
    const res = await fetch(new URL("/feed", substackUrl));
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, limit).flatMap(([, item]) => {
      const title = tag(item, "title");
      const link = tag(item, "link");
      const pubDate = tag(item, "pubDate");
      return title && link ? [{ title, link, date: pubDate ? new Date(pubDate) : undefined }] : [];
    });
  } catch (err) {
    console.warn(`[substack] Couldn't load ${substackUrl}/feed: ${(err as Error).message}`);
    return [];
  }
}
