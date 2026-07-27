import type { Person, WithContext } from "schema-dts";
import { SITE, AUTHOR_SAME_AS } from "../data/site";

export const personSchema: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.author,
  url: SITE.hostname,
  // Served from public/ rather than the hashed asset pipeline: this URL must
  // stay identical across builds for Google to keep the image tied to the entity.
  image: `${SITE.hostname}/avatar.jpg`,
  sameAs: [...AUTHOR_SAME_AS],
  jobTitle: "Indie Game Developer",
  knowsAbout: ["Game Development", "2D Platformers", "GameMaker"],
  // `owns` not `creator`: schema.org Person has no `creator` (inverse relation).
  owns: [
    {
      "@type": "VideoGame",
      name: "Hammer Hex",
      url: "https://hammerhex.com",
      sameAs: [
        "https://store.steampowered.com/app/793440/",
        "https://bluishgreenpro.itch.io/hammer-hex",
      ],
    },
    {
      "@type": "VideoGame",
      name: "John's Quest",
      url: `${SITE.hostname}/johnsquest`,
      sameAs: [
        "https://store.steampowered.com/app/4346950/",
        "https://benjamin-halko.itch.io/johnsquest",
      ],
    },
  ],
};
