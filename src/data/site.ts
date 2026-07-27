export const SITE = {
  hostname: "https://benjaminhalko.dev",
  author: "Benjamin Halko",
  tagline: "A programmer that programs things.",
  description:
    "Game Developer - Creator of John's Quest, Hammer Hex, and more",
} as const;

export const AUTHOR_SAME_AS: readonly string[] = [
  "https://store.steampowered.com/developer/benjaminhalko",
  "https://github.com/BenjaminHalko",
  "https://benjamin-halko.itch.io",
  "https://linkedin.com/in/benjaminhalko/",
  "https://youtube.com/BenjaminHalko",
  "https://gx.games/studios/001cf107-345b-4227-b45e-d54580fe019c/",
  "https://play.google.com/store/apps/dev?id=6021828409391936642",
  "https://apps.apple.com/us/developer/benjamin-halko/id1748463709"
];

export const GAME_SITES = [
  {
    link: "https://store.steampowered.com/developer/benjaminhalko",
    color: "var(--brand-steam)",
    text: "Steam",
    icon: "tabler:brand-steam",
  },
  {
    link: "https://benjamin-halko.itch.io",
    color: "var(--brand-itch)",
    text: "itch.io",
    icon: "tabler:brand-itch",
  },
  {
    link: "https://gx.games/studios/001cf107-345b-4227-b45e-d54580fe019c/",
    color: "var(--brand-gxgames)",
    text: "GX Games",
    icon: "gxgames",
  },
  {
    link: "https://play.google.com/store/apps/dev?id=6021828409391936642",
    color: "var(--brand-googleplay)",
    text: "Google Play",
    icon: "tabler:brand-google-play",
  },
  {
    link: "https://apps.apple.com/us/developer/benjamin-halko/id1748463709",
    color: "var(--brand-appstore)",
    text: "App Store",
    icon: "tabler:brand-appstore",
  }
]

export const SOCIALS = [
  {
    link: "https://github.com/BenjaminHalko",
    color: "var(--brand-github)",
    text: "GitHub",
    icon: "tabler:brand-github",
  },
  {
    link: "https://linkedin.com/in/benjaminhalko/",
    color: "var(--brand-linkedin)",
    text: "LinkedIn",
    icon: "tabler:brand-linkedin",
  },
  {
    link: "https://youtube.com/BenjaminHalko",
    color: "var(--brand-youtube)",
    text: "YouTube",
    icon: "tabler:brand-youtube",
  },
  {
    link: "https://discord.gg/h6k9Q4QCb8",
    color: "var(--brand-discord)",
    text: "Discord",
    icon: "tabler:brand-discord",
  },
  {
    link: "mailto:contact@benjaminhalko.dev",
    color: "var(--brand-email)",
    text: "Email",
    icon: "tabler:mail",
  }
];
