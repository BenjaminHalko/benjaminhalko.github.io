/** @jsxRuntime automatic @jsxImportSource preact */
import type { ComponentChildren } from "preact";

import { Content as BladesofdoomContent } from "./content/bladesofdoom";
import { Content as HammerhexContent } from "./content/hammerhex";
import { Content as MakenewfriendsContent } from "./content/makenewfriends";
import { Content as ShapeionContent } from "./content/shapeion";
import { Content as SpaceholeContent } from "./content/spacehole";
import { Content as TwilighttempoContent } from "./content/twilighttempo";
import { Content as YouareabombContent } from "./content/youareabomb";

export const gameDescriptions: Record<string, ComponentChildren> = {
  "bladesofdoom": <BladesofdoomContent />,
  "hammerhex": <HammerhexContent />,
  "makenewfriends": <MakenewfriendsContent />,
  "shapeion": <ShapeionContent />,
  "spacehole": <SpaceholeContent />,
  "twilighttempo": <TwilighttempoContent />,
  "youareabomb": <YouareabombContent />,
};
