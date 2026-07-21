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

export const SOCIALS = [
  {
    link: "https://store.steampowered.com/developer/benjaminhalko",
    color: "#1b2838",
    text: "Steam",
    icon: "steam",
  },
  {
    link: "https://benjamin-halko.itch.io",
    color: "#FA5C5C",
    text: "itch.io",
    icon: "itchio",
  },
  {
    link: "https://github.com/BenjaminHalko",
    color: "cyan",
    text: "GitHub",
    icon: "github",
  },
  {
    link: "https://linkedin.com/in/BenjaminHalko/",
    color: "#0A66C2",
    text: "LinkedIn",
    icon: "linkedin",
  },
  {
    link: "https://youtube.com/BenjaminHalko",
    color: "red",
    text: "YouTube",
    icon: "youtube",
  },
  {
    link: "https://discord.gg/h6k9Q4QCb8",
    color: "#5865F2",
    text: "Discord",
    icon: "discord",
  },
  {
    link: "mailto:contact@benjaminhalko.dev",
    color: "yellow",
    text: "Email",
    icon: "contact",
  }
];
