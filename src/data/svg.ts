import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const iconsDir = resolve(dirname(fileURLToPath(import.meta.url)), "../res/icons");

const cache = new Map<string, string>();

export function loadSvg(name: string): string {
  const cached = cache.get(name);
  if (cached !== undefined) return cached;

  const svgPath = resolve(iconsDir, `${name}.svg`);
  let svg = "";
  if (existsSync(svgPath)) {
    svg = readFileSync(svgPath, "utf-8")
      .replace(/<\?xml[^>]*\?>/g, "")
      .trim();
  }
  cache.set(name, svg);
  return svg;
}
