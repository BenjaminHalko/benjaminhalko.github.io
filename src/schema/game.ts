import type { VideoGame, WithContext } from "schema-dts";
import { SITE, AUTHOR_SAME_AS } from "../data/site";
import type { GameData } from "../data/games";

export function generateGameSchema(
  game: GameData,
  image: string,
): WithContext<VideoGame> {
  const sameAs: string[] = [];
  if (game.itchio) sameAs.push(game.itchio);
  if (game.googleplay) sameAs.push(game.googleplay);
  if (game.gxgames) sameAs.push(game.gxgames);
  if (game.github) sameAs.push(game.github);
  if (game.jamEventUrl) sameAs.push(game.jamEventUrl);

  const platforms = game.platforms || ["web", "android", "windows"];
  
  const mappedOs = platforms.flatMap((platform) => {
    switch (platform) {
      case "windows":
        return ["Windows"];
      case "macos":
        return ["macOS"];
      case "linux":
        return ["Linux"];
      case "android":
        return ["Android"];
      case "ios":
        return ["iOS"];
      default:
        return [];
    }
  });

  if (mappedOs.length === 0) mappedOs.push("WebBrowser");

  return {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.name,
    description: game.description || `Play ${game.name} by ${SITE.author}`,
    url: `${SITE.hostname}/${game.id}`,
    image,
    genre: game.genre ? [game.genre] : ["Indie Game"],
    gamePlatform: mappedOs,
    operatingSystem: mappedOs,
    applicationCategory: "Game",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: sameAs[0] || `${SITE.hostname}/${game.id}`,
    },
    author: {
      "@type": "Person",
      name: SITE.author,
      sameAs: [SITE.hostname, ...AUTHOR_SAME_AS],
    },
    sameAs,
  };
}
