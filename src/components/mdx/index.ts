// Components available inside every essay and book note without importing them.
import BookRef from "./BookRef.astro";
import Figure from "./Figure.astro";
import MarginNote from "./MarginNote.astro";
import PullQuote from "./PullQuote.astro";
import Sidenote from "./Sidenote.astro";

export const mdxComponents = { BookRef, Figure, MarginNote, PullQuote, Sidenote };
