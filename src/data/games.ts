export interface GameData {
  id: string;
  name: string;
  itchio: string;
  googleplay: string;
  gxgames?: string;
  github?: string;
  useFirebase?: boolean;
}

export const games: GameData[] = [
  {
    id: "hammerhex",
    name: "Hammer Hex",
    itchio: "https://bluishgreenpro.itch.io/hammer-hex",
    googleplay: "hammerhex",
    gxgames: "ynf9dg/hammer-hex",
    useFirebase: true,
  },
  {
    id: "makenewfriends",
    name: "Make New Friends",
    itchio: "make-new-friends",
    googleplay: "makenewfriends",
    gxgames: "v408fd/make-new-friends",
    github: "Make-New-Friends",
    useFirebase: true,
  },
  {
    id: "bladesofdoom",
    name: "Blades of Doom",
    itchio: "blades-of-doom",
    googleplay: "bladesofdoom",
    gxgames: "ovtmf7/blades-of-doom",
    github: "Blades-Of-Doom",
  },
  {
    id: "shapeion",
    name: "Shapeion",
    itchio: "shapeion",
    googleplay: "shapeion",
    gxgames: "3tyac9/shapeion",
    github: "Shapeion",
  },
  {
    id: "youareabomb",
    name: "You Are A Bomb",
    itchio: "you-are-a-bomb",
    googleplay: "youareabomb",
    gxgames: "249rmr/you-are-a-bomb",
    github: "You-Are-A-Bomb",
  },
  {
    id: "twilighttempo",
    name: "Twilight Tempo",
    itchio: "twilight-tempo",
    googleplay: "twilighttempo",
    gxgames: "r4gpyp/twilight-tempo",
    github: "Twilight-Tempo",
  },
  {
    id: "spacehole",
    name: "SPACEHOLE",
    itchio: "spacehole",
    googleplay: "spacehole",
    github: "SPACEHOLE",
  },
];

export interface GameLinks {
  itchioLink: string;
  googleplayLink: string;
  gxgamesLink: string | null;
  githubLink: string | null;
}

export function gameLinks(game: GameData): GameLinks {
  const isHammerHex = game.id === "hammerhex";
  return {
    itchioLink: isHammerHex
      ? game.itchio
      : `https://benjamin-halko.itch.io/${game.itchio}`,
    googleplayLink: `https://play.google.com/store/apps/details?id=com.benjaminhalko.${game.googleplay}`,
    gxgamesLink: game.gxgames ? `https://gx.games/games/${game.gxgames}/` : null,
    githubLink: game.github
      ? `https://github.com/BenjaminHalko/${game.github}`
      : null,
  };
}
