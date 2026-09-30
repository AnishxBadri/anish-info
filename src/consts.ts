// Global site data. Import from anywhere with `import { ... } from "../consts"`.

export const SITE_TITLE = "Anish Badri";
export const SITE_DESCRIPTION =
  "Anish Badri writes about software, learning, and the books he reads.";
export const EMAIL = "anishbadri2621@gmail.com";

// Set this to your Substack URL (e.g. "https://anish.substack.com") and the
// Index page will list your latest newsletter posts from its RSS feed at build time.
export const SUBSTACK_URL = "";
export const NEWSLETTER_NAME = "Figuring Stuff Out";

export const NAV = [
  { key: "home", label: "Home", href: "/" },
  { key: "index", label: "Index", href: "/index" },
  { key: "writing", label: "Writing", href: "/writing" },
  { key: "library", label: "Library", href: "/library" },
] as const;

export type NavKey = (typeof NAV)[number]["key"];

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/AnishxBadri" },
  { label: "Twitter", href: "https://twitter.com/anish_badri" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/anish-badri-621432149/" },
  { label: "Mastodon", href: "https://mastodon.social/@unemployed_bro" },
];

// Shown under "Building" on the Index page. `href` starting with "/" stays on site.
export const PROJECTS = [
  {
    title: "Parrot Prep",
    href: "",
    blurb: "Infrastructure for your job search. My startup.",
  },
  {
    title: "A Rust TUI",
    href: "https://github.com/AnishxBadri",
    blurb: "Open source terminal tool, rewritten more times than I'd like to admit.",
  },
];
