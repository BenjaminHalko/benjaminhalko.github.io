import type { VideoGame, WithContext } from "schema-dts";
import { SITE, AUTHOR_SAME_AS } from "../data/site";

export const johnsQuestSchema: WithContext<VideoGame> = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  name: "John's Quest",
  description: "A free 2D platformer RPG on Steam",
  url: `${SITE.hostname}/johnsquest`,
  genre: ["Platformer", "RPG", "Adventure"],
  gamePlatform: ["PC", "macOS", "Linux"],
  operatingSystem: ["Windows", "macOS", "Linux"],
  applicationCategory: "Game",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: "https://store.steampowered.com/app/4346950/",
  },
  author: {
    "@type": "Person",
    name: SITE.author,
    sameAs: [SITE.hostname, ...AUTHOR_SAME_AS],
  },
  sameAs: [
    "https://store.steampowered.com/app/4346950/",
    "https://benjamin-halko.itch.io/johnsquest",
  ],
};
