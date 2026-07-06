/** @jsxRuntime automatic @jsxImportSource preact */
import type { VNode } from "preact";
import { games } from "../src/data/games";
import { HomePage } from "../src/pages/index";
import { JohnsQuestPage } from "../src/pages/johnsquest";
import { GamePage } from "../src/pages/games";
import { PrivacyPage } from "../src/pages/games/privacy-page";

export interface PageSpec {
  outputPath: string;
  node: VNode;
}

export function buildPages(): PageSpec[] {
  const pages: PageSpec[] = [
    { outputPath: "index.html", node: <HomePage /> },
    { outputPath: "johnsquest.html", node: <JohnsQuestPage /> },
  ];

  for (const game of games) {
    if (game.id !== "hammerhex") {
      pages.push({
        outputPath: `${game.id}.html`,
        node: <GamePage game={game} />,
      });
    }
    pages.push({
      outputPath: `${game.id}/privacypolicy.html`,
      node: <PrivacyPage game={game} />,
    });
  }

  return pages;
}
