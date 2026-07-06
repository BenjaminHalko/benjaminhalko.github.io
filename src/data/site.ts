export const SITE = {
  hostname: "https://benjaminhalko.dev",
  author: "Benjamin Halko",
  tagline: "A programmer that programs things.",
  description:
    "Game Developer - Creator of John's Quest, Hammer Hex, and more",
} as const;

// Places the author exists elsewhere on the web. Reused by Person JSON-LD and
// the author reference inside game schemas.
export const AUTHOR_SAME_AS: readonly string[] = [
  "https://store.steampowered.com/developer/benjaminhalko",
  "https://github.com/BenjaminHalko",
  "https://benjamin-halko.itch.io",
];
